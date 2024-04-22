import { ICoin } from "entities/Coin/model/types/coin";
import { INotificationCreate } from "entities/Notification/model/types";

export class NotificationFactory {
  static createNotification(currentCoin: ICoin, userId: string, summ: number, type: 'deposit' | 'withdraw' | 'exchange' = 'exchange') {
    const notification: INotificationCreate = {
      userId,
      date: new Date(),
      type,
      currency: currentCoin.name,
      summ,
    };

    return notification;
  }
}
