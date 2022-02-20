import {IsEnum} from 'class-validator';
import {FileType} from 'src/core/interfaces';

export class MemberFilesModel {
  @IsEnum(FileType)
  type: 'ReactNative' | 'FormData';
}
