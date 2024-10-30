import { Snackbar } from '@mui/material';

export const SnackBarSuccess = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      message={message}
      autoHideDuration={2000} // Duración en milisegundos
      ContentProps={{
        style: {
          backgroundColor: '#4caf50', 
          color: '#fff', 
        },
      }}
    />
  );
};
