import { FC } from 'react';
import { ToastOptions, toast } from 'react-toastify';

interface INotificationProps {
  type?: 'success' | 'error' | 'warning';
  message: string;
  options?: ToastOptions;
}

export const Alert: FC<INotificationProps> = ({
  type = 'success',
  message,
  options,
}) => toast[type](message, options);
