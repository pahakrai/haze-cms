import mongoose from 'mongoose';

const {SchemaTypes} = mongoose;

export const CollectionName = 'FileMetas';
export const Schema = new mongoose.Schema(
  {
    folder: {type: String},
    mimetype: {type: String},
    // aws_s3
    serviceType: {type: String},
    tags: [{type: String}],
    uri: {type: String},
    thumbnailUri: {type: String},
    originalName: {type: String},
    fileExtension: {type: String},
    displayName: {type: String},
    uploadedName: {type: String},
    size: {type: Number, default: 0},
    // systemfile cant be delete
    isSystemFile: {type: Boolean, required: true, default: false},
    // workspace
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
