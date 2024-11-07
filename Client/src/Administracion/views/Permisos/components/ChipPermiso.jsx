import { useState } from "react";
import { Badge, Chip, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check"; // Importa el ícono de verificación

// Definimos un Badge personalizado para ajustar la posición del circulito
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 10,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#07a2ae", // Color de fondo del circulito
    color: "#fff",
  },
}));

export const ChipPermiso = ({
  id,
  accion,
  tooltip,
  bgColor,
  clickable = false,
  color,
  nombre,
  onPermisoClick,
}) => {
  const [showBadge, setShowBadge] = useState(false);
  const handleChipClick = () => {
    if (clickable) {
      setShowBadge((prevShowBadge) => !prevShowBadge);
      onPermisoClick(nombre, id);
    }
  };

  return (
    <>
      <Tooltip
        title={tooltip}
        arrow
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -4], // Ajusta el segundo valor para cambiar la distancia
              },
            },
          ],
        }}
      >
        {clickable ? (
          <StyledBadge
            overlap="circular"
            badgeContent={
              showBadge ? (
                <CheckIcon fontSize="small" sx={{ fontSize: "0.8rem" }} />
              ) : (
                ""
              )
            } // Ajusta el tamaño del ícono
            invisible={!showBadge} // Esto controla la visibilidad del Badge
          >
            <Chip
              clickable={clickable}
              label={accion}
              sx={{
                backgroundColor: `${bgColor}`,
                fontSize: 17,
                fontWeight: 600,
                color: color,
                mb: 1,
                mr: 1,
                borderRadius:"6px",
                "&:hover": clickable
                  ? {
                      backgroundColor: "#d3d3d3", // Color de fondo cuando está en hover
                      color: "black", // Color del texto cuando está en hover
                    }
                  : {},
              }}
              onClick={handleChipClick}
            />
          </StyledBadge>
        ) : (
          <Chip
            clickable={clickable}
            label={accion}
            sx={{
              backgroundColor: `${bgColor}`,
              fontSize: 17,
              fontWeight: 600,
              color: color,
              mb: 1,
              mr: 1,
              borderRadius:"6px",
              "&:hover": clickable
                ? {
                    backgroundColor: "#d3d3d3", // Color de fondo cuando está en hover
                    color: "black", // Color del texto cuando está en hover
                  }
                : {},
            }}
            onClick={handleChipClick}
          />
        )}
      </Tooltip>
    </>
  );
};
