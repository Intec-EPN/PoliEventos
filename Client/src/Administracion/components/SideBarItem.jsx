import {
  Grid2,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { RolesSubItem } from "./RolesSubItem";
import { useDispatch } from "react-redux";
import { opcionActual } from "../store/administracionSlice";

export const SideBarItem = ({ opcion = " ", onClickNavigation }) => {
  // Manejar store en redux para seleccionar la opción actual:
  const dispatch = useDispatch();
  const handleClick = (value) => {
    onClickNavigation();
    dispatch(opcionActual(value));
  };

  return (
    <>
      {opcion !== "Roles" ? (
        <ListItem disablePadding>
          <ListItemButton
            selected={false}
            sx={{

              color:"white",
              width: "100%",
              "&.Mui-selected": {
                backgroundColor: "white", 
                color: "#1e2c4f", 
                "& .MuiListItemText-root": {
                  color: "#1e2c4f!important", 
                },
              },
              "&:hover": {
                backgroundColor: "#d3d3d3",
                color: "#1e2c4f!important",  
              },
              "&:focus": {
                backgroundColor: "#d3d3d3", 
                color: "#1e2c4f!important", 
              },
            }}
            onClick={() => handleClick(opcion)}
          >
            <Grid2 >
              <ListItemText primary={opcion} sx={{ ml: 1 }} />
            </Grid2>
          </ListItemButton>
        </ListItem>
      ) : (
        <RolesSubItem onClick={onClickNavigation} />
      )}
    </>
  );
};
