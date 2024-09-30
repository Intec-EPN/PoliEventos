import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const temaAzul = createTheme({
    palette: {
        primario: {
            main: '#1e2c4f',
        },
        secundario: {
            main: '#e6e6e6',
        },
        terceario:'#004aad',
        error: {
            main: red.A400,
        }
    },

});
