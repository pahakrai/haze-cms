import {
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsException,
  WebSocketServer
} from '@nestjs/websockets';
import {Socket} from 'socket.io';

// models
import SocketBucket from './SocketBucket';
import {AuthService} from 'src/modules/Auth/auth.service';

/*
  FIXME:
  - how to handle reconnect? currently, on user reconnect,
    user joins rooms again
*/
export default class BaseSocket
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  protected server;
  protected socketBucket: SocketBucket;
  protected namespace: string;
  protected logOptions: {
    show: boolean;
  };

  constructor(readonly authService: AuthService) {
    this.socketBucket = new SocketBucket();
    this.logOptions = {
      show: process.env.NODE_ENV === 'development'
    };
  }

  protected _afterInit = server => {
    server.use((socket, next) => {
      if (
        !this.isCurrentNamespace(socket) ||
        !socket.handshake.query ||
        !socket.handshake.query.token
      ) {
        return next();
      }
      this.log('user init connect');

      const token = socket.handshake.query.token;
      socket.instantiated = false;

      next(this.setUserByToken(socket, token));
    });
  };

  public getUserSockets = (userId: string): Array<Socket> => {
    return this.socketBucket.getUserSockets(userId.toString());
  };

  public isCurrentNamespace = socket => {
    return socket.nsp.name === this.namespace;
  };

  protected log = (...args) => {
    const {show} = this.logOptions;
    if (show) {
      console.info(`SOCK:: (${this.namespace}) `, ...args);
    }
  };

  public setUserByToken = (socket, token) => {
    if (this.isCurrentNamespace(socket)) {
      this.log('user logging in');
      const validateTokenPromise = this.authService.findUserByAccessToken(
        token
      );
      return validateTokenPromise
        .then(result => {
          if (result) {
            this.log('user logged in: ' + result.email);
            socket.instantiated = false;
            socket.user = result;
            socket.join(`USER:${result._id}`);
            this.socketBucket.addSocket(socket, result._id.toString());
            socket.emit('authenticated');
            this.handleConnection(socket);
            return true;
          } else {
            this.log('user login failed');
            this.socketBucket.addSocket(socket);
            socket.user = null;
            socket.emit('unauthorized');
            return new WsException('unAuthorized');
          }
        })
        .catch(result => {
          this.log('user login failed');
          socket.user = null;
          this.socketBucket.addSocket(socket);
          return new WsException(result.message);
        });
    }
  };

  @SubscribeMessage('authenticate')
  public async authenticateUser(client, {token}) {
    if (this.isCurrentNamespace(client)) {
      this.setUserByToken(client, token);
    }
    return Promise.resolve();
  }

  @SubscribeMessage('logout')
  public async logout(client) {
    if (this.isCurrentNamespace(client)) {
      this.handleLogout(client);
    }
    return Promise.resolve();
  }

  protected _handleConnection = socket => {
    socket.instantiated = true;
  };

  protected _handleLogout = socket => {
    Object.keys(socket.rooms).forEach(key => {
      if (key.includes(':')) {
        // leave room
        socket.leave(key);
      }
    });
  };

  protected _handleDisconnect = socket => {
    this.log(`user disconnected (${socket.user ? socket.user.email : 'ANON'})`);
    this.socketBucket.removeSocket(
      socket,
      socket.user ? socket.user._id : undefined
    );
  };

  public afterInit = server => {
    this._afterInit(server);
  };
  public handleConnection = socket => {
    this._handleConnection(socket);
  };
  public handleDisconnect = socket => {
    this._handleDisconnect(socket);
  };
  public handleLogout = socket => {
    this._handleLogout(socket);
  };
}
