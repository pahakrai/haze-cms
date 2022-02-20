declare namespace Express {
  export interface Request {
    mongoSession: import('mongoose').ClientSession;
    locale: any;
    workspace: any;
  }
}
