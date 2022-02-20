import {IsMongoId, IsOptional, IsString} from 'class-validator';

export class ProductMediaListModel {
  @IsMongoId()
  _id: string;

  @IsMongoId()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
