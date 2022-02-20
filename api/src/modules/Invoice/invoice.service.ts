import {Injectable, Inject} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {Locale, LocalizeStringSchema, NotFoundException} from 'src/core';
import moment from 'moment';
import * as fs from 'fs';
import path from 'path';
import {helpers} from '@golpasal/common';
// interfaces & models
import {MailerService} from '../Mailer/mailer.service';
import {PageService} from '../Page/Page/page.service';
// eslint-disable-next-line
import {OrderService} from '../Order/order.service';
import {ParamService} from '../Param/param.service';
// eslint-disable-next-line max-len
import {WorkspaceService} from '../Workspace/workspace.service';
import {ThemeService} from '../Theme/theme.service';
// const {ParamType, WorkspaceType} = common.type;
// lib
import {createPdf} from '../../lib/pdf';
import {IUser} from '../User/interfaces';
const localeInstance = new Locale({
  accept: Object.keys(LocalizeStringSchema).reduce((obj, l) => {
    obj[l] = [];
    return obj;
  }, {})
});

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(REQUEST) request,
    // @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
    private readonly mailerService: MailerService,
    private readonly paramService: ParamService,
    private readonly workspaceService: WorkspaceService,
    private readonly pageService: PageService,
    private readonly themeService: ThemeService
  ) {}

  /**
   * send order email
   * @param to order email recevier
   */
  public async sendOrderCreateNotification(
    orderId: string,
    receiptNo: string
  ): Promise<void> {
    const preData = await this.orderService.getInvoiceByOrderId(orderId);
    const subject = localeInstance.t(
      'email_order_subject',
      [preData.orderNo],
      preData?.language
    );
    const toEmail = preData?.users?.email;
    const workspaceId = preData?.workspace.toHexString();
    // const {pdfStream} = await this.getInvoicePdf(orderId);
    const {orderHtml} = await this.getInoviceEmailBody(
      preData,
      preData.language,
      receiptNo,
      preData.utcOffset
    );
    // const fileName = `${preData.orderNo}.pdf`;
    await this.mailerService.sendMail({
      workspace: workspaceId,
      to: toEmail,
      subject,
      body: orderHtml
      // An array of attachments 附件
      // attachments: [
      //   {
      //     filename: fileName,
      //     content: pdfStream,
      //     contentType: 'application/pdf'
      //   }
      // ]
    });
  }

  public async getReceiptPdf(
    _id: string,
    receiptNo: string,
    utcOffset?: number
  ): Promise<any> {
    const preData = await this.orderService.getInvoiceByOrderId(_id);
    const {orderHtml, OrderPaidHeaderHtml, OrderPaidFooterHtml} =
      await this.getInoviceEmailBody(
        preData,
        preData.language,
        receiptNo,
        utcOffset ? utcOffset : preData.utcOffset,
        true
      );

    // create invoice pdf by invoice html
    const invoicePdf = await createPdf(orderHtml, {
      format: 'A4',
      paginationOffset: 1, // Override the initial pagination number,
      header: {
        height: '50mm',
        contents: OrderPaidHeaderHtml
      },
      footer: {
        height: '35mm',
        contents: OrderPaidFooterHtml
      }
    });
    // return pdf stream
    return {pdfStream: invoicePdf, orderNo: preData.orderNo};
  }

  public async getInoviceEmailBody(
    order: any,
    language: string,
    receiptNo: string,
    utcOffset: number,
    fullWidthStyle = false
  ): Promise<any> {
    const page = await this.pageService.findByPath(
      '/invoice-terms',
      order.workspace.toHexString()
    );
    order = {...order, content: {...page?.content}};
    const emailData: any = {};
    // const companyInfo: any = await this.paramService.getParameter(
    //   ParamType.COMPANY_INFO
    // );
    const workspaceInfo = await this.workspaceService.getParameters(
      'setting',
      order.workspace.toHexString()
    );
    const theme = await this.themeService.findById(workspaceInfo.theme);
    const workspace = await this.workspaceService.findById(
      order.workspace.toHexString()
    );
    if (!workspace) {
      throw new NotFoundException({
        code: 'err_workspace_not_found'
      });
    }
    const receiptBackgroundImage = await this.workspaceService._populate(
      workspace,
      [
        '$preferences.receipt.backgroundImage',
        '$preferences.receipt.headerImage',
        '$preferences.receipt.footerImage'
      ]
    );
    const workspaceJson = receiptBackgroundImage
      ? (receiptBackgroundImage as any)
      : {};
    const backgroundImage =
      workspaceJson?.preferences?.receipt?.backgroundImage?.uri;
    const headerImage = workspaceJson?.preferences?.receipt?.headerImage?.uri;
    const footerImage = workspaceJson?.preferences?.receipt?.footerImage?.uri;

    let itemList = [];
    const orderProductLists = order?.orderProductLists;
    if (orderProductLists) {
      itemList = orderProductLists.map(item => {
        const data = item.toJSON();
        data.product.name = data.product.name[language];
        data.product.productionDate = data?.product?.productionDate
          ? moment(data.product.productionDate)
              .utcOffset(utcOffset)
              .format('YYYY-MM-DD')
          : '';
        return data;
      });
    }

    const chargeServices = order?.chargeServices;
    const chargeServicesList = [];
    if (chargeServices.length > 0) {
      chargeServices.forEach(item => {
        const result = {...item};
        result.name = item.service && item.service.name['zh-hk'];
        result.nameLan = item.service && item.service.name['en'];
        result.amount = helpers.formatNumber(item.amount);
        chargeServicesList.push(result);
      });
    }

    const othersService = order?.charge?.others;
    if (othersService.length > 0) {
      othersService.forEach(item => {
        item.amount = helpers.formatNumber(item.amount);
      });
    }

    const othersServiceEnd =
      othersService && othersService.length > 1
        ? othersService.pop()
        : undefined;
    const chargeServicesEnd =
      chargeServicesList.length > 1 ? chargeServicesList.pop() : undefined;

    const totalAmount = order?.charge?.totalAmount;
    let totalAmountFormat;
    if (totalAmount) {
      totalAmountFormat = helpers.formatNumber(totalAmount);
    }

    const baseAmount = order?.charge?.base;
    let baseAmountFormat;
    if (baseAmount) {
      baseAmountFormat = helpers.formatNumber(baseAmount);
    }
    const paymentMethods = [];
    if (order && order?._paymentMethods && order?._paymentMethods.length > 0) {
      order._paymentMethods.forEach(item => {
        paymentMethods.push(item.name['zh-hk']);
      });
    }
    const remarks1 = [];
    const remarks2 = [];
    const paymentsNo = [];
    let paymentAmount = 0;
    if (order && order?._payments) {
      order._payments &&
        order._payments.transactions &&
        order._payments.transactions.forEach(item => {
          const itemId = item.id;
          const payment = itemId
            .substring(itemId.length - 5)
            .padStart(itemId.length, '*');
          paymentsNo.push(payment);
          remarks1.push(item?.remarks1);
          remarks2.push(item?.remarks2);
        });

      order._payments.transactions.map(item => {
        const itemId = item.id;
        const payment = itemId
          .substring(itemId.length - 5)
          .padStart(itemId.length, '*');
        paymentsNo.push(payment);
        remarks1.push(item.remarks1);
        remarks2.push(item.remarks2);
      });
      const receiptNoAmount =
        order._payments &&
        order._payments.transactions &&
        order._payments.transactions.find(v => v.receiptNo === receiptNo);
      paymentAmount = receiptNoAmount && receiptNoAmount.amount;
    }
    emailData.downPdf = `${process.env.HOST_API}/invoices/${order._id}/download-email-pdf/${receiptNo}/${utcOffset}`;
    emailData.headerImage = headerImage;
    emailData.footerImage = footerImage;
    emailData.baseFee = baseAmountFormat;
    emailData.chargeOthers = othersService;
    emailData.othersServiceEnd = othersServiceEnd;
    emailData.chargeServices = chargeServicesList;
    emailData.chargeServicesEnd = chargeServicesEnd;
    emailData.totalAmount = totalAmountFormat;
    emailData.currency = order?.charge?.currency;
    emailData.orderProductLists = itemList;
    emailData.products = order?._products;
    emailData.colour = theme?.color?.primary;
    emailData.logoUrl = workspaceInfo?.headerLogo;
    emailData.iconFacebook = theme?.icons?.facebook;
    emailData.iconInstagram = theme?.icons?.instagram;
    emailData.iconSearch = theme?.icons?.search;
    emailData.facebookPath = workspace?.socialLinks?.facebook?.url;
    emailData.facebookName = workspace?.socialLinks?.facebook?.name;
    emailData.instagramPath = workspace?.socialLinks?.instagram?.url;
    emailData.instagramName = workspace?.socialLinks?.instagram?.name;
    emailData.youtubePath = workspace?.socialLinks?.youtube?.url;
    emailData.youtubeName = workspace?.socialLinks?.youtube?.name;
    emailData.baiduPath = workspace?.socialLinks?.baidu?.url;
    emailData.baiduName = workspace?.socialLinks?.baidu?.name;
    emailData.webHost = workspace.webHost;
    emailData.userName = this.formatUserName(order?.users);
    emailData.orderNo = order.orderNo;
    emailData.receiptNo = receiptNo;
    emailData.paymentAmount = paymentAmount;
    emailData.date = moment(order?.date)
      .utcOffset(utcOffset)
      .format('YYYY-MM-DD');
    emailData.remarks = order.remarks;
    emailData.handledBy = this.formatUserName(order?._handledBy?.[0]);
    emailData.receiptBackgroundImage = backgroundImage;
    emailData.payment =
      paymentMethods?.length > 0 ? paymentMethods.toString() : null;
    emailData.paymentMethod =
      paymentMethods?.length > 0 ? paymentMethods[0] : null;
    emailData.paymentNo =
      paymentsNo?.length > 0
        ? paymentsNo[0]
            .substring(paymentsNo[0].length - 5)
            .padStart(paymentsNo[0].length, '*')
        : null;
    emailData.paymentNos = paymentsNo.length > 0 ? paymentsNo.toString() : null;
    emailData.userLevel =
      order?._memberLevels?.length > 0
        ? order?._memberLevels?.[0]?.name[language]
        : '';
    emailData.display_terms = localeInstance.t('display_terms', [], language);
    emailData.content =
      order?.content?.widgets?.length > 0
        ? order?.content?.widgets?.[0]?.data['zh-hk']?.text
        : '';
    emailData.content_en =
      order?.content?.widgets?.length > 0
        ? order?.content?.widgets?.[0]?.data['en']?.text
        : '';
    emailData.display_class = localeInstance.t('display_class', [], language);

    emailData.remarks1 = remarks1?.length > 0 ? remarks1[0] : null;
    emailData.remarks2 = remarks2?.length > 0 ? remarks2[0] : null;

    emailData.remarks1Item = emailData.remarks1 ? remarks1.toString() : null;
    emailData.remarks2Item = emailData.remarks2 ? remarks2.toString() : null;
    emailData.display_base_fee = localeInstance.t(
      'display_base_fee',
      [],
      'zh-hk'
    );
    emailData.display_paymentMethod = localeInstance.t(
      'display_paymentMethod',
      [],
      language
    );
    emailData.display_qty = localeInstance.t('display_qty', [], language);
    emailData.display_number = localeInstance.t('display_number', [], language);
    emailData.display_name = localeInstance.t('display_name', [], language);
    emailData.display_receipt = localeInstance.t(
      'display_receipt',
      [],
      language
    );
    emailData.event_education_display = localeInstance.t(
      'event_education_display',
      [],
      language
    );
    emailData.display_down_pdf = localeInstance.t(
      'display_down_pdf',
      [],
      language
    );
    emailData.display_remarks = localeInstance.t(
      'display_remarks',
      [],
      language
    );
    emailData.display_staff = localeInstance.t('display_staff', [], language);
    emailData.appTeamName = localeInstance.t(
      'email_footer_content',
      [],
      language
    );
    emailData.display_order_title = localeInstance.t(
      'display_order_title',
      [],
      language
    );
    emailData.display_date = localeInstance.t('display_date', [], language);
    emailData.display_orderNo = localeInstance.t(
      'display_orderNo',
      [],
      language
    );
    emailData.display_userName = localeInstance.t(
      'display_userName',
      [],
      language
    );

    emailData.display_invoice = localeInstance.t(
      'display_invoice',
      [],
      language
    );

    emailData.receipt_workspace_name = localeInstance.t(
      'display_receipt_workspace_name',
      [workspace?.name],
      language
    );

    emailData.display_amount_paid = localeInstance.t(
      'display_amount_paid',
      [],
      language
    );

    emailData.signOff = localeInstance.t('email_sign_off', [], language);
    emailData.email_footer_content = localeInstance.t(
      'email_footer_content',
      [workspace?.code],
      language
    );
    // pdf should customer header and footer
    emailData.customerHrader = false;
    emailData.customerFooter = false;

    // now 800px in email
    emailData.fullWidthStyle = fullWidthStyle;

    let ejsValue;
    let ejsReceiptValue;
    if (workspace && workspace.code) {
      ejsReceiptValue = `pdf/receipt-${workspace.code}.ejs`;
      ejsValue = `email/orderPaid-${workspace.code}.ejs`;
    }

    const invoicePath = path.resolve('views/' + ejsValue);
    const receiptPath = path.resolve('views/' + ejsReceiptValue);

    if (!fs.existsSync(invoicePath)) {
      ejsValue = 'email/orderPaid.ejs';
    }

    if (!fs.existsSync(receiptPath)) {
      ejsReceiptValue = 'pdf/receipt.ejs';
    }

    if (emailData.fullWidthStyle) {
      ejsValue = ejsReceiptValue;
    } else {
      ejsValue = ejsValue;
    }
    const orderHtml = await this.mailerService.getEmailTemplate(
      ejsValue,
      emailData
    );
    const OrderPaidHeaderHtml = await this.mailerService.getEmailTemplate(
      'email/orderPaidHeader.ejs',
      emailData
    );
    const OrderPaidFooterHtml = await this.mailerService.getEmailTemplate(
      'email/orderPaidFooter.ejs',
      emailData
    );
    return {emailData, orderHtml, OrderPaidHeaderHtml, OrderPaidFooterHtml};
  }

  public async downloadInvoicePdf(_id: string): Promise<any> {
    const preData = await this.orderService.getInvoiceByOrderId(_id);
    const {emailData, OrderPaidHeaderHtml, OrderPaidFooterHtml} =
      await this.getInoviceEmailBody(
        preData,
        preData.language,
        '',
        preData.utcOffset,
        true
      );
    const workspace = await this.workspaceService.findById(
      preData.workspace.toHexString()
    );
    let ejsInvoiceValue;
    if (workspace && workspace.code) {
      ejsInvoiceValue = `pdf/invoice-${workspace.code}.ejs`;
    }
    const invoicePath = path.resolve('views/' + ejsInvoiceValue);
    if (!fs.existsSync(invoicePath)) {
      ejsInvoiceValue = 'pdf/invoice.ejs';
    }
    const orderHtml = await this.mailerService.getEmailTemplate(
      ejsInvoiceValue,
      emailData
    );

    // create invoice pdf by invoice html
    const invoicePdf = await createPdf(orderHtml, {
      format: 'A4',
      paginationOffset: 1, // Override the initial pagination number,
      header: {
        height: '50mm',
        contents: OrderPaidHeaderHtml
      },
      footer: {
        height: '35mm',
        contents: OrderPaidFooterHtml
      }
    });
    // return pdf stream
    return {pdfStream: invoicePdf, orderNo: preData.orderNo};
  }

  /**
   * receipt display user name use firstName + lastName
   * @param user IUser
   */
  private formatUserName(user: IUser): string {
    if (!user) {
      return undefined;
    }
    const first = user?.firstName ?? '';
    const last = user?.lastName ?? '';
    return first && last ? `${first} ${last}` : first || last || user?.username;
  }
}
