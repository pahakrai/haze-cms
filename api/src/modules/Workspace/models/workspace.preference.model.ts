import {ApiProperty} from '@nestjs/swagger';
import {
  IsInt,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  IsBoolean
} from 'class-validator';
import common from '@golpasal/common';

const {TwilioVerifyChannelType, OrderLogisticLocationType, UserType} =
  common.type;
const {PayrollCalculationMethod} = common.method;

class WorkspacePreferenceAuthTwilioModel {
  @IsOptional()
  @IsEnum(TwilioVerifyChannelType)
  @ApiProperty({
    required: false,
    description: 'channel for twilio.verify.create()'
  })
  channel?: 'sms' | 'call' | 'email';

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'whether use Twilio Authy or our own authentication'
  })
  useAuthy?: boolean;
}

class WorkspacePreferenceAuthLimitModel {
  @IsInt()
  @IsOptional()
  user?: number;

  @IsInt()
  @IsOptional()
  member?: number;

  @IsInt()
  @IsOptional()
  provider?: number;

  @IsInt()
  @IsOptional()
  programmatic?: number;
}

export class WorkspacePreferenceAuthModel {
  @ValidateNested()
  @IsOptional()
  authorizedDeviceLimit?: WorkspacePreferenceAuthLimitModel;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'how many times to send request pass code limit'
  })
  dailyRequestPasscodeLimit?: number;

  @IsOptional()
  @ValidateNested()
  twilioLogin?: WorkspacePreferenceAuthTwilioModel;
}

export class WorkspacePreferenceEventModel {
  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'user cannot update event in the time before start (in ms)'
  })
  notAllowModifyIn?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'maxinum no. of PIC allowed for an event (0 for unlimited)'
  })
  peopleInChargeLimit?: number;
}

export class WorkspacePreferencePayrollModel {
  @ApiProperty({
    description: 'payroll PayrollCalculationMethod'
  })
  @IsString()
  @IsOptional()
  @IsEnum(PayrollCalculationMethod)
  calculationMethod?: string;

  @IsBoolean()
  @IsOptional()
  calculateAmountByDetails?: boolean;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;
}

export class WorkspaceUserTypePreference {
  @IsString()
  @IsOptional()
  icon?: string;

  @IsBoolean()
  @IsOptional()
  allowChangePhone?: boolean;
}

export class ApplyRecruitmentLimitModel {
  @IsString()
  @IsOptional()
  currency: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsOptional()
  @IsString({each: true})
  recruitmentTypes: string[];
}

export class WorkspaceReceiptModel {
  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @IsString()
  @IsOptional()
  headerImage?: string;

  @IsString()
  @IsOptional()
  footerImage?: string;
}

export class WorkspaceOrderModel {
  @IsBoolean()
  @IsOptional()
  subscription?: boolean;

  @IsOptional()
  @IsNumber()
  dailyCancelLimit?: number;

  @IsBoolean()
  @IsOptional()
  hasConsignee?: boolean;

  @IsBoolean()
  @IsOptional()
  hasInvoice?: boolean;

  @IsBoolean()
  @IsOptional()
  allowEdit?: boolean;

  @IsBoolean()
  @IsOptional()
  allowShoppingNoAddress?: boolean;

  @IsOptional()
  @IsEnum(UserType, {each: true})
  clientUserTypes?: string[];

  @IsBoolean()
  @IsOptional()
  consumeCredit?: boolean;

  @IsBoolean()
  @IsOptional()
  enableSignature?: boolean;

  @IsOptional()
  @IsEnum(OrderLogisticLocationType)
  locationType: string;

  @IsBoolean()
  @IsOptional()
  updatePeopleInCharge?: boolean;

  @IsOptional()
  @IsNumber()
  acceptOrderCoolingOffPeriod?: number;
}

export class WorkspaceServiceModel {
  @IsBoolean()
  @IsOptional()
  pricing?: boolean;
}

export class WorkspaceProductModel {
  @IsBoolean()
  @IsOptional()
  isEnableCart?: boolean;

  @IsBoolean()
  @IsOptional()
  hasDeliveryAndPaymentInfo?: boolean;
}

export class WorkspaceRecruitmentModel {
  @IsBoolean()
  @IsOptional()
  invitePushNotificaton?: boolean;

  @IsBoolean()
  @IsOptional()
  enableViews?: boolean;

  @IsOptional()
  @ValidateNested()
  applyRecruitmentLimit?: ApplyRecruitmentLimitModel;

  @IsBoolean()
  @IsOptional()
  allowEdit?: boolean;
}

export class WorkspacePreferenceUserVehicleModel {
  @IsBoolean()
  @IsOptional()
  enableNearBy?: boolean;

  @IsNumber()
  @IsOptional()
  reload?: number;
}

export class WorkspacePreferenceModel {
  @IsOptional()
  @ValidateNested()
  auth?: WorkspacePreferenceAuthModel;

  @IsOptional()
  @ValidateNested()
  event?: WorkspacePreferenceEventModel;

  @IsOptional()
  @IsString({each: true})
  widgets?: string[];

  @IsOptional()
  @ValidateNested()
  payroll?: WorkspacePreferencePayrollModel;

  @IsOptional()
  @ValidateNested()
  member?: WorkspaceUserTypePreference;

  @IsOptional()
  @ValidateNested()
  merchant?: WorkspaceUserTypePreference;

  @IsOptional()
  @ValidateNested()
  receipt?: WorkspaceReceiptModel;

  @IsOptional()
  @ValidateNested()
  order?: WorkspaceOrderModel;

  @IsOptional()
  @IsString()
  mapType: string;

  @IsOptional()
  @ValidateNested()
  service?: WorkspaceServiceModel;

  @IsOptional()
  @ValidateNested()
  product?: WorkspaceProductModel;

  @IsOptional()
  @ValidateNested()
  userVehicle?: WorkspacePreferenceUserVehicleModel;
}
