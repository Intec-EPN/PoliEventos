import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { CategoriaPermiso } from "../../Permisos/components/CategoriaPermiso";
import { permisos } from "../../permisos";

const niveles = permisos;

export const FormRol = () => {
  return (
    <>
      <form>
        <Typography
          variant="h6"
          noWrap
          color="primary"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          CREAR UN ROL
        </Typography>
        <Grid2 container gap={3}>
          <Grid2 width="95%">
            <TextField
              label="Ingresa el nombre del rol"
              variant="outlined"
              placeholder="Nombre del rol"
              fullWidth={true}
            />
          </Grid2>
          <Grid2 width="95%">
            <TextField
              label="Ingresa la descripción del rol"
              placeholder="Descripción del rol"
              multiline
              rows={4}
              variant="outlined"
              fullWidth={true}
            />
          </Grid2>
          <Grid2 container display="flex" flexDirection="column">
            <Box component="div" sx={{ fontWeight: 700, color: "primary" }}>
              Selecciona los permisos:
            </Box>
            <Box
              display="block"
              justifyContent="start"
              sx={{ justifyContent: { xs: "start" } }}
            >
              {/* //Nivel Propio */}
              <Grid2 container sx={{ mt: 2 }}>
                <CategoriaPermiso
                  {...niveles.Propio}
                  clickable={true}
                  align={true}
                />
              </Grid2>
              {/* //Nivel Departamento */}
              <Grid2 container display="block">
                <CategoriaPermiso
                  {...niveles.Departamento}
                  clickable={true}
                  dept={true}
                  align={true}
                />
              </Grid2>
              {/* //Nivel Facultad */}
              <Grid2 container>
                <CategoriaPermiso
                  {...niveles.Facultad}
                  clickable={true}
                  align={true}
                />
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
        <Button variant="contained" sx={{ backgroundColor: "#1e2c4f", mt:2, mb:2 }}>
          CREAR ROL
        </Button>
      </form>
    </>
  );
};
