'use strict';
import {FileMetaUpdateModel, FileMetaCreateModel} from '../../FileMeta/models';

export interface IBlobService {
  delete(fileName: string, type: string);
  uploadFiles(files: any, options: any, tags: any);
  uploadFile(file: any, options: object, req, tags: any, type: any);
  uploadFileByServiceType(
    file: any,
    folderName: any,
    tags: any,
    serviceType: any
  ): Promise<FileMetaCreateModel>;
  update(_id: string, fileMetaUpdateModel: FileMetaUpdateModel, files: any);
  mapUploadFiles(uploadFiles: Array<any>);
}
