import {Resolver, Args, Query, Subscription, Mutation} from '@nestjs/graphql';
import {Types} from 'mongoose';
import {withFilter} from 'apollo-server';
import {forwardRef, Inject, UseFilters} from '@nestjs/common';
import {
  GraphQLExceptionFilter,
  BypassSecretGuard,
  pubSub,
  RequireLogin
} from 'src/core';

// services
// import {FileMetaSearchModel} from './models';
import {FilemetaService} from './filemeta.service';

const {ObjectId} = Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

// guards
@Resolver('FileMeta')
@UseFilters(GraphQLExceptionFilter)
export class FileMetaResolver {
  constructor(
    @Inject(forwardRef(() => FilemetaService))
    private readonly fileMetaService: FilemetaService
  ) {}

  @Query()
  async fileMetas(@Args('query') query) {
    return this.fileMetaService.find(query);
  }

  @Query()
  async fileMeta(@Args('id') id: string) {
    return this.fileMetaService.findById(id);
  }

  @Mutation()
  @RequireLogin()
  async updateFileMeta(
    @Args('id') id: string,
    @Args('fileMeta') fileMeta: any
  ) {
    return this.fileMetaService.update(id, fileMeta);
  }

  // subscriptions
  @BypassSecretGuard()
  @Subscription('fileMetaUpdated')
  fileMetaUpdated() {
    return {
      subscribe: withFilter(
        () => pubSub.asyncIterator('fileMetaUpdated'),
        (rootValue?: any, args?: any, context?: any, info?: any) => {
          if (!rootValue) return false;
          const {fileMetaUpdated} = rootValue;
          const {id} = args;
          const currentFileMetaId = fileMetaUpdated._id.toString();
          return currentFileMetaId === id;
        }
      )
    };
  }
}
