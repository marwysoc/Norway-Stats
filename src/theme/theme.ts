import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }

    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }

  export const theme = createTheme({
    palette: {
      primary: {
        main: '#00205B',
      },
      secondary: {
        main: '#BA0C2F',
      },
    },
  });