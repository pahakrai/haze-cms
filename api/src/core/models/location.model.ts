import {ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsMongoId
} from 'class-validator';

class LocationPropertyModel {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsMongoId()
  @IsOptional()
  district?: string;

  @IsOptional()
  @IsMongoId({each: true})
  regions?: string[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  elevation_m?: number;

  mapResult?: any;
}

class LocationGeometryModel {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber({allowNaN: false, allowInfinity: false}, {each: true})
  coordinates: Array<number>;
}

export class LocationInputModel {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @ValidateNested()
  properties: LocationPropertyModel;

  @ApiProperty()
  @ValidateNested()
  geometry: LocationGeometryModel;
}
