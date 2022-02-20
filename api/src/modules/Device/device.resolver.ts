import {Resolver, Args, Mutation, Parent, ResolveField} from '@nestjs/graphql';

// services
import {DeviceService} from './device.service';

// guards
@Resolver('Device')
export class DeviceResolver {
  constructor(private readonly deviceService: DeviceService) {}

  @Mutation()
  async updateDeviceState(@Args('deviceState') deviceState) {
    const device = await this.deviceService.registerDevice(deviceState);
    return device;
  }

  @Mutation()
  async updateDeviceLocation(
    @Args('deviceId') deviceId: string,
    @Args('coordinates') coordinates: number[],
    @Args('heading') heading?: number
  ) {
    const device = await this.deviceService.updateDeviceLocation(
      deviceId,
      coordinates,
      heading
    );
    return device;
  }

  @ResolveField('user')
  async getUser(@Parent() device) {
    const {user} = await this.deviceService._populate(device, ['user']);
    return user;
  }
}
