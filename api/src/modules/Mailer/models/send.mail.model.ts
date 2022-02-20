import {IsString, IsNotEmpty, IsOptional, IsMongoId} from 'class-validator';

export class SendMailModel {
  @IsString()
  @IsNotEmpty()
  /**
   * receiver of mail
   */
  to: string;

  @IsMongoId()
  @IsNotEmpty()
  workspace: string;

  @IsString()
  @IsNotEmpty()
  /**
   * mail subject
   */
  subject: string;

  @IsString()
  @IsNotEmpty()
  /**
   * mail content
   */
  body: string;

  @IsOptional({each: true})
  attachments?: any[];
}
