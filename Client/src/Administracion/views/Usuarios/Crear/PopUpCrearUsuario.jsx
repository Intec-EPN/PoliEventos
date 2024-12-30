import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export const PopUpCrearUsuario = ({ open, handleClose }) => {
  const navigate = useNavigate();
  
  const handleUsuarios = () => {
    navigate("/admin/usuarios/lista");
  };

  const handleAsignar = () => {
    navigate("/admin/usuarios/asignar");
  };

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
          ¡Creación de usuario exitosa!
        </Typography>
        <Box display={"flex"} justifyContent={"center"} gap={2} mt={1}>
          <Button
            variant="contained"
            onClick={handleAsignar}
            sx={{ backgroundColor: "#1d5318" }}
          >
            Asignar rol
          </Button>
          <Button
            variant="contained"
            onClick={handleUsuarios}
            sx={{ backgroundColor: "#1d5318" }}
          >
            Ver usuarios
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
