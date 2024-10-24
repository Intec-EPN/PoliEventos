import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AlertCorrecto = ({openT}) => {
  const [open, setOpen] = useState(openT);

  const navigate = useNavigate();

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
                navigate(-1);
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
