import { db } from '../config/firebaseConfig';
import { INotification, NotificationData } from '../types/notification.types';
import { collection, addDoc, getDocs, updateDoc, doc, DocumentData, DocumentReference, FirestoreError } from 'firebase/firestore';

/**
 * Custom error class for notification service errors.
 */
export class NotificationServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotificationServiceError';
  }
}

const notificationCollection = collection(db, 'notifications');

/**
 * Handles Firestore errors and throws a custom NotificationServiceError.
 * @param error - The error object.
 * @param message - The error message.
 * @throws {NotificationServiceError}
 */
const handleFirestoreError = (error: unknown, message: string): void => {
  if (error instanceof FirestoreError) {
    throw new NotificationServiceError(`${message}: ${error.message}`);
  } else {
    throw new NotificationServiceError(`${message}: ${error}`);
  }
};

/**
 * Adds a new notification to the Firestore database.
 *
 * @param message - The message of the notification.
 * @throws {NotificationServiceError} If an error occurs while adding the notification.
 */
export const addNotification = async (message: string): Promise<void> => {
  try {
    await addDoc(notificationCollection, { message, read: false });
  } catch (error) {
    handleFirestoreError(error, 'Error adding notification');
  }
};

/**
 * Fetches all notifications from the Firestore database.
 *
 * @returns A Promise that resolves to an array of notifications.
 * @throws {NotificationServiceError} If an error occurs while fetching notifications.
 */
export const getNotifications = async (): Promise<NotificationData[]> => {
  try {
    const { docs } = await getDocs(notificationCollection);
    return docs.map(({ id, data }) => ({ id, ...data() }) as INotification);
  } catch (error) {
    handleFirestoreError(error, 'Error fetching notifications');
    return Promise.reject(error);
  }
};

/**
 * Marks a notification as read in the Firestore database.
 *
 * @param id - The ID of the notification to mark as read.
 * @throws {NotificationServiceError} If an error occurs while marking the notification as read.
 */
export const markAsRead = async (id: string): Promise<void> => {
  try {
    const notificationDoc: DocumentReference<DocumentData> = doc(db, 'notifications', id);
    await updateDoc(notificationDoc, { read: true });
  } catch (error) {
    handleFirestoreError(error, 'Error marking notification as read');
  }
};
