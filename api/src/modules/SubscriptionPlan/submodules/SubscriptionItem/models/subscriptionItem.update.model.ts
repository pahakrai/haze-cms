import {ValidateNested, IsBoolean, IsOptional} from 'class-validator';
import {LocalizeStringModel} from 'src/core';
import {ApiProperty} from '@nestjs/swagger';
export class SubscriptionItemUpdateModel {
  @ValidateNested()
  @ApiProperty({description: 'name'})
  name: LocalizeStringModel;

  @ValidateNested()
  @ApiProperty({description: 'description'})
  description: LocalizeStringModel;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({description: 'is subscriptionItems active'})
  isActive?: boolean;
}
