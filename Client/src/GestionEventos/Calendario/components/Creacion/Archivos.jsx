import { useEffect, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { Box, Typography, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export const Archivos = ({ sendFiles, onFilesChange }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleFileDelete = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  useEffect(() => {
    if (sendFiles) {
      console.log("me ejecuto", files);
    }
  }, [sendFiles]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          fontSize: "0.8rem",
          color: "#898989",
          textAlign: "end",
        }}
      >
        Tamaño máximo total de 5MB.
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
        inputProps={{ accept: ".png, .jpeg, audio/*, .pdf" }}
        InputProps={{
          startAdornment: <AttachFileIcon sx={{ color: "#0a3b91" }} />,
        }}
        clearIconButtonProps={{
          title: "Remove",
          children: <CloseIcon fontSize="small" sx={{ color: "#0a3b91" }} />,
        }}
        getInputText={(value) => (value ? `${files.length} archivos` : "")}
      />
      <Box>
        {files.length > 0 && (
          <Box display="flex" flexDirection="row" gap={1} ml={1} mt={1}>
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
