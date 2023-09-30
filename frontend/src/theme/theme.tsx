import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5f5',
    },
    background: {
      default: '#f5f5f5',
    }
  },
  typography: {
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 18,
    },
    h5: {
      fontSize: 14
    },
    h6: {
      fontSize: 12,
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h6',
          subtitle2: 'h6',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});

export default theme;