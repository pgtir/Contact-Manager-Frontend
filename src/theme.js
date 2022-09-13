import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: "#949DB2",
      main: "#777E89",
      dark: "#2B4255",
    },
    secondary: {
      light: "#FB9",
      main: "#FB9678",
    },
    success: {
      light: "#949DB2",
      main: "#00C292",
      dark: "#000000DE",
    },
    warning: {
      light: "#949DB2",
      main: "#FEC90F",
      dark: "#000000DE",
    },
    info: {
      light: "#949DB2",
      main: "#03C9D7",
      dark: "#000000DE",
    },
  },

  typography: {
    fontFamily: [
    ' DM Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
        textTransform: 'none'
      }
  },
  

});
export default theme;
