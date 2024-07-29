import { ListItemProps } from '@mui/material';

/**
 * Interface representing a notification.
 */
export interface INotification {
  id: string;
  message: string;
  read: boolean;
}

/**
 * Props for the NotificationDropdown component.
 */
export interface INotificationDropdownProps {
  notifications: INotification[];
  onMarkAsRead: (id: string) => void;
}

/**
 * Props for the NotificationItem component.
 */
export interface INotificationItemProps extends ListItemProps {
  notification: INotification;
  onMarkAsRead: (id: string) => void;
}

export type NotificationData = INotification & { id: string };
