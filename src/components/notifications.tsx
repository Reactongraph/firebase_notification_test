import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { INotification } from '../types/notification.types';
import NotificationDropdown from './notificationDropdown';
import { addNotification, getNotifications, markAsRead } from '../services/notificationService';

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
      setNotifications((prevNotifications) => prevNotifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
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
      onOpen: () => {
        const unreadNotification = notifications.find((n) => n.message === message && !n.read);
        if (unreadNotification) {
          handleMarkAsRead(unreadNotification.id);
        }
      },
      onClose: () => {
        const unreadNotification = notifications.find((n) => n.message === message && !n.read);
        if (unreadNotification) {
          handleMarkAsRead(unreadNotification.id);
        }
      }
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
      <Box mt={2} display={'flex'} gap={1}>
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
