import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

export default function BotonSeleccionar({ onSeleccionChange }) {
  const [alignment, setAlignment] = useState("ingresar");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      if (onSeleccionChange) {
        onSeleccionChange(newAlignment);
      }
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{
        background: "#fff",
        borderRadius: "12px 12px 0 0",
        "& .MuiToggleButton-root": {
          color: "#000",
          "&.Mui-selected": {
            backgroundColor: "#dc8626",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#db8524",
              color: "#fff",
            },
          },
          "&:hover": {
            backgroundColor: "#db8524",
            color: "#fff",
          },
          "&:first-of-type": {
            borderRadius: "12px 0 0 0",
          },
          "&:last-of-type": {
            borderRadius: "0 12px 0 0",
          },
        },
      }}
    >
      <ToggleButton value="ingresar">Ingresar</ToggleButton>
      <ToggleButton value="registrar">Registrarse</ToggleButton>
    </ToggleButtonGroup>
  );
}
