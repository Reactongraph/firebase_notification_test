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
git clone https://github.com/Reactongraph/firebase_notification_test.git
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

6 **Linting and Formatting**
This project uses ESLint and Prettier for code linting and formatting. You can run the following scripts to check for linting and formatting issues, or to automatically fix them:

```bash
# Check for linting issues
pnpm run lint:check

# Fix linting issues
pnpm run lint:fix

# Check for formatting issues
pnpm run prettier:check

# Fix formatting issues
pnpm run prettier:fix
```

7 **Building for Production**
To build the project for production, run:

```bash
pnpm run build
```

This will generate a production-ready build in the dist directory.

8 **Preview the Production Build**
You can preview the production build by running:

```bash
pnpm run preview
```

This will start a local server and serve the production build.
