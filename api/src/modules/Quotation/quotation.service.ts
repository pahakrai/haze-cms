import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {ObjectId} from 'mongodb';
import {
  // ForbiddenException,
  BadRequestException,
  prepHost
} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';

import common from '@golpasal/common';

import {OrderService} from '../Order/order.service';
import {IUser} from '../User';
import {OrderFormCreateModel} from '../Order/models/index';

const {QuotationStatus} = common.status;
const {UserType, AddressType, NotificationMediaType} = common.type;

// interfaces & models
import {
  QuotationCreateModel,
  QuotationUpdateModel,
  QuotationSearchModel,
  QuotationOrderModel,
  QuotationformCreateModel,
  QuotationFormUpdateModel
} from './models';
import {Quotation, QuotationModel} from './interfaces';
import {ACService} from '../Ac/ac.service';
import {AddressService} from '../Address/address.service';
import {AutoNumberService} from '../AutoNumber/autoNumber.service';
import {NotificationService} from '../Notification/notification.service';
import {UserService} from '../User/user.service';
import {WorkspaceService} from '../Workspace/workspace.service';

@Injectable({scope: Scope.REQUEST})
export class QuotationService extends BaseCRUDService<
  Quotation,
  QuotationCreateModel,
  QuotationUpdateModel,
  QuotationSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Quotations')
    private readonly quotationRepository: QuotationModel,
    private readonly acService: ACService,
    private readonly autoNumberService: AutoNumberService,
    private readonly orderService: OrderService,
    private readonly addressService: AddressService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly workspaceService: WorkspaceService
  ) {
    super(quotationRepository, request);
  }

  public _castQuery(searchModel: QuotationSearchModel) {
    const query: any = {$and: []};
    const {q, client, status} = searchModel;

    if (q && q !== 'undefined' && q !== 'null') {
      const qReg = new RegExp(q, 'i');

      query.$and.push({
        $or: [
          {
            quotationNo: qReg
          }
        ]
      });
    }

    const user = this.getCurrentUser<IUser>();
    const workspace =
      user.currentWorkspace.toHexString() || this.getCurrentWorkspace();
    query.$and.push({
      workspace: new ObjectId(workspace)
    });
    if (client) {
      query.$and.push({client});
    }

    if (status || status === 0) {
      query.$and.push({status});
    }

    if (query.$and.length === 0) {
      delete query.$and;
    }
    return query;
  }

  public async createQuotation(formModel: QuotationformCreateModel) {
    const user = this.getCurrentUser<IUser>();
    const quotationNo = await this.autoNumberService.generate({
      type: 'quotation',
      date: new Date(),
      workspace: user.currentWorkspace.toHexString()
    });
    // if current user is not member, allow pass client id
    let client: string;
    if (
      user.userTypes.includes(UserType.USER) ||
      user.userTypes.includes(UserType.PROVIDER) ||
      user.userTypes.includes(UserType.SYSTEM_ADMIN)
    ) {
      client = formModel.client;
    } else {
      client = user._id.toHexString();
    }

    /* Start of Contact Logic */
    // NOTE: create quotation id beforehand to use it
    // in address table ref
    const quotationId = new ObjectId();
    let contactId: string;
    let billingContactId: string;
    if (formModel?.contactAddressId) {
      const contactAddress = await this.cloneAddress(
        formModel?.contactAddressId,
        quotationId?.toHexString(),
        AddressType.CONTACT
      );
      contactId = (contactAddress?._id as ObjectId)?.toString();
    } else if (formModel?.contactAddress) {
      const contactAddress = await this.addressService.create({
        ...formModel.contactAddress,
        refType: 'Quotation',
        ref: quotationId?.toHexString(),
        type: AddressType.CONTACT
      });
      contactId = (contactAddress?._id as ObjectId)?.toString();
    }

    if (formModel?.billingContactId) {
      const contactAddress = await this.cloneAddress(
        formModel?.billingContactId,
        quotationId?.toHexString(),
        AddressType.BILLING
      );
      billingContactId = (contactAddress?._id as ObjectId)?.toString();
    } else if (formModel?.billingContact) {
      const billingContactAddress = await this.addressService.create({
        ...formModel.billingContact,
        refType: 'Quotation',
        ref: quotationId?.toHexString(),
        type: AddressType.BILLING
      });
      billingContactId = (billingContactAddress?._id as ObjectId)?.toString();
    }
    const quotation = await super.create({
      _id: quotationId.toHexString(),
      quotationNo,
      workspace:
        user.currentWorkspace.toHexString() || this.getHeaderWorkspace(),
      client,
      orderType: formModel.orderType,
      charge: formModel.charge,
      contact: formModel.contact,
      consignee: formModel.consignee,
      billingContact: billingContactId,
      contactAddress: contactId,
      quotationDate: new Date(),
      details: formModel.details,
      services: formModel.services,
      status: QuotationStatus.DRAFT,
      remarks: formModel?.remarks
    });

    this.sendEnquiryNotificationByEmail(quotation);

    return quotation;
  }

  /**
   * update quotation
   * verify billing/contact address changes
   *
   * @param quotationId quotation id
   * @param updateModel changes of quotation
   * @param options mongoose option
   */
  public async updateQuotation(
    quotationId: string | ObjectId,
    updateModel: QuotationFormUpdateModel,
    options?: any
  ) {
    const quotation = await this.findById(quotationId as string, {lean: true});
    if (!quotation) {
      throw new BadRequestException({code: 'err_quotation_not_found'});
    }
    if (quotation.status === QuotationStatus.CONFIRM) {
      throw new BadRequestException({
        message:
          'The quotation has been successfully created and cannot be edited'
      });
    }

    /* Start Address Logic */
    const {contactAddressId, contactAddress, billingContactId, billingContact} =
      updateModel;
    if (
      billingContactId &&
      billingContactId !== (quotation?.billingContact as ObjectId)?.toString()
    ) {
      // COPY AND UPDATE THE PREVIOUS BILLING CONTACT ADDRESS
      const billingAddress = await this.addressService.findById(
        billingContactId,
        {
          lean: true
        }
      );
      // deletes the copied address _id
      delete billingAddress._id;
      await this.addressService.update(
        (quotation?.billingContact as ObjectId).toString(),
        {
          ...billingAddress,
          refType: 'Quotation',
          ref: (quotation?._id as ObjectId)?.toString(),
          type: AddressType.BILLING
        } as any
      );
    } else if (billingContact) {
      // update the corresponding ref contact address
      if (quotation?.billingContact) {
        await this.addressService.update(
          (quotation?.billingContact as ObjectId).toString(),
          {
            ...billingContact,
            refType: 'Quotation',
            ref: (quotation?._id as ObjectId)?.toString(),
            type: AddressType.BILLING
          }
        );
      } else {
        const newBillingContact: any = new ObjectId();
        await this.addressService.create({
          _id: newBillingContact,
          ...billingContact,
          refType: 'Quotation',
          ref: (quotation?._id as ObjectId)?.toString(),
          type: AddressType.BILLING
        } as any);
        quotation.billingContact = newBillingContact;
      }
    }
    if (
      contactAddressId &&
      contactAddressId !== (quotation?.contactAddress as ObjectId)?.toString()
    ) {
      // COPY AND UPDATE THE PREVIOUS BILLING CONTACT ADDRESS
      const shippingAddress = await this.addressService.findById(
        contactAddressId,
        {
          lean: true
        }
      );
      // deletes the copied address _id
      delete shippingAddress._id;
      await this.addressService.update(
        (quotation?.contactAddress as ObjectId)?.toString(),
        {
          ...shippingAddress,
          refType: 'Quotation',
          ref: (quotation?._id as ObjectId)?.toString(),
          type: AddressType.CONTACT
        } as any
      );
    } else if (contactAddress) {
      // update the corresponding ref contact address

      if (quotation?.contactAddress) {
        const contactId = (
          quotation?.contactAddress as ObjectId
        )?.toString() as string;
        await this.addressService.update(contactId, {
          ...contactAddress,
          refType: 'Quotation',
          ref: quotation?._id?.toHexString(),
          type: AddressType.CONTACT
        });
      } else {
        const newContactAddress: any = new ObjectId();
        await this.addressService.create({
          ...contactAddress,
          _id: newContactAddress,
          refType: 'Quotation',
          ref: quotation?._id?.toHexString(),
          type: AddressType.BILLING
        } as any);
        quotation.contactAddress = newContactAddress;
      }
    }
    /* End Address Logic */

    const updatedModel: any = {
      ...updateModel,
      contactAddress: (quotation?.contactAddress as ObjectId)?.toString(),
      billingContact: (quotation?.billingContact as ObjectId)?.toString()
    };

    const newQuotation = await super.update(quotationId, updatedModel, options);
    this.sendEnquiryNotificationByEmail(newQuotation, false);
    return newQuotation;
  }

  async cloneAddress(
    addressId: string,
    quotationId: string,
    addressType: string
  ) {
    const address = await this.addressService.findById(addressId, {lean: true});
    if (!address) {
      throw new BadRequestException({code: 'err_address_not_found'});
    }
    // NOTE: delete the previous address id before cloning the address
    delete address._id;
    return this.addressService.create({
      ...address,
      refType: 'Quotation',
      ref: quotationId,
      type: addressType
    } as any);
  }

  public async convertToOrder(_id, model: QuotationOrderModel) {
    const quotation = await this.findById(_id, {lean: true});

    if (!quotation) {
    }
    const details = quotation?.details.map(d => {
      return {
        ...d,
        product: (d.product as ObjectId).toString(),
        productSKU: (d.productSKU as ObjectId).toString()
      };
    });
    const newOrder: OrderFormCreateModel = {
      orderType: quotation?.orderType,
      quotation: _id,
      client: quotation?.client.toString(),
      services: quotation?.services.map(s => ({
        ...s,
        service: (s.service as ObjectId).toString()
      })),
      others: quotation.charge.others,
      remarks: quotation?.remarks,
      // charge: quotationItem?.charge as any,
      product: {
        items: details
      },
      contact: model.contact || quotation?.contact,
      consignee: model.consignee || quotation?.consignee,
      contactAddressId:
        model?.contactAddressId ||
        (quotation?.contactAddress as ObjectId).toString(),
      contactAddress:
        model?.contactAddress || (quotation?.contactAddress as any),
      billingContactId:
        model?.billingContactId || (quotation?.billingContact as any),
      billingContact:
        model?.billingContact || (quotation?.billingContact as any)
    };

    return this.orderService.createOrder(newOrder);
  }

  /**
   * send email to admin about  create or update quotation
   * @param quotation         quotation object
   * @param isNew             new quotation or update quotation
   */
  public async sendEnquiryNotificationByEmail(quotation, isNew = true) {
    // quotaion client
    const clientUser = await this.userService.findById(quotation?.client);

    const locale = this.getLocale();
    // get the client user info
    const first = clientUser?.firstName ?? '';
    const last = clientUser?.lastName ?? '';

    //base workspace webHost
    const workspace = await this.workspaceService.findById(
      clientUser.currentWorkspace
    );
    // send email to users
    const userIds = await this.acService.getUserIdsByActions([
      'Quotation:ReceiveNotification'
    ]);

    const users: any =
      userIds?.length > 0
        ? await this.userService.find({_ids: userIds}, {lean: true})
        : [];

    // get client user firstName and lastName use in email template
    const name =
      first && last
        ? `${first} ${last}`
        : first || last || clientUser?.username;

    // if to Users length > 0
    if (users.length > 0) {
      await this.notificationService.push({
        toUsers: users?.map(u => ({
          user: {
            ...u,
            currentWorkspace: new ObjectId(clientUser.currentWorkspace)
          }
        })),
        notificationMediaType: NotificationMediaType.EMAIL,
        title: locale.tAll('email_quotation_title'),
        data: {
          screen: 'email/quotations.ejs',
          parameters: {
            t_message: locale.tAll('email_quotation_message', [
              `${name}`,
              isNew ? locale.t('display_created') : locale.t('display_updated'),
              quotation?.quotationNo
            ]),
            url: `${prepHost(users[0], workspace)}/quotation/${quotation?._id}`,
            view: locale.t('display_view'),
            client: quotation?.client
          }
        }
      });
    }
  }
}
