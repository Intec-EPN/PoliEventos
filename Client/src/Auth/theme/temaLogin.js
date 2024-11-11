import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const temaLogin = createTheme({
    palette: {
        primary: {
            main: '#1e2c4f',
        },
        secondary: {
            main: '#e6e6e6',
        },
        error: {
            main: red.A400,
        }
    },

});
