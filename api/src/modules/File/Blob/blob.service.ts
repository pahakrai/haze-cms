'use strict';
// npm
import * as fs from 'fs';
import * as path from 'path';
import mongoose from 'mongoose';
import {Injectable} from '@nestjs/common';
import lib from '@golpasal/lib';
import {BadRequestException} from 'src/core';
import common from '@golpasal/common';

// module
import {IBlobService} from './interfaces';
import {FilemetaService} from '../FileMeta/filemeta.service';
import {FileSystemService} from './fileSystem.service';
import {AWSS3Service} from 'src/modules/Aws/aws.s3.service';

import {FileMetaCreateModel, FileMetaUpdateModel} from '../FileMeta/models';

const {BlobServiceType} = common.type;

const {createThumbnail} = lib;

const {ObjectId} = mongoose.Types;

@Injectable()
export class BlobService implements IBlobService {
  constructor(
    private readonly fileMetaService: FilemetaService,
    private readonly s3Service: AWSS3Service,
    private readonly fileSystemService: FileSystemService
  ) {}

  /**
   * delete one file by _id
   * @param id filemeta ._id
   * @param serviceType Blob Service Type
   */
  public async delete(id, serviceType) {
    let thumbnailFilename, thumbnailPath;
    const file = await this.fileMetaService.findById(id);
    if (file.isSystemFile) {
      throw new BadRequestException({code: 'err_filemeta_can_not_delete'});
    }
    if (file.thumbnailUri) {
      thumbnailFilename = path.basename(file.thumbnailUri);
      thumbnailPath = `${file.folder}/${thumbnailFilename}`;
    }

    const filePath = `${file.folder}/${file.displayName}`;
    switch (serviceType) {
      case BlobServiceType.AWS_S3:
        await this.s3Service.deleteFile(filePath);
        if (thumbnailPath) {
          await this.s3Service.deleteFile(thumbnailPath);
        }
        await this.fileMetaService.delete(file._id.toHexString());
        break;
      case BlobServiceType.LOCAL:
        await this.fileSystemService.delete(filePath);
        await this.fileMetaService.delete(file._id.toHexString());
        break;
      default:
        // only remove FileMeta
        await this.fileMetaService.delete(file._id.toHexString());
        break;
    }
  }

  /**
   * uploadFile file
   * @param files files
   * @param folderName the folder in cloud Service
   * @param tagsParam tags
   */
  public async uploadFiles(files, folder, tags = [], isSystemFile = false) {
    if (!(files instanceof Array)) {
      throw new BadRequestException({code: 'err_file_format_error'});
    }
    // handle file upload 1 by 1, return array of promises
    try {
      return Promise.all(
        files.map(file =>
          this.uploadFile(
            file,
            folder !== undefined
              ? folder
              : process.env.BLOB_UPLOAD_IMAGE_FOLDER,
            tags,
            isSystemFile
          )
        )
      );
    } catch (e) {
      console.error('File Upload Error: ', e);
      throw new Error('File Upload Error');
    }
  }

  /**
   * uploadFile file
   * @param file file
   * @param folder the folder in cloud Service
   * @param tags tags
   * @param serviceType Blob Service Type
   */
  public async uploadFile(
    file,
    folder,
    tags = [],
    isSystemFile = false,
    serviceType = process.env.BLOB_ENGINE,
    fileMetaId = ''
  ) {
    if (
      // eslint-disable-next-line
      /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/.test(
        file.originalname
      )
    ) {
      // rename as random
      const ext = file.originalname.substring(file.originalname.indexOf('.'));
      file.originalname = `${new ObjectId()}${ext}`;
    }
    const fileMetaModel = await this.uploadFileByServiceType(
      file,
      folder,
      tags,
      serviceType,
      fileMetaId,
      isSystemFile
    );
    return fileMetaId
      ? this.fileMetaService.update(fileMetaId, fileMetaModel)
      : this.fileMetaService.create(fileMetaModel);
  }

