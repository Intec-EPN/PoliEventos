import { Chip, Tooltip } from "@mui/material"

export const ChipPermiso = ({id, accion, tooltip, bgColor, clickable = false, color, nombre, onPermisoClick}) => {
  return (
    <>
        <Tooltip title={tooltip} arrow >
              <Chip
                clickable={clickable}
                label={accion}
                sx={{
                  backgroundColor: `${bgColor}`,
                  fontWeight: 600,
                  color: { color },
                  mb: 1,
                  mr: 1,
                }}
                onClick={() => onPermisoClick(nombre, id)}
              />
            </Tooltip>
    </>
  )
}
