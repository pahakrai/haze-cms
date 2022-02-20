import {Socket} from 'socket.io';

export default class SocketBucket {
  users: {
    [userId: string]: {
      sockets: Array<Socket>;
    };
  };
  anon: {
    sockets: Array<Socket>;
  };

  constructor(users = {}, anon = {sockets: []}) {
    this.users = users;
    this.anon = anon;
  }

  getUserSockets = (userId = ''): Array<Socket> => {
    if (!this.users[userId.toString()]) {
      return [];
    }
    return this.users[userId.toString()].sockets;
  };

  addSocket = (socket: Socket, userId = ''): void => {
    if (!userId.toString()) {
      this.anon.sockets.push(socket);
    } else {
      if (!this.users[userId.toString()]) {
        this.users[userId.toString()] = this._socketUserFactory(socket);
      } else {
        this.users[userId.toString()].sockets.push(socket);
      }
    }
  };

  removeSocket = (socket: Socket, userId = ''): void => {
    // if userId exists, remove socket from users list
    if (userId && this.users[userId]) {
      this.users[userId].sockets = this.users[userId].sockets.filter(
        soc => soc.id !== socket.id
      );
    }
    // just incase, we'll attempt to remove socket
    // from this.anon regardless if userId exists
    this.anon.sockets = this.anon.sockets.filter(soc => soc.id !== socket.id);
  };

  private _socketUserFactory = (socket: Socket): {sockets: Array<Socket>} => {
    return {
      sockets: [socket]
    };
  };
}
