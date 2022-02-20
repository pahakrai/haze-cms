import {GraphQLExtension} from 'graphql-extensions';
import Polyglot from 'node-polyglot';

import {LocalStore} from '../locale/localStore';

import {ConstraintDirectiveErrorName} from './validation.directive';
import {HttpStatus} from '../constants';
// import {Locale} from '../locale';

const localeError = (error, req) => {
  const path = error?.path;
  const status = error?.originalError?.status;
  let errorMessage = error?.originalError?.response;

  const localStore = new LocalStore();
  const parser = localStore.getParser(req.locale.currentLanguage);
  const polyglot = new Polyglot({phrases: parser});

  try {
    if (
      error?.originalError?.originalError?.code === ConstraintDirectiveErrorName
    ) {
      const {args, fieldName} = error.originalError.originalError;
      if (args) {
        const {errorCode, errorKeys} = args;
        const payloadKeys = errorKeys
          ? errorKeys.split().map(key => {
              return polyglot.t(key);
            })
          : [];
        const message = errorCode
          ? polyglot.t(errorCode, payloadKeys)
          : errorMessage;
        return {
          extensions: {
            statusCode: HttpStatus.INVALIDATE,
            message,
            errors: [{[fieldName]: message}],
            path: req.url
          }
        };
      }
    } else {
      const {code, payload = {}, field} = errorMessage;

      if (code) {
        const payloadKeys = Object.keys(payload);
        if (payloadKeys.length) {
          payloadKeys.forEach((key, index) => {
            if (key === 'value') {
              payload.key = payload[payloadKeys[index]];
            } else payload[key] = polyglot.t(payload[payloadKeys[index]]);
          });
        }
        errorMessage = polyglot.t(code, payload);
      }

      const localedError: any = {
        extensions: {
          statusCode:
            (errorMessage ? errorMessage.statusCode : undefined) ||
            status ||
            500,
          message: errorMessage,
          path
        }
      };

      if (field) {
        localedError.errors = [
          {
            [field]: errorMessage
          }
        ];
      }
      return localedError;
    }
  } catch (e) {
    return {
      extensions: {
        statusCode: 500,
        message: error.message,
        path
      }
    };
  }
};

export class ErrorTrackingExtension extends GraphQLExtension {
  willSendResponse(o) {
    const {context, graphqlResponse} = o;
    if (graphqlResponse.errors && graphqlResponse.errors.length) {
      graphqlResponse.errors = [
        localeError(graphqlResponse.errors[0], context.req)
      ];
    }
    return o;
  }
}
