import {IsMongoId, IsOptional, ValidateNested} from 'class-validator';
import {PreferenceModel} from './member.preference.model';

export class MemberCreateModel {
  @IsMongoId()
  user: string;

  @IsOptional()
  meta?: JSON;

  @IsOptional()
  @ValidateNested({each: true})
  preferences?: PreferenceModel;

  @IsOptional()
  @IsMongoId()
  level?: string;
}
