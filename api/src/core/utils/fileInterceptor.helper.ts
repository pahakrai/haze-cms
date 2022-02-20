'use strict';

import {extname} from 'path';
import {diskStorage} from 'multer';
import {
  FilesInterceptor as FilesIntercept,
  FileInterceptor as FileIntercept
} from '@nestjs/platform-express';

export const filename = (req, file, cb) => {
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  cb(null, `${randomName}${extname(file.originalname)}`);
};

export const DiskStorage = diskStorage({
  destination: './uploads/',
  filename
});

export const FileFilter = (req, file, cb) => fileTypes => {
  const acceptExtensions = fileTypes || [];
  if (!acceptExtensions.includes(extname(file.originalname))) {
    cb(new Error('invalid file'), false);
  }
  cb(null, true);
};

export const imageFileFilter = (req, file, cb) => {
  const acceptExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.gif'];
  if (!acceptExtensions.includes(extname(file.originalname))) {
    cb(new Error('invalid file'), false);
  }
  cb(null, true);
};

export const FileInterceptor = FileIntercept('file', {
  storage: DiskStorage
});

export default FilesIntercept('files', null, {
  storage: DiskStorage,
  fileFilter: imageFileFilter
});
