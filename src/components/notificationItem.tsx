import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { INotificationItemProps } from '../types/notification.types';

/**
 * A React component that displays a single notification item.
 *
 * @param {NotificationItemProps} props - The props for the component.
 * @returns {JSX.Element} The rendered NotificationItem component.
 */
const NotificationItem: React.FC<INotificationItemProps> = ({ notification, onMarkAsRead, ...listItemProps }) => {
  /**
   * Handles the click event on the notification item.
   * If the notification is unread, it marks it as read.
   */
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <ListItem
      onClick={handleClick}
      style={{
        backgroundColor: notification.read ? 'transparent' : '#e0e0e0'
      }}
      {...listItemProps}
    >
      <ListItemText primary={notification.message} />
    </ListItem>
  );
};

export default NotificationItem;
