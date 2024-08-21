import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Nunito, Inter",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: orange[700],
          ":hover": {
            backgroundColor: orange[800],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Nunito, Inter",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: orange[100],
          },
          "&.Mui-selected": {
            color: "#fff",
            backgroundColor: orange[800],
            "&:hover": {
              backgroundColor: orange[900],
            },

            "&.Mui-Typography": {
              fontWidth: 700,
            },
          },
        },
      },
    },
  },
});
