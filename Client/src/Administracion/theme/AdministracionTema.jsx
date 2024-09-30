import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { temaAzul } from "./temaAzul";

export const AdministracionTema = ({ children }) => {
  return (
    <ThemeProvider theme={temaAzul}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
