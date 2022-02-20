import {createHash} from 'crypto';

export const getMD5Hash = (text: string) => {
  const md5 = createHash('md5');

  md5.update(text);

  return md5.digest('hex');
};
