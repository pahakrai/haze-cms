import yargs from 'yargs';
import * as glob from 'glob';
import * as path from 'path';
import mongoose from 'mongoose';

import {MongodbHelper} from 'src/core/utils';

interface Seed {
  model: string;
  documents: any[];
}

const argv = yargs
  .option('env', {
    alias: 'e',
    string: true,
    default: 'development',
    description: 'Environment (default is development)'
  })
  .option('clear', {
    alias: 'c',
    boolean: true,
    default: false,
    description: 'Clear all data in target collection(s)'
  })
  .option('module', {
    alias: 'm',
    string: true,
    description: 'Specific module to be seeded'
  })
  .option('workspace', {
    alias: 'w',
    string: true,
    description: 'Only data that with given workspace will be seeded'
  })
  .option('upsert', {
    alias: 'u',
    boolean: true,
    default: false,
    description: 'Whether upsert/insert documents'
  })
  .alias('help', 'h').argv;

// inject env variable
require('dotenv').config({
  path: `./configs/env/.env-${argv?.env ?? 'development'}`
});

if (process.env.SEED_ENABLE !== 'true') {
  console.error('Seeding is not enabled');
  process.exit();
}

// setup mongoose connection
const connectionString = MongodbHelper.getConnectionString({
  hosts: [
    process.env.MONGODB_HOST0,
    process.env.MONGODB_HOST1,
    process.env.MONGODB_HOST2
  ],
  port: parseInt(process.env.MONGODB_PORT, 10),
  dbName: process.env.MONGODB_DBNAME,
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  isSRV: process.env.MONGODB_HOST_SRV === 'true',
  isSSL: process.env.MONGODB_OPTION_SSL === 'true'
});
mongoose.connect(connectionString, {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useFindAndModify: false,
  // useUnifiedTopology: true
});

/**
 * insert/upsert seed data into database
 *
 * @param Model mongoose model
 * @param seed seed data
 */
async function insertSeedData(Model: mongoose.Model<any>, seed: Seed) {
  // check if model already exists in db
  const isCollectionCreated = await Model.exists({});

  // if collection does not exist, create collection now
  if (!isCollectionCreated) {
    // ensure collection exists in db
    await Model.createCollection();
  }

  if (seed && seed.documents.length) {
    if (argv.workspace) {
      if (Model.schema.paths.workspace) {
        // the schema contains workspace, do workspace filtering
        seed.documents = seed.documents.filter(
          doc => !doc.workspace || doc.workspace === argv.workspace
        );
      } else if (Model.schema.paths.workspaces) {
        // handle multi-workspace model (e.g. Users)
        seed.documents = seed.documents.filter(
          doc =>
            !doc.workspaces ||
            (doc.workspaces as string[])?.includes(argv.workspace)
        );
      }
    }

    if (argv.upsert) {
      return Promise.all(
        seed.documents.map(doc =>
          Model.updateOne({_id: doc._id}, doc, {
            upsert: true,
            runValidators: true
          }).exec()
        )
      );
    }

    // insert seed data into database
    return Model.insertMany(seed.documents, {ordered: true});
  }
}

/**
 * execute seeder
 * wrap it in function in order to use async/await
 */
async function execSeeder() {
  // seed data list
  const seedDatas: Seed[] = [];
  // seed for specific module(s)
  const targetModules: string[] = argv.module?.split(',') ?? [];

  // Load all modules with glob
  const schemaPaths = glob.sync('./src/modules/**/*.schema{,s}.ts');
  for (const schemaPath of schemaPaths) {
    // import schema file
    const {Schema, CollectionName} = require(path.resolve(schemaPath));

    // inject model into mongoose
    mongoose.model(CollectionName, Schema);
  }

  // clear collection(s)
  let clearDbPromise: Promise<any>[] = [];
  if (targetModules.length && argv['clear']) {
    clearDbPromise = targetModules.map(moduleName =>
      mongoose.model(moduleName).deleteMany({}).exec()
    );
  } else if (argv['clear']) {
    clearDbPromise = Object.entries(mongoose.models).map(([, Model]) =>
      Model.deleteMany({}).exec()
    );
  }

  await Promise.all(clearDbPromise);

  // load seed data from js/json
  const seedPaths = glob.sync(
    `./src/modules/**/{*.,*}seed{.${argv.env},}.{js,json}`
  );
  for (const seedPath of seedPaths) {
    seedDatas.push(require(path.resolve(seedPath)));
  }

  // insert data
  let seedPromise: Promise<any>[] = [];
  if (targetModules.length) {
    // seed for specific module(s)
    seedPromise = targetModules.map(async moduleName => {
      // get model from mongoose
      const Model = mongoose.model(moduleName);
      // get seed data
      const seed = seedDatas.find(s => s.model === moduleName);

      return insertSeedData(Model, seed);
    });
  } else {
    // seed all modules
    seedPromise = Object.entries(mongoose.models).map(async ([name, Model]) => {
      // get seed data
      const seed = seedDatas.find(s => s.model === name);

      return insertSeedData(Model, seed);
    });
  }
  return Promise.all(seedPromise);
}

try {
  // execute seeder
  execSeeder().then(() => {
    process.exit();
  });
} catch (e) {
  console.error(e);
  process.exit(100);
}
