'use strict';
import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileSystemService {
  constructor() {}
  /**
   * delete file from s3
   * @param filename
   * @param iam
   * @param folderName
   */
  public async delete(filePath) {
    const root = process.cwd();

    return fs.unlinkSync(`${root}/uploads/${filePath}`);
  }

  /**
   * upload file to s3
   * @param file
   * @param folder
   * @param headers
   */
  public async upload(file, folder, headers) {
    let fileName = file.originalname.split('.')[0];
    fileName = fileName.split(' ').join('_');
    const filePath = `${folder}/${fileName}-${file.filename}`;
    // const filePath = `${fileName}-${file.filename}`;
    headers[
      'Content-Disposition'
    ] = `attachment; filename="${file.originalname}"`;

    const fileUrl = await this.putFile(file.path, filePath, headers);

    return fileUrl;
  }

  /**
   * put File
   * @param localPath file local path
   * @param filePath  file server path
   * @param headers request header to s3
   */
  public async putFile(localPath: string, filePath: string, headers: object) {
    const finalFilePath = `uploads/${filePath}`;
    const dir = path.dirname(finalFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
    fs.renameSync(localPath, finalFilePath);
    return `${process.env.HOST_API}${
      process.env.HOST_API_USE_PORT === 'true' ? ':' + process.env.APP_PORT : ''
    }/file?path=${filePath}`;
  }
}
