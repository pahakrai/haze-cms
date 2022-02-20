import {Min, IsString, IsNumber, IsMongoId, IsOptional} from 'class-validator';

export class AutoNumberCreateModel {
  @IsString()
  prefix: string;

  @Min(1)
  @IsNumber()
  lastNo: number;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  subType?: string;

  @IsMongoId()
  workspace: string;
}
