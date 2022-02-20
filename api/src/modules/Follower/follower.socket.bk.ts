import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer
} from '@nestjs/websockets';

import {AuthService} from '../Auth/auth.service';
import {FollowerService} from './follower.service';

// models
import BaseSocket from '../../core/socket/base.socket';
import SocketBucket from '../../core/socket/SocketBucket';

const webSocketGatewayParams = [];
if (
  process.env.SOCKET_PORT &&
  process.env.SOCKET_PORT !== process.env.APP_PORT
) {
  webSocketGatewayParams.push(parseInt(process.env.SOCKET_PORT, 10));
}
webSocketGatewayParams.push({namespace: 'follower'});

@WebSocketGateway(...webSocketGatewayParams)
export class FollowerSocket extends BaseSocket {
  namespace = '/follower';
  socketBucket: SocketBucket;
  constructor(
    private readonly followerService: FollowerService,
    readonly authService: AuthService
  ) {
    super(authService);
  }
  @WebSocketServer()
  server;

  @SubscribeMessage('followerCountUpdate')
  async followerCountUpdate(client, userId) {
    const data = await this.followerService.getFollowCount(userId.toString());
    if (this.socketBucket.users[userId]) {
      this.socketBucket.users[userId].sockets.forEach(socket => {
        socket.emit(`${this.namespace}:followerCountUpdate`, data);
      });
    }
  }
}
