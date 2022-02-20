import {ClientSession} from 'mongoose';

export interface MongooseOption {
  sort?: any;
  select?: any;
  lean?: boolean;
  limit?: number;
  populates?: string[] | any[];
  session?: ClientSession;
}

// ref: https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
export interface MongooseInsertManyOption {
  ordered?: boolean;
  rawResult?: boolean;
}

// ref: https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
export interface MongooseUpdateOption {
  omitUndefined?: boolean;
}
