import {IsOptional, IsEnum} from 'class-validator';

enum FileType {
  'ReactNative',
  'FormData'
}

export class UserProfileFiles {
  @IsEnum(FileType)
  type: 'ReactNative' | 'FormData';

  @IsOptional()
  files: Array<any>;
}
