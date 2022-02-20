import * as fs from 'fs';
import {extname} from 'path';

export const processUpload = async (file): Promise<Express.Multer.File> => {
  const {createReadStream, filename: originalname, mimetype} = await file;
  // create file stream and store to local storage
  const stream = createReadStream();
  // generate random file name
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  let extendName = extname(originalname).toLowerCase();
  if (!extendName) {
    extendName =
      mimetype && mimetype.split && mimetype.split('/')[1]
        ? '.' + mimetype.split('/')[1]
        : '.jpeg';
  }
  const filename = `${randomName}${extendName.toLowerCase()}`;
  const path = `./uploads/${filename}`;

  // save file to upload/ first
  const result: any = await new Promise((resolve, reject) => {
    stream
      .on('error', error => {
        if (stream.truncated) {
          // Delete the truncated file.
          fs.unlinkSync(path);
        }
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => {
        // prepare file object similar to Multer.File
        const {size} = fs.statSync(path);
        const file = {
          path,
          size,
          mimetype,
          filename,
          originalname
        };
        resolve(file);
      });
  });

  return result;
};

/**
 * save multiple files into uploads/
 * @param files GraphQL file stream
 */
export const processMultiUpload = async (
  files: any[]
): Promise<Express.Multer.File[]> => {
  return files?.length > 0 ? Promise.all(files.map(processUpload)) : [];
};
