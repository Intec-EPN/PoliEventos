import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const AlertCorrecto = ({openT}) => {
  const [open, setOpen] = useState(openT);

  return (
    <>
      {open && (
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          ¡Edición exitosa!
        </Alert>
      )}
    </>
  );
};
