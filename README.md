# Notification System

This project is a simple Firebase and React SPA for managing notifications. It includes a notification system that allows users to trigger different notifications using buttons, view them as toast messages, and mark them as read automatically.

## Features

- Trigger notifications using three different buttons.
- Notifications are displayed as toast messages using `react-toastify`.
- Notifications are marked as "read" automatically when viewed.

## Prerequisites

- Node.js (v14 or later)
- Firebase account with a Firestore database setup

## Setup and Installation

1 **Clone the Repository**

```bash
git clone https://github.com/your-username/notification-system.git
cd notification-system
```

2 **Install Dependencies**
Use pnpm to install project dependencies:

```bash
pnpm install
```

3 **Setup Firebase**

- Create a Firebase project in the Firebase Console.
- Set up Firestore in your Firebase project.
- Obtain your Firebase configuration and add it to .env file in the root directory of the project:

```bash
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

4 **Start Firebase Emulators**
Ensure you have Firebase CLI installed and configured. Run the following command to start Firestore emulators:

```bash
firebase deploy --only firestore:rules
firebase emulators:start --only firestore
```

5 **Start the Development Server**

```bash
pnpm dev
```
