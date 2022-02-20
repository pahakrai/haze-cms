import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'WorkspaceApps';

const VersionInfoSchema = new MongooseSchema(
  {
    appId: {type: SchemaTypes.String},
    appIconLink: {type: SchemaTypes.String},
    touchIcon: {type: SchemaTypes.String},
    latestVersionNo: {type: SchemaTypes.String, default: '0.0.0'},
    latestVersionDescription: {type: SchemaTypes.String},
    nextVersionNo: {type: SchemaTypes.String},
    nextVersionDescription: {type: SchemaTypes.String},
    releaseDate: {type: SchemaTypes.Date},
    history: {
      type: [
        {
          version: {type: SchemaTypes.String},
          releaseDate: {type: SchemaTypes.String},
          description: {type: SchemaTypes.String}
        }
      ],
      _id: false
    }
  },
  {_id: false}
);

export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    name: {type: SchemaTypes.String, required: true, unique: true},
    productionIOS: {type: VersionInfoSchema},
    productionAndroid: {type: VersionInfoSchema}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
