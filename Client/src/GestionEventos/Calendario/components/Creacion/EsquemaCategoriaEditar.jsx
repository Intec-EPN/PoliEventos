import { Box, DialogContentText, Button, IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EsquemaCategoriaItemEditar } from "./EsquemaCategoriaItemEditar";
import { startLoadingEsquemasCategorias } from "../../../../store/GestionEventos/thunk";
import { useFormContext } from "react-hook-form";
import Select from "react-select";

export const EsquemaCategoriaEditar = ({ esquemasCategorias: data }) => {
  const { register, setValue, watch } = useFormContext();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingEsquemasCategorias());
  }, [dispatch]);
  const { esquemasCategorias: esquemasCategoriasCargados } = useSelector(
    (state) => state.gestionEvento
  );

  const esquemasCategorias = watch("esquemasCategorias") || data;
  const esquemas = esquemasCategoriasCargados
    ? esquemasCategoriasCargados
        .filter((esquemaCategoria) => esquemaCategoria.visible)
        .map((esquemaCategoria) => ({
          visible: esquemaCategoria.visible,
          value: esquemaCategoria.esquemaId,
          label: esquemaCategoria.esquemaNombre,
          categorias: esquemaCategoria.categorias
            .filter((categoria) => categoria.visible)
            .map((categoria) => ({
              value: categoria.categoriaId,
              label: categoria.categoriaNombre,
            })),
        }))
    : [];

  const handleAddCategoria = () => {
    setValue("esquemasCategorias", [
      ...esquemasCategorias,
      { categoriaId: null, esquemaId: null },
    ]);
  };

  const handleDeleteCategoria = (index) => {
    const newCategorias = esquemasCategorias.filter((_, i) => i !== index);
    setValue("esquemasCategorias", newCategorias);
  };

  const handleChangeEsquema = (index, selectedOption) => {
    const newCategorias = esquemasCategorias.map((categoria, i) =>
      i === index
        ? { ...categoria, esquemaId: selectedOption.value, categoriaId: null }
        : categoria
    );
    setValue("esquemasCategorias", newCategorias);
  };

  const handleChangeCategoria = (index, value) => {
    const newCategorias = esquemasCategorias.map((categoria, i) =>
      i === index ? { ...categoria, categoriaId: value.value } : categoria
    );
    setValue("esquemasCategorias", newCategorias);
  };

  const esquemasSeleccionados = esquemasCategorias.map((ec) => ec.esquemaId);

  const esquemasDisponibles = esquemas.filter(
    (esquema) => !esquemasSeleccionados.includes(esquema.value)
  );



  return (
    <Box sx={{ my: 1 }}>
      <DialogContentText sx={{ color: "#333333" }}>
        Categorías del evento
      </DialogContentText>
      <Box display={"flex"} sx={{ flexDirection: "column" }} gap={1} mt={1}>
        {esquemasCategorias.map((esquemaCategoria, index) => {
          const esquemaSeleccionado = esquemas.find(
            (option) => option.value === esquemaCategoria.esquemaId
          );
          const esquemaValue = esquemaCategoria.esquemaId === null
            ? null
            : esquemaSeleccionado && esquemaSeleccionado.visible
            ? esquemaSeleccionado
            : { label: "Esquema en desuso, asigne otro." };
          return (
            <Box key={index} display={"flex"} sx={{ width: "100%" }} gap={1}>
              <Box display={"flex"} sx={{ width: "100%" }} gap={1}>
                <Box sx={{ flex: 1 }}>
                  <Select
                    options={esquemasDisponibles}
                    value={esquemaValue}
                    onChange={(selectedOption) =>
                      handleChangeEsquema(index, selectedOption)
                    }
                    placeholder="Seleccione un esquema"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        height: "3rem",
                        fontFamily: "Roboto",
                        backgroundColor: "white",
                        width: "100%",
                        borderColor: "#c5c5c5",
                        boxShadow: "none",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                          borderColor: "#c5c5c5",
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        fontFamily: "Roboto",
                        height: "3rem",
                        display: "flex",
                        alignItems: "center",
                      }),
                      indicatorSeparator: (provided) => ({
                        ...provided,
                        backgroundColor: "transparent",
                      }),
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <EsquemaCategoriaItemEditar
                    index={index}
                    categoriaId={esquemaCategoria.categoriaId}
                    categorias={
                      esquemaSeleccionado?.categorias || [
                        { label: "Categoría en desuso, asigne otra." },
                      ]
                    }
                    onChange={(value) => handleChangeCategoria(index, value)}
                  />
                </Box>
              </Box>
              <IconButton onClick={() => handleDeleteCategoria(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        })}
      </Box>
      <Button
        onClick={handleAddCategoria}
        sx={{ display: "flex", justifyContent: "start", m: 0, p: 0 }}
      >
        <AddCircleOutlineOutlinedIcon sx={{ mt: 0.4, color: "#0a3b91" }} />
      </Button>
    </Box>
  );
};
