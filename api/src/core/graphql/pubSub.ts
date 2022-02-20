import {EventEmitter} from 'events';
import Redis from 'ioredis';
import {PubSub, PubSubEngine} from 'graphql-subscriptions';
import {RedisPubSub} from 'graphql-redis-subscriptions';

// https://www.apollographql.com/docs/graphql-subscriptions/external-pubsub/
let _pubSub: PubSubEngine;

switch (process.env.GRAPHQL_PUBSUB_ENGINE) {
  case 'redis':
    const options: Redis.RedisOptions = {
      host: process.env.GRAPHQL_PUBSUB_ENGINE_URL,
      username: process.env.GRAPHQL_PUBSUB_AUTH_USERNAME || undefined,
      password: process.env.GRAPHQL_PUBSUB_AUTH_PASSWORD || undefined,
      retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
      }
    };

    _pubSub = new RedisPubSub({
      publisher: new Redis(options),
      subscriber: new Redis(options)
    });
    break;

  case 'memory':
  default:
    const eventEmitter = new EventEmitter();
    eventEmitter.setMaxListeners(
      parseInt(process.env.PUBSUB_MAX_LISTENER, 10) || 500
    );

    _pubSub = new PubSub({eventEmitter});
    break;
}

export const pubSub = _pubSub;
