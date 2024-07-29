import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import NotificationDropdown from './notificationDropdown';
import { INotification } from '../types/notification.types';
import { addNotification, getNotifications, markAsRead } from '../services/notificationService';

/**
 * Finds an unread notification with the given message and marks it as read.
 * @param notifications - The array of notifications.
 * @param message - The message of the notification to mark as read.
 * @param handleMarkAsRead - The function to mark a notification as read.
 */
const markUnreadNotificationAsRead = (notifications: INotification[], message: string, handleMarkAsRead: (id: string) => void) => {
  const unreadNotification = notifications.find((notification) => notification.message === message && !notification.read);
  if (unreadNotification) {
    handleMarkAsRead(unreadNotification.id);
  }
};

/**
 * Component that handles displaying and managing notifications.
 */
const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches notifications on component mount.
   */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await getNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  /**
   * Marks a notification as read and updates the state.
   * @param id - The ID of the notification to mark as read.
   */
  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setError('Failed to mark notification as read');
    }
  };

  /**
   * Adds a new notification and refreshes the notifications list.
   * @param message - The message for the new notification.
   */
  const handleAddNotification = async (message: string) => {
    try {
      await addNotification(message);
      const newNotifications = await getNotifications();
      setNotifications(newNotifications);
    } catch (error) {
      console.error('Error adding notification:', error);
      setError('Failed to add notification');
    }
  };

  /**
   * Handles the click event for adding a new notification.
   * @param message - The message for the new notification.
   */
  const handleButtonClick = (message: string) => {
    const toastOptions: ToastOptions = {
      onOpen: () => markUnreadNotificationAsRead(notifications, message, handleMarkAsRead),
      onClose: () => markUnreadNotificationAsRead(notifications, message, handleMarkAsRead)
    };

    toast.info(message, toastOptions);
    handleAddNotification(message);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <NotificationDropdown notifications={notifications} onMarkAsRead={handleMarkAsRead} />
      )}
      <Box mt={2} display="flex" gap={1}>
        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleButtonClick('Notification Type 1')}>
          Add Notification Type 1
        </Button>
        <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleButtonClick('Notification Type 2')}>
          Add Notification Type 2
        </Button>
        <Button variant="outlined" onClick={() => handleButtonClick('Notification Type 3')}>
          Add Notification Type 3
        </Button>
      </Box>
    </div>
  );
};

export default Notifications;
