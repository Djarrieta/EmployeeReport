import { createTheme } from '@material-ui/core';
import { deepPurple, grey } from '@material-ui/core/colors';

export const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: grey,
  },
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
});
