import {IsOptional, IsMongoId, IsBoolean, Min, IsNumber} from 'class-validator';
import {FileModel} from 'src/core/models';
import {PreferenceModel} from './member.preference.model';

export class MemberUpdateModel {
  @IsOptional({each: true})
  files?: Array<FileModel>;

  @IsOptional()
  meta?: JSON;

  @IsOptional()
  preferences?: PreferenceModel;

  @IsOptional()
  @IsMongoId()
  level?: string;

  @IsBoolean()
  @IsOptional()
  'preferences.showAvgFeedback'?: boolean;

  @Min(0)
  @IsNumber()
  @IsOptional()
  avgFeedback?: number;
}
