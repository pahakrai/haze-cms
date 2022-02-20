import {IsOptional} from 'class-validator';

export class ProductSpecIconModel {
  @IsOptional()
  icon?: string;

  @IsOptional()
  activeIcon?: string;
}
