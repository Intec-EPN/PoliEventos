import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { temaLogin } from "./temaLogin";

export const LoginTema = ({ children }) => {
  return (
    <ThemeProvider theme={temaLogin}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
