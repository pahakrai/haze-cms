import {IsMongoId, IsOptional, IsString} from 'class-validator';

export class TagImageUpdateModel {
  @IsOptional()
  @IsString()
  text?: string;

  @IsMongoId()
  @IsOptional()
  image?: string;
}
