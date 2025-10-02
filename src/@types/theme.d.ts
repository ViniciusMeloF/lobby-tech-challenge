import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    lobby: Palette["grey"];
    customGrey: Palette["grey"];
    black: Palette["primary"];
    selected: Palette["primary"];
  }

  interface PaletteOptions {
    lobby?: ColorPartial;
    customGrey?: ColorPartial;
    black?: PaletteOptions["primary"];
    selected?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    lobby: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    customGrey: true;
    black: true;
  }
}
