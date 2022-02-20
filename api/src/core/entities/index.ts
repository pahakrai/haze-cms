export class ValidationExceptionEntity {
  constructor(code, payload) {
    this.code = code;
    this.payload = payload;
  }
  code?: string;
  payload?: any;
  fieldName: string;
  value?: string;
}
