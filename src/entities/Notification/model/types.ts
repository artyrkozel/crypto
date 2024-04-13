export interface INotificationCreate {
    type: 'withdraw' | 'deposit';
    summ: number;
    currency: string;
    date: Date;
    userId: string;
}
