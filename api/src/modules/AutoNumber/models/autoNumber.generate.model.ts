import {
  IsString,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsMongoId
} from 'class-validator';

export class AutoNumberGenerateModel {
  @IsMongoId()
  @IsOptional()
  workspace?: string;

  @IsString()
  @IsOptional()
  workspaceCode?: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  subType?: string;

  @IsDate()
  @IsOptional()
  date?: Date;
}
