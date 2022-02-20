import {UseFilters} from '@nestjs/common';
import {Resolver, ResolveField, Parent, Args, Query} from '@nestjs/graphql';
import {
  GqlLocaleDecorator,
  GraphQLExceptionFilter,
  RequireLogin
} from 'src/core';
import {ServiceService} from './service.service';

@Resolver('Service')
@UseFilters(GraphQLExceptionFilter)
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @ResolveField('name')
  async getName(@Parent() service, @GqlLocaleDecorator() locale) {
    if (!service.name) {
      return null;
    }
    return service.name[locale.getLanguage()];
  }

  @ResolveField('description')
  async getDescription(@Parent() service, @GqlLocaleDecorator() locale) {
    if (!service.description) {
      return null;
    }
    return service.description[locale.getLanguage()];
  }

  @ResolveField('icon')
  async getFileMetaIcon(@Parent() service) {
    if (!service.icon) {
      return null;
    }
    const {icon} = await this.serviceService._populate(service, ['icon']);

    return icon;
  }

  @ResolveField('category')
  async getCategory(@Parent() service) {
    // return null if _uom not defined
    if (!service._category) {
      return null;
    }

    // virtual populate
    const {category} = await this.serviceService._populate(service, [
      'category'
    ]);

    return category;
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() service) {
    if (!service.workspace) {
      return null;
    }
    const {workspace} = await this.serviceService._populate(service, [
      'workspace'
    ]);
    return workspace;
  }

  @Query()
  async service(@Args('id') id: string) {
    return this.serviceService.findById(id, {lean: true});
  }

  @Query()
  async servicesInUserProfile() {
    return this.serviceService.getServiceShowInUserProfile();
  }

  @Query()
  async services(@Args('query') query, @Args('paginate') paginate) {
    return this.serviceService.findWithCursorPaginate(query, paginate);
  }

  @Query()
  @RequireLogin()
  async skillServices() {
    return this.serviceService.getSkillServices();
  }
}
