import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
  },
  palette: {
    lobby: {
      100: "#22007F40",
      200: "#22007F",
      300: "#3100B6",
    },
    customGrey: {
      100: "#F4F4F4",
      200: "#D8DCE2",
      300: "#B1B9C5",
      400: "#64748B",
    },
    black: {
      main: "#353535",
    },
    selected: {
      main: "#04DDB3",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#353535",
            fontSize: "16px",
          },
          "& .MuiInputLabel-root": {
            color: "#B1B9C5",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#B1B9C5",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#B1B9C5",
            },
            "&:hover fieldset": {
              borderColor: "#B1B9C5",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#B1B9C5",
            },
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#B1B9C5",
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#B1B9C5",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#B1B9C5",
          },
        },
      },
    },
  },
});
