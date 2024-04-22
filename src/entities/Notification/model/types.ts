export interface INotificationCreate {
    type: 'deposit' | 'withdraw' | 'exchange';
    summ: number;
    currency: string;
    date: Date;
    userId: string;
}
