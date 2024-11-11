import { Box } from "@mui/material";
import { LoginPage } from "./LoginPage";
import { LoginTema } from "./theme/LoginTema";

export const LoginMain = () => {
  return (
    <LoginTema>
      <LoginPage />
    </LoginTema>
  );
};
