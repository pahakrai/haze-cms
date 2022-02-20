import {IsString, IsOptional} from 'class-validator';
// import {ApiProperty} from '@nestjs/swagger';

export class WorkspaceMarketingModel {
  @IsString()
  @IsOptional()
  googleTagManager?: string;

  @IsString()
  @IsOptional()
  facebookPixel?: string;
}
