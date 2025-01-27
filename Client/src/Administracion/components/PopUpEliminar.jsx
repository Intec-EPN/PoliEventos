import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  width: 350,
  bgcolor: "#36942b",
  boxShadow: 10,
  p: 2,
  borderRadius: 3,
};

export default function PopUpEliminar({ open, handleClose, component }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          ¡{component} eliminado exitosamente!
        </Typography>
      </Box>
    </Modal>
  );
}