  /**
   * uploadFileWithS3 file
   * @param file file
   * @param folderName the folder in cloud Service
   * @param tags tags
   * @param serviceType Blob Service Type
   */
  public async uploadFileByServiceType(
    file,
    folderName: string,
    tags: Array<string> | string,
    serviceType = process.env.BLOB_ENGINE,
    fileMetaId = '',
    isSystemFile = false
  ): Promise<FileMetaCreateModel> {
    let fileUrl;
    let thumbUrl = '';
    let displayName = '';
    const _id = fileMetaId || new ObjectId().toHexString();
    const isUploadVideo = file.mimetype.startsWith('video');
    const fileExtension = path.extname(file.originalname).toLowerCase();

    switch (serviceType) {
      case BlobServiceType.AWS_S3: {
        const thumbFile = await createThumbnail(file);
        if (thumbFile) {
          if (
            thumbFile.path.startsWith('http://') ||
            thumbFile.path.startsWith('https://')
          ) {
            thumbUrl = thumbFile.path;
          } else {
            // upload thumbnail to s3
            displayName = `${file.originalname
              .split('.')[0]
              .split(' ')
              .join('_')}-${thumbFile.filename}`;
            thumbUrl = await this.s3Service.upload(
              thumbFile.path,
              `${folderName}/${displayName}`,
              {
                ContentType: thumbFile.mimetype,
                ContentDisposition: `inline; filename="${file.originalname}"`
              }
            );

            // remove local tmp file after upload
            fs.unlinkSync(thumbFile.path);
          }
        }
        // upload origin file to s3
        if (isUploadVideo) {
          displayName = `${_id}${fileExtension}`;
          fileUrl = await this.s3Service.upload(
            file.path,
            `${folderName}/${displayName}`,
            {
              ContentType: file.mimetype,
              ContentDisposition: `inline; filename="${file.originalname}"`
            }
          );
        } else {
          displayName = `${file.originalname
            .split('.')[0]
            .split(' ')
            .join('_')}-${file.filename}`;
          fileUrl = await this.s3Service.upload(
            file.path,
            `${folderName}/${displayName}`,
            {
              ContentType: file.mimetype,
              ContentDisposition: `inline; filename="${file.originalname}"`
            }
          );
        }
        // remove local tmp file after upload
        fs.unlinkSync(file.path);
        break;
      }
      case BlobServiceType.LOCAL: {
        const thumbFile = await createThumbnail(file);
        if (thumbFile) {
          thumbUrl = await this.fileSystemService.upload(
            thumbFile,
            folderName,
            {
              'Content-Type': thumbFile.mimetype,
              'x-amz-acl': 'public-read'
            }
          );
        }
        fileUrl = await this.fileSystemService.upload(file, folderName, {
          'Content-Type': thumbFile.mimetype,
          'x-amz-acl': 'public-read'
        });
        break;
      }
      case BlobServiceType.ALIYUN_OSS:
        break;

      default:
        break;
    }

    // parse tags
    let tagsArray: Array<string>;
    if (Array.isArray(tags)) {
      tagsArray = tags;
    } else if (typeof tags === 'string' && tags) {
      // hash tag seperated by #
      tagsArray = tags.replace(/\s+/g, '').split('#');
    }
    // return FileMetaCreateModel
    const fileMetaModel: FileMetaCreateModel = {
      _id,
      folder: folderName,
      serviceType,
      tags: tagsArray ? tagsArray.filter(t => t !== '') : [],
      uri: fileUrl,
      thumbnailUri: thumbUrl,
      originalName: file.originalname,
      fileExtension,
      displayName,
      uploadedName: displayName,
      size: file.size,
      isSystemFile: isSystemFile,
      workspace: '',
      mimetype: file.mimetype
    };
    return fileMetaModel;
  }

  /**
   * update fileMeta
   * @param files files
   * @param _id fileMeta id
   * @param files files
   */
  public async update(
    _id: string,
    fileMetaUpdateModel: FileMetaUpdateModel,
    files: any
  ) {
    if (files.length) {
      const fileMetaCreateModel = await this.uploadFileByServiceType(
        files[0],
        process.env.BLOB_UPLOAD_IMAGE_FOLDER,
        fileMetaUpdateModel.tags
      );
      fileMetaUpdateModel = Object.assign(
        {},
        fileMetaUpdateModel,
        fileMetaCreateModel
      );
    }
    return this.fileMetaService.update(_id, fileMetaUpdateModel);
  }

  /**
   *
   * @param uploadFiles need upload files array
   */
  public async mapUploadFiles(
    uploadFiles: Array<any>,
    folder = process.env.BLOB_UPLOAD_IMAGE_FOLDER
  ): Promise<any> {
    // upload all files
    const fileMetaIds: string[] = await Promise.all(
      uploadFiles.map(async (file): Promise<string> => {
        const fileMeta = await this.uploadFile(file, folder);
        return String(fileMeta._id);
      })
    );

    return fileMetaIds;
  }
}
