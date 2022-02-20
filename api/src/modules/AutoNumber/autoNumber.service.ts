import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import moment from 'moment';
import StringFormat from 'string-format';

import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {NotFoundException} from 'src/core';
// interfaces & models
import {
  AutoNumberCreateModel,
  AutoNumberUpdateModel,
  AutoNumberSearchModel,
  AutoNumberGenerateModel
} from './models';
import {AutoNumber, AutoNumberModel} from './interfaces';
import {AutoNumberTemplateService} from '../AutoNumberTemplate/autoNumberTemplate.service';

@Injectable({scope: Scope.REQUEST})
export class AutoNumberService extends BaseCRUDService<
  AutoNumber,
  AutoNumberCreateModel,
  AutoNumberUpdateModel,
  AutoNumberSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('AutoNumbers')
    private readonly autoNumberRepository: AutoNumberModel,
    private readonly autoNumberTemplateService: AutoNumberTemplateService
  ) {
    super(autoNumberRepository, request);
  }

  /**
   * generate an new auto-number
   *
   * For template data design:
   * {0} is workspace code (if provided)
   * {1} is formatted date (based on AutoNumberTemplate.dateFormat)
   * {2} is auto-increment number
   *
   * e.g.
   * {0}-{1}{2}
   * {1}-{2}
   * {2}
   *
   * @param generateModel data required to generate new number
   */
  public async generate(generateModel: AutoNumberGenerateModel) {
    const {
      type,
      workspace,
      date = new Date(),
      workspaceCode = ''
    } = generateModel;

    // get template
    const template = await this.autoNumberTemplateService.findOne({
      type,
      workspace,
      subType: generateModel?.subType
    });

    // if can't find template, return null
    if (!template) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {
          key: 'key_autoNumber_template'
        }
      });
    }

    // generate prefix
    const formattedDate = moment(date).format(template.dateFormat);
    const prefix = StringFormat(
      template?.prefix || '',
      workspaceCode,
      formattedDate
    );

    // get next availabel number
    const nextNumber = await this.getNextAvailableNumber({
      type,
      prefix,
      workspace,
      subType: generateModel?.subType
    });

    // return new auto-number
    return StringFormat(
      template.expression,
      workspaceCode,
      formattedDate,
      String(nextNumber).padStart(template.digits, '0')
    );
  }

  /**
   * get next available auto-number
   * this will find in db for next available number
   * if not found, it'll insert 1 new data and return 1
   *
   * @param model search model for db
   */
  public async getNextAvailableNumber(model: AutoNumberSearchModel) {
    if (!model.subType) {
      delete model.subType;
    }
    let autoNumber = await this.autoNumberRepository.findOne(model);

    if (autoNumber) {
      // increment lastNo first
      autoNumber = await this.update(autoNumber._id.toHexString(), {
        $inc: {lastNo: 1}
      });

      return autoNumber.lastNo;
    } else {
      // autoNumber not exist, create new one
      autoNumber = await this.create({
        lastNo: 1,
        type: model.type,
        prefix: model.prefix,
        workspace: model.workspace ? model.workspace : null,
        subType: model.subType
      });

      return autoNumber.lastNo;
    }
  }

  public _castQuery(searchModel: AutoNumberSearchModel) {
    const query: any = {};
    const {type, workspace, prefix} = searchModel;

    if (type) {
      query.type = type;
    }
    if (workspace) {
      query.workspace = workspace;
    }
    if (prefix) {
      query.prefix = prefix;
    }

    return query;
  }
}
