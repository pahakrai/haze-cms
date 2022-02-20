import mime from 'mime';
import axios from 'axios';
import {createWriteStream as fsCreateWriteStream} from 'fs';
class CommonHelper {
  public replaceObjectKeyNames(
    objOrArray: {[key: string]: any} | Array<{[key: string]: any}>,
    from: string,
    to: string
  ): {[key: string]: any} | Array<{[key: string]: any}> {
    // if it is array
    if (Array.isArray(objOrArray)) {
      // go through each of them and return processed field of each element
      return objOrArray.map(r => this.replaceObjectKeyNames(r, from, to));
    }

    // if not array, assuming it is object
    // go through each key in the object
    return Object.keys(objOrArray).reduce((accumulatedObj, validationKey) => {
      // define new key name based on replace `from` to `to`
      const newKey = validationKey.replace(from, to);
      // if value is an array or object, call self to handle inner replacements
      if (typeof objOrArray[validationKey] === 'object') {
        accumulatedObj[newKey] = this.replaceObjectKeyNames(
          objOrArray[validationKey],
          from,
          to
        );
      } else {
        // since not object or array, just assign to it
        accumulatedObj[newKey] = objOrArray[validationKey];
      }
      // return new accumulated object
      return accumulatedObj;
    }, {});
  }

  public getMonthDate(year: number, month: number): number {
    const monthDate = new Date(year, month, 0);
    return monthDate.getDate();
  }

  public async downloadFile(
    url: string,
    fileName: string = Date.now().toString()
  ): Promise<any> {
    const response = await axios.get(url, {
      responseType: 'stream'
    });
    const contentType = response.headers['content-type'];
    const size = response.headers['content-length'];
    const extName = mime.extension(contentType);
    const filePath = './uploads/' + fileName + '.' + extName;
    const stream = fsCreateWriteStream(filePath);

    response.data.pipe(stream);

    return new Promise((resolve, reject) => {
      stream.on('finish', () =>
        resolve({
          destination: './uploads/',
          encoding: '7bit',
          fieldname: 'files',
          filename: fileName + '.' + extName,
          mimetype: contentType,
          originalname: fileName + '.' + extName,
          path: filePath,
          size
        })
      );
      stream.on('error', reject);
    });
  }
}

export default new CommonHelper();
