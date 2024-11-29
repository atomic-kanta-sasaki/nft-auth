import { useState } from 'react';

export type SnackbarState = {
  isOpen: boolean;
  message: string;
};

export type SnackbarActions = {
  handleClose: () => void;
  handleSnackbar: (message: string) => void;
};

export const useSnackbar = (): [SnackbarState, SnackbarActions] => {
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbar = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return [
    { isOpen, message },
    { handleClose, handleSnackbar }
  ];
};
