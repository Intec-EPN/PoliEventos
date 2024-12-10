import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const EsquemaCategoriaItemInicial = ({ esquemas, index }) => {
  const { watch } = useFormContext();
  const esquemaInicial = watch(`esquemasCategorias[${index}].esquemaId`) || "";
  const categoriaInicial = watch(`esquemasCategorias[${index}].categoriaId`) || "";

  const [esquemaSeleccionado, setEsquemaSeleccionado] = useState(esquemaInicial);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial);

  useEffect(() => {
    if (esquemaInicial && categoriaInicial) {
      setEsquemaSeleccionado(esquemaInicial);
      setCategoriaSeleccionada(categoriaInicial);
    }
  }, [esquemaInicial, categoriaInicial]);

  const esquema = esquemas.find((esquema) => esquema.esquemaId === esquemaSeleccionado);
  const esquemaNombre = esquema ? esquema.esquemaNombre : "N/A";
  const categoria = esquema ? esquema.categorias.find((categoria) => categoria.categoriaId === categoriaSeleccionada) : null;
  const categoriaNombre = categoria ? categoria.categoriaNombre : "N/A";

  console.log("Esquema seleccionado:", esquemaSeleccionado, "Nombre:", esquemaNombre);
  console.log("Categoría seleccionada:", categoriaSeleccionada, "Nombre:", categoriaNombre);

  return (
    <Box display={"flex"} sx={{ width: "98%" }} gap={1}>
      <Paper sx={{ width: "50%", mt: 0.5, p: 1, backgroundColor: "#fff", display:"flex", alignItems:"center" }}>
        <Typography>
          {esquemaNombre}
        </Typography>
      </Paper>
      <Paper sx={{ width: "50%", mt: 0.5, p: 1, backgroundColor: "#fff", display:"flex", alignItems:"center"  }}>
        <Typography>
          {categoriaNombre}
        </Typography>
      </Paper>
    </Box>
  );
};