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

  const { categorias } = useSelector((state) => state.categorias);
  const listItem = categorias;

  const onEdit = (value) => {
    navigate(`/admin/categorizaciones/${value}/editar`);
  };

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "white" }}>
        {listItem.map((item) => (
          <ListItem
            sx={{ bgcolor: "#2c4175", mb: 2 }}
            key={item.Nombre}
            mb={2}
            secondaryAction={
              <>
                <IconButton onClick={() => onEdit(item.Nombre)}>
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton>
                  <VisibilityIcon sx={{ color: "white" }} />
                </IconButton>
              </>
            }
          >
            <Tooltip title={item.Descripcion}>
              <ListItemText primary={item.Nombre} sx={{ color: "white" }} />
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
