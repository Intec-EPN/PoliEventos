import { useEffect, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { Box, Typography, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const MAX_SIZE_MB = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = [".png", ".jpeg", ".jpg", ".webp", ".pdf", ".docx", ".doc"];

export const Archivos = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (newFiles) => {
    let validFiles = [];
    let totalSize = 0;

    for (let file of newFiles) {
      const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(extension)) {
        totalSize += file.size;
        if (totalSize <= MAX_SIZE_MB) {
          validFiles.push(file);
        } else {
          setError("Límite de espacio sobrepasado");
          break;
        }
      }
    }

    if (totalSize <= MAX_SIZE_MB) {
      setError("");
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
          textAlign: "end",
        }}
      >
        Tamaño máximo total de 5MB. Formatos váldios: .png, .jpeg, .jpg, .webp, .pdf, .docx, .doc
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
        }}
        inputProps={{ accept: ALLOWED_EXTENSIONS.join(", ") }}
        InputProps={{
          startAdornment: <AttachFileIcon sx={{ color: "#0a3b91" }} />,
        }}
        clearIconButtonProps={{
          title: "Remove",
          children: <CloseIcon fontSize="small" sx={{ color: "#0a3b91" }} />,
        }}
        getInputText={(value) => (value ? `${files.length} archivos` : "")}
      />
      {error && (
        <Typography sx={{ color: "red", fontSize: "0.8rem", mt:1 }}>
          {error}
        </Typography>
      )}
      <Box>
        {files.length > 0 && (
          <Box display="flex" flexDirection="row" gap={1} ml={1} mt={1} flexWrap={"wrap"}>
            {files.map((file, index) => (
              <Box key={index} display="flex" alignItems="center">
                <Typography sx={{ color: "#0a3b91", fontWeight: "500" }}>
                  {file.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleFileDelete(index)}
                >
                  <DeleteIcon fontSize="small" sx={{ color: "red" }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};