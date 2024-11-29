import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React from 'react';
import { SnackbarState, SnackbarActions } from '../hooks/useSnackbar';

type Props = {
  isOpen: SnackbarState['isOpen'];
  message: SnackbarState['message'];
  handleClose: SnackbarActions['handleClose'];
}

export const SuccessSnackbar: React.FC<Props> = ({ isOpen, message, handleClose }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};