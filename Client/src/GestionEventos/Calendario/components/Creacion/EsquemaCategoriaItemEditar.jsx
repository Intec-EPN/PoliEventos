import Select from "react-select";
import { useFormContext } from "react-hook-form";

export const EsquemaCategoriaItemEditar = ({
  index,
  categoriaId,
  categorias,
  onChange,
}) => {
  const { setValue, watch } = useFormContext();
  const esquemasCategorias = watch("esquemasCategorias") || [];

  const handleChangeCategoria = (selectedOption) => {
    const newCategorias = esquemasCategorias.map((categoria, i) =>
      i === index
        ? { ...categoria, categoriaId: selectedOption.value }
        : categoria
    );
    setValue("esquemasCategorias", newCategorias);
    onChange(selectedOption);
  };

  const options = categorias.map((categoria) => ({
    value: categoria.value !== undefined ? categoria.value : categoria.id,
    label:
      categoria.label !== undefined
        ? categoria.label
        : categoria.categoriaNombre,
  }));

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === categoriaId) || null}
      onChange={handleChangeCategoria}
      placeholder="Selecciona una categoría"
      isDisabled={!categorias.length}
      styles={{
        control: (provided) => ({
          ...provided,
          height: "3rem",
          backgroundColor: "white",
          fontFamily: "Roboto",
          width: "100%",
          flex: 1,
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
  );
};
