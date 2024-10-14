import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ListaCategorias = () => {
  const navigate = useNavigate();

  const {esquemas} = useSelector((state) => state.categorizacion);

  const onEdit = (value) => {
    navigate(`/admin/categorizaciones/${value}/editar`);
  };

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "white" }}>
        {esquemas.map((esquema) => (
          <ListItem
            sx={{ bgcolor: "#2c4175", mb: 2 }}
            key={esquema.id}
            mb={2}
            secondaryAction={
              <>
                <IconButton onClick={() => onEdit(esquema.nombre)}>
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton>
                  <VisibilityIcon sx={{ color: "white" }} />
                </IconButton>
              </>
            }
          >
            <Tooltip title={esquema.descripcion}>
              <ListItemText primary={esquema.nombre} sx={{ color: "white" }} />
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="end">
        <Button variant="contained" sx={{ backgroundColor: "#2c4175", mb: 2 }}>
          Agregar
        </Button>
      </Box>
    </Box>
  );
};
