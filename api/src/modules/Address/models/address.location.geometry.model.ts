import {IsString, IsOptional, IsArray} from 'class-validator';

export class LocationGeometryModel {
  @IsString()
  @IsOptional()
  type?: string;

  @IsArray()
  @IsOptional()
  coordinates?: Array<number> | Array<Array<number>>;
}
