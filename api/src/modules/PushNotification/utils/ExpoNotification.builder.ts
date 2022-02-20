export class ExpoNotificationBuilder {
  private title;
  private body;
  private data;
  private tokenAndUserIds;
  setTitle(title) {
    this.title = title;
    return this;
  }
  setBody(body) {
    this.body = body;
    return this;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  setTokenAndUserIds(tokenAndUserIds) {
    this.tokenAndUserIds = tokenAndUserIds;
    return this;
  }
  build() {
    // TODO: if no token throw exception
    return this.tokenAndUserIds.map(tokenAndUserId => {
      let title = null;
      let body = null;
      if (this.title) {
        title =
          this.title[tokenAndUserId.language] ||
          this.title[process.env.LANGUAGE_DEFAULT];
      }
      if (this.body) {
        body =
          this.body[tokenAndUserId.language] ||
          this.body[process.env.LANGUAGE_DEFAULT];
      }
      const notification = {
        to: tokenAndUserId.token,
        scope: tokenAndUserId.scope,
        sound: 'default',
        title,
        body,
        data: this.data,
        userId: tokenAndUserId.userId,
        deviceId: tokenAndUserId.deviceId
      };
      if (notification.data && notification.data.title) {
        notification.data.title =
          notification.data.title[
            tokenAndUserId.language || process.env.LANGUAGE_DEFAULT
          ] || notification.data.title;
      }
      if (notification.data && notification.data.body) {
        notification.data.body =
          notification.data.body[
            tokenAndUserId.language || process.env.LANGUAGE_DEFAULT
          ] || notification.data.body;
      }
      if (!notification.title) {
        delete notification.title;
      }
      if (!notification.body) {
        delete notification.body;
      }
      return notification;
    });
  }
}
