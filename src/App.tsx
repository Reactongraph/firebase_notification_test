import React from 'react';
import { Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Notifications from './components/notifications';

import 'react-toastify/dist/ReactToastify.css';

/**
 * The main application component.
 *
 * @returns The rendered React component.
 */
const App: React.FC = () => {
  return (
    <Container>
      <h1>Notification System</h1>
      <ToastContainer />
      <Notifications />
    </Container>
  );
};

export default App;
