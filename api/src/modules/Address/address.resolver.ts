import {UseFilters} from '@nestjs/common';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField
} from '@nestjs/graphql';
import {GraphQLExceptionFilter, RequireLogin} from 'src/core';
import {AddressService} from './address.service';

@Resolver('Address')
@UseFilters(GraphQLExceptionFilter)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @ResolveField('country')
  async getCountry(@Parent() address) {
    if (!address.country) {
      return null;
    }
    const {country} = await this.addressService._populate(address, ['country']);
    return country;
  }

  @ResolveField('state')
  async getState(@Parent() address) {
    if (!address.state) {
      return null;
    }
    const {state} = await this.addressService._populate(address, ['state']);
    return state;
  }

  @ResolveField('city')
  async getCity(@Parent() address) {
    if (!address.city) {
      return null;
    }
    const {city} = await this.addressService._populate(address, ['city']);
    return city;
  }

  @Query()
  async address(@Args('id') id: string) {
    return this.addressService.findById(id, {lean: true});
  }

  @Query()
  async addresss(
    @Args('query') query,
    @Args('paginate') paginate,
    @Args('options') options = {}
  ) {
    return this.addressService.findWithCursorPaginate(query, {
      ...paginate,
      ...options
    });
  }

  @Mutation()
  @RequireLogin()
  async createAddress(@Args('addressCreateModel') addressCreateModel) {
    return this.addressService.create(addressCreateModel, {lean: true});
  }

  @Mutation()
  @RequireLogin()
  async updateAddress(
    @Args('id') id: string,
    @Args('addressUpdateModel') addressUpdateModel
  ) {
    return this.addressService.update(id, addressUpdateModel, {lean: true});
  }
}
