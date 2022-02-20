import Expo from 'expo-server-sdk';
import {Injectable} from '@nestjs/common';

@Injectable()
export class ExpoNotificationService {
  private expo;
  constructor() {
    this.expo = new Expo();
  }
  // ** SINGULAR HAS BEEN REMOVED **
  // async sendNotification(notification) {
  //   const {expo} = this;
  //   // validate token
  //   if (!Expo.isExpoPushToken(notification.token)) {
  //     console.error(`Push token ${
  //       notification.token
  //     } is not a valid Expo push token`);
  //   }

  //   const result = await expo.sendPushNotificationAsync(notification);
  //   return result;
  // }

  async sendNotifications(notifications, retryCount = 0) {
    const {expo} = this;
    // group notifications by their scope
    // this is to prevent error when sending
    // push notification to different expo projects
    const scopeCategorizedNotifications = notifications.reduce(
      (scopedObj, notification) => {
        const scope = notification.scope || 'default';
        if (!scopedObj[scope]) {
          scopedObj[scope] = [];
        }
        scopedObj[scope].push(notification);
        return scopedObj;
      },
      {}
    );

    // with each scope, we retrieve all tickets created by the
    // push notifications
    return Object.values(scopeCategorizedNotifications).reduce<Promise<any[]>>(
      async (promisedTickets, scopedNotifications) => {
        // split notifications into chunks to send
        const chunks = expo.chunkPushNotifications(scopedNotifications);

        // go through each chunk
        return [
          // appending original tickets
          ...(await promisedTickets),
          // appending new chunk tickets
          ...(await chunks.reduce(async (promisedChunkTickets, chunk) => {
            // resolve previous awaits
            let chunkTickets = await promisedChunkTickets;
            // add chunk tickets to accumulated tickets
            chunkTickets = chunkTickets.concat(
              await this.sendNotificationChunk(chunk, retryCount)
            );
            // return tickets
            return chunkTickets;
          }, Promise.resolve([])))
        ];
      },
      Promise.resolve([])
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  async sendNotificationChunk(chunk, retryCount: number = 0) {
    try {
      const {expo} = this;
      // send the notification
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      // curate each ticket to add notification in there
      return ticketChunk.reduce((tickets, tc, tcIndex) => {
        // add to tickets
        tickets.push({
          ...tc,
          notification: chunk[tcIndex]
        });
        // return accumulated curated tickets
        return tickets;
      }, []);
    } catch (error) {
      // if retry count is zero, throw error
      if (retryCount === 0) {
        throw error;
      }
      // retry this ticket again
      retryCount--;
      return this.sendNotificationChunk(chunk, retryCount);
    }
  }

  async getPushNotificationReceipts(receiptIds, retryCount) {
    const {expo} = this;
    let receipts: any = {};
    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    try {
      for (const chunk of receiptIdChunks) {
        try {
          const receiptsChunks = await expo.getPushNotificationReceiptsAsync(
            chunk
          );
          receipts = Object.assign({}, receipts, receiptsChunks);
        } catch (error) {
          console.error(error);
        }
      }
      return receipts;
    } catch (error) {
      if (retryCount > 0) {
        retryCount--;
        return this.getPushNotificationReceipts(receiptIds, retryCount);
      } else {
        throw error;
      }
    }
  }
}
