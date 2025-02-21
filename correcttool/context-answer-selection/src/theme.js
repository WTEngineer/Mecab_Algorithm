import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#d81b60'
    },
    secondary: {
      main: '#ffeb3b'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    },
    warning: {
      main: '#ff9800'
    },
    info: {
      main: '#2196f3'
    },
    success: {
      main: '#4caf50'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
})

export default theme
