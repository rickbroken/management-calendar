
"use client";
import { createTheme } from '@mui/material/styles';

/**
 * Tema personalizado de MUI con variables para alternar esquemas de color.
 */
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {},
    dark: {
      palette: {
        primary: {
          main: '#1f6feb',
        },
        background: {
          default: '#0d1117',
          paper: '#161b22',
        },
        text: {
          primary: '#c9d1d9',
          secondary: '#8b949e',
        },
        divider: '#30363d',
      },
    },
  },
});

export default theme;
