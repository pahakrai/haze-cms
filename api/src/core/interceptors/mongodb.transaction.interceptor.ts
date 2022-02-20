import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import {Observable, from} from 'rxjs';
import {catchError, mapTo, switchMap, tap} from 'rxjs/operators';
// import {Request} from 'express';
import mongoose from 'mongoose';
import {ClientSession} from 'mongodb';
import {GqlExecutionContext} from '@nestjs/graphql';

/**
 * This interceptor is to implement MongoDB Transaction
 * It will inject a mongoose session to Request object,
 *  so you can use the session inside service
 * After request executed successfully, transaction will be committed.
 * If request failed, transaction will be aborted (handled by exception filter)
 *
 * Interceptor can bind extra logic before / after method execution
 * more details: https://docs.nestjs.com/interceptors
 *
 * more details of MongoDB Transaction:
 * https://mongoosejs.com/docs/transactions.html
 * https://github.com/nestjs/nest/issues/2086#issuecomment-504658384
 */
@Injectable()
export class MongoDBTransactionInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    let request;
    let session: ClientSession;

    // check whether coming request is REST/GraphQL
    // For GraphQL request, context.args[0] is undefined
    // for REST request, context.args[0] is the request object
    if (context.getArgByIndex(0)) {
      // REST request
      request = context.switchToHttp().getRequest();
    } else {
      // gql request
      request = GqlExecutionContext.create(context).getContext().req;
    }

    // create transaction session if not a GET request
    if (
      request.method.toLowerCase() !== 'get' &&
      process.env.MONGODB_USE_TRANSACTION === 'true'
    ) {
      // start a new session
      const connection = mongoose.connections[mongoose.connections.length - 1];
      session = await connection.startSession();
      // start transaction
      session.startTransaction();

      // inject it to request object
      request.mongoSession = session;
    }

    /**
     * A chain of RxJS Observables is used to `pipe` the
     * operations together. In the end, we either commit
     * or abort the transactions, followed by a final statement
     * to end the transaction.
     */
    return next.handle().pipe(
      switchMap(data =>
        from(
          session?.inTransaction()
            ? session.commitTransaction()
            : Promise.resolve()
        ).pipe(mapTo(data))
      ),
      tap(() => {
        return session?.inTransaction() && session.endSession();
      }),
      catchError(async err => {
        if (session?.inTransaction()) {
          await session.abortTransaction();
          session.endSession();
        }

        throw err;
      })
    );
  }
}
