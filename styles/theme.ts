import { createTheme } from '@mui/material'
declare module '@mui/material/styles' {
  interface Palette {
    HBPNavy: Palette['primary'];
    Mist: Palette['primary'];
    DarkGreen: Palette['primary'];
  }
  interface PaletteOptions {
    HBPNavy: PaletteOptions['primary'];
    Mist: PaletteOptions['primary'];
    DarkGreen: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ["'Nunito Sans'", 'sans-serif'].join(',')
  },
  palette: {
    HBPNavy: {
      main: '#1B365D'
    },
    Mist: {
      main: '#52A1B4'
    },
    DarkGreen: {
      main: '#439A6B'
    }
  }
})

theme.typography.body1 = {
  margin: '16px 0'
}
