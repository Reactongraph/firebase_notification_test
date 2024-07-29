import React, { useState } from 'react';
import NotificationItem from './notificationItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Popover, List, Box, Typography } from '@mui/material';
import { INotification, INotificationDropdownProps } from '../types/notification.types';

/**
 * Renders a list item for each notification.
 * @param notification - The notification object to render.
 * @param onMarkAsRead - The function to mark a notification as read.
 * @returns A NotificationItem component.
 */
const renderNotificationItem = (notification: INotification, onMarkAsRead: (id: string) => void) => (
  <NotificationItem key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} />
);

/**
 * Component that displays a dropdown with a list of notifications.
 */
const NotificationDropdown: React.FC<INotificationDropdownProps> = ({ notifications, onMarkAsRead }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  /**
   * Handles the click event on the notification icon button.
   * @param event - The click event object.
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles the close event of the popover.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'notification-dropdown' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick} aria-describedby={popoverId}>
        <NotificationsIcon />
      </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box maxHeight={300} overflow="auto">
          {notifications.length === 0 ? (
            <Typography variant="body2" align="center" p={2}>
              No notification found
            </Typography>
          ) : (
            <List>{notifications.map((notification) => renderNotificationItem(notification, onMarkAsRead))}</List>
          )}
        </Box>
      </Popover>
    </div>
  );
};

export default NotificationDropdown;
