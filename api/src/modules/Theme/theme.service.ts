import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {ThemeCreateModel, ThemeUpdateModel, ThemeSearchModel} from './models';
import {ITheme, IThemeModel} from './interfaces';
import {IUser, UserService} from '../User';

@Injectable({scope: Scope.REQUEST})
export class ThemeService extends BaseCRUDService<
  ITheme,
  ThemeCreateModel,
  ThemeUpdateModel,
  ThemeSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Themes')
    private readonly themeRepository: IThemeModel,
    private readonly userService: UserService
  ) {
    super(themeRepository, request);
  }

  public _castQuery(searchModel: ThemeSearchModel) {
    const {q} = searchModel;
    const query: any = {$and: []};
    if (q) {
      const qReg = new RegExp(q, 'i');
      const $or = [
        {
          scope: qReg
        },
        {
          baseTheme: qReg
        }
      ];
      query.$and.push({$or});
    }

    if (!query.$and.length) delete query.$and;
    return query;
  }

  /**
   * get my themes
   */
  public async getMyThemes(scope: string) {
    const userId = this.getCurrentUser<IUser>()._id.toHexString();
    const user = await this.userService.findById(userId);

    const _ids = user.preferences.themes
      .filter(t => t !== null && t.scope === scope)
      .map(t => t.theme.toHexString());

    // let myThemeId = null;
    // user.preferences.themes.filter(t => {
    //   if (t.scope.toString() === scope) {
    //     myThemeId = t.theme;
    //   }
    // });

    const themes = this.themeRepository.find({_id: {$in: _ids}});
    return themes;
  }
}
