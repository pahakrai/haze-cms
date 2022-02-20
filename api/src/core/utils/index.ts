export * as RatingHelper from './rating.helper';
export * as RandomHelper from './random.helper';
export {default as MongodbHelper} from './mongodb.helper';
export {default as ResponseHelper} from './response.helper';
export * from './eeo.helper';
export * from './patterns';
export * from './md5';
export * from './chunk';
export * from './host.helper';
export * from './IsNotBlank';
export * from './date.helper';
export * from './facebook.helper';
export {
  FileFilter,
  DiskStorage,
  default as FilesInterceptor
} from './fileInterceptor.helper';

export function ageCalculator(dob: string | Date) {
  const dobDate = new Date(dob);
  const diff_ms = Date.now() - dobDate.getTime();
  const age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
