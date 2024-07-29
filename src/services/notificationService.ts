import { db } from '../config/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  DocumentData,
  QuerySnapshot,
  DocumentReference,
  FirestoreError
} from 'firebase/firestore';
import { INotification, NotificationData } from '../types/notification.types';

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
 * Adds a new notification to the Firestore database.
 *
 * @param message - The message of the notification.
 * @throws {NotificationServiceError} If an error occurs while adding the notification.
 */
export const addNotification = async (message: string): Promise<void> => {
  try {
    await addDoc(notificationCollection, { message, read: false });
  } catch (error) {
    if (error instanceof FirestoreError) {
      throw new NotificationServiceError(`Error adding notification: ${error.message}`);
    } else {
      throw new NotificationServiceError(`Error adding notification: ${error}`);
    }
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
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(notificationCollection);
    return snapshot.docs.map(
      (doc): NotificationData =>
        ({
          id: doc.id,
          ...doc.data()
        }) as INotification
    );
  } catch (error) {
    if (error instanceof FirestoreError) {
      throw new NotificationServiceError(`Error fetching notifications: ${error.message}`);
    } else {
      throw new NotificationServiceError(`Error fetching notifications: ${error}`);
    }
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
    if (error instanceof FirestoreError) {
      throw new NotificationServiceError(`Error marking notification as read: ${error.message}`);
    } else {
      throw new NotificationServiceError(`Error marking notification as read: ${error}`);
    }
  }
};
