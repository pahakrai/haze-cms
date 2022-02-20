import {
  Min,
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
  IsDate
} from 'class-validator';
import {OrderServiceModel} from 'src/modules/Order/models';

export class PriceCalculationLocModel {
  @IsString()
  @IsOptional()
  region?: string;

  @IsOptional()
  @IsNumber({allowNaN: false}, {each: true})
  coordinates?: number[];
}

export class PriceCalculationModel {
  @ValidateNested()
  locFr: PriceCalculationLocModel;

  @ValidateNested({each: true})
  locTo: PriceCalculationLocModel[];

  @IsOptional()
  @IsDate()
  scheduleTime?: Date;

  @Min(0)
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  tips?: number;

  @ValidateNested({each: true})
  services: OrderServiceModel[];
}
