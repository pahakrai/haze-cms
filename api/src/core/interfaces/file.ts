import {FileMeta} from 'src/modules/File/FileMeta/interfaces';

export enum FileType {
  'ReactNative',
  'FormData'
}

export interface File {
  /**
   * document type uploaded can be in common later
   */
  fileType: string;

  /**
   * document id referencing to fileMeta
   */
  file: FileMeta['_id'] | FileMeta;

  /**
   * referencing if document/file is verified
   */
  isVerified: boolean;
}
