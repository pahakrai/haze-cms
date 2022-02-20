import {verify} from 'jsonwebtoken';
import {Connection} from 'mongoose';
import GraphQLJSON from 'graphql-type-json';
import {GqlModuleOptions} from '@nestjs/graphql';

import {Locale} from 'src/core';
import {ConstraintDirective, ErrorTrackingExtension} from 'src/core/graphql';
import {UserVehicleModel} from 'src/modules/UserVehicle/interfaces';

export const GraphQLModuleFactory = async (
  connection: Connection
): Promise<GqlModuleOptions> => {
  return {
    cors: true,
    typePaths: [`${__dirname}/../../**/*.gql`],
    context: ({req, connection}: any) => {
      if (connection) return connection.context;
      return {req};
    },
    subscriptions: {
      onConnect: async (
        connectionParams: any,
        websocket: any,
        context: any
      ) => {
        const parseToken = (token: string) => {
          return token.replace(/bearer\s/i, '');
        };
        const token = Object.keys(connectionParams).includes('Authorization')
          ? connectionParams.Authorization
          : undefined;
        const tokenDecoded = token
          ? (verify(parseToken(token), process.env.JWT_SECRET) as {
              sub: string;
            })
          : {sub: null};

        // find user's vehicle
        const UserVehicleRepository = connection.models
          .UserVehicles as UserVehicleModel;
        const userVehicle = await UserVehicleRepository.findOne({
          user: tokenDecoded.sub,
          isDefault: true
        })
          .populate('vehicle')
          .lean()
          .exec();

        const localeSettings = {
          default:
            connectionParams['Accept-Language'] || process.env.LANGUAGE_DEFAULT,
          sources: [`${process.cwd()}/locales`],
          accept: {
            'zh-hk': ['tw', 'hant'],
            'zh-cn': ['sg', 'hans'],
            en: []
          }
        };
        const locale = new Locale(localeSettings);
        return {
          vehicle: userVehicle?.vehicle,
          user: tokenDecoded.sub,
          req: {
            ...context.request,
            locale
          }
        };
      },
      onDisconnect: () => {}
    },
    installSubscriptionHandlers: true,
    debug: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
    extensions: [() => new ErrorTrackingExtension()],
    schemaDirectives: {
      constraint: ConstraintDirective
    },
    resolvers: {
      JSON: GraphQLJSON
    }
  };
};
