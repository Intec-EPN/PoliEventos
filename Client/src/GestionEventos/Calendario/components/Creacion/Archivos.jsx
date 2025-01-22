import { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { Box, Typography, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";

const MAX_SIZE_MB = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = [
  ".png",
  ".jpeg",
  ".jpg",
  ".webp",
  ".pdf",
  ".docx",
  ".doc",
];

export const Archivos = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (newFiles) => {
    let validFiles = [...files];
    let totalSize = validFiles.reduce((acc, file) => acc + file.size, 0);
    let formatError = false;

    for (let file of newFiles) {
      const extension = file.name
        .slice(file.name.lastIndexOf("."))
        .toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(extension)) {
        totalSize += file.size;
        if (totalSize <= MAX_SIZE_MB) {
          validFiles.push(file);
        } else {
          setError("Límite de espacio sobrepasado");
          break;
        }
      } else {
        formatError = true;
      }
    }

    if (totalSize <= MAX_SIZE_MB && !formatError) {
      setError("");
    } else if (formatError) {
      setError("Formato de archivo incorrecto.");
    }

    setFiles(validFiles);
    onFilesChange(validFiles);
  };

  const handleFileDelete = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  return (
    <Box sx={{ mb: 2, width: "99%" }}>
      <Typography
        sx={{
          fontSize: "0.8rem",
          color: "#898989",
          textAlign: {xs:"start",sm:"end"},
          py: {xs: 1,sm:0}
        }}
      >
        Tamaño máximo total de 5MB. Formatos váldios: .png, .jpeg, .jpg, .webp,
        .pdf, .docx, .doc
      </Typography>
      <MuiFileInput
        value={files}
        placeholder="Escoge archivo/s"
        size="small"
        onChange={handleFileChange}
        multiple
        sx={{
          border: "0.2rem solid #0a3b91",
          borderRadius: "7px",
          width: "100%",
          cursor: "pointer",
        }}
        inputProps={{ accept: ALLOWED_EXTENSIONS.join(", ") }}
        InputProps={{
          startAdornment: <AttachFileIcon sx={{ color: "#0a3b91" }} />,
        }}
        clearIconButtonProps={{
          title: "Remove",
          children: <CloseIcon fontSize="small" sx={{ color: "#0a3b91" }} />,
        }}
        getInputText={(value) =>
          value
            ? `${files.length} archivo${files.length > 1 ? "s" : ""}, HAZ CLIC AQUÍ PARA AGREGAR MÁS.`
            : ""
        }
      />
      {error && (
        <Typography sx={{ color: "red", fontSize: "0.8rem", mt: 1 }}>
          {error}
        </Typography>
      )}
      <Box>
        {files.length > 0 && (
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            mt={1}
            flexWrap={"wrap"}
          >
            {files.map((file, index) => (
              <Box
                key={index}
                display="flex"
                py={0}
                my={0}
                alignItems="center"
                pl={1.5}
                sx={{
                  color: "white",
                  backgroundColor: "#0a3b91",
                  borderRadius: "5px",
                }}
              >
                {["png", "jpg", "jpeg", "webp"].includes(
                  file.name.split(".").pop().toLowerCase()
                ) ? (
                  <ImageIcon sx={{ fontSize: "1rem" }} />
                ) : (
                  <DescriptionIcon sx={{ fontSize: "1rem" }} />
                )}

                <Typography sx={{ color: "white", fontWeight: "500", pl: 0.5 }}>
                  {file.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleFileDelete(index)}
                >
                  <HighlightOffIcon
                    sx={{
                      fontSize: "1.1rem",
                      height: "1.5rem",
                      pt: 0.3,
                      color: "#ff6500",
                      pl: 1,
                      pr: 1,
                    }}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
