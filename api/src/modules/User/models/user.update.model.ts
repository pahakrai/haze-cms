import {
  IsString,
  IsBoolean,
  IsMongoId,
  IsOptional,
  ValidateNested
} from 'class-validator';
import {UserPreferencesUpdateModel} from './user.preferences.update.model';
import {UserActivationIssueUpdateModel} from './user.activationIssue.update.model';
import {UserVerifiedUpdateModel} from './user.verified.update.model';

export class UserUpdateModel {
  @IsMongoId()
  @IsOptional()
  currentWorkspace?: string;

  @IsOptional()
  @IsString({each: true})
  userTypes?: string[];

  @IsOptional()
  @IsString()
  dob?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  phoneRegionCode?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsBoolean()
  status?: number;

  @IsOptional()
  @ValidateNested()
  verified?: UserVerifiedUpdateModel;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  avatars?: Array<{
    _id?: string;
    fileMeta?: string;
    default?: boolean;
  }>;

  @IsOptional()
  @ValidateNested()
  preferences?: UserPreferencesUpdateModel;

  @IsOptional()
  @ValidateNested()
  activationIssues?: UserActivationIssueUpdateModel[];
}
