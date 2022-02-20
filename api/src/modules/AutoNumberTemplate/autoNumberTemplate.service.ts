import {Injectable, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  AutoNumberTemplateCreateModel,
  AutoNumberTemplateUpdateModel,
  AutoNumberTemplateSearchModel
} from './models';
import {AutoNumberTemplate, AutoNumberTemplateModel} from './interfaces';

@Injectable()
export class AutoNumberTemplateService extends BaseCRUDService<
  AutoNumberTemplate,
  AutoNumberTemplateCreateModel,
  AutoNumberTemplateUpdateModel,
  AutoNumberTemplateSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('AutoNumberTemplates')
    private readonly autoNumberTemplateRepository: AutoNumberTemplateModel
  ) {
    super(autoNumberTemplateRepository, request);
  }

  public _castQuery(searchModel: AutoNumberTemplateSearchModel) {
    const query: any = {};
    const {type, workspace, subType} = searchModel;

    if (type) {
      query.type = type;
    }
    if (workspace) {
      query.workspace = workspace;
    }
    if (subType) {
      query.subType = subType;
    }

    return query;
  }
}
