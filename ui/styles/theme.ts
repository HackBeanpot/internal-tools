import { createTheme } from '@mui/material'
declare module '@mui/material/styles' {
  interface Palette {
    HBPNavy: Palette['primary'];
    Mist: Palette['primary'];
    DarkGreen: Palette['primary'];
    HBPBlue: Palette['primary'];
    YellowGreen: Palette['primary'];
    SproutGreen: Palette['primary'];
    White: Palette['primary'];
    Red: Palette ['primary'];
    HBPCTA: Palette ['primary'];
    Teal: Palette ['primary'];
    Grey: Palette['primary'];
  }
  interface PaletteOptions {
    HBPNavy: PaletteOptions['primary'];
    Mist: PaletteOptions['primary'];
    DarkGreen: PaletteOptions['primary'];
    HBPBlue: PaletteOptions['primary'];
    YellowGreen: PaletteOptions['primary'];
    SproutGreen: PaletteOptions['primary'];
    White: PaletteOptions['primary'];
    Red: PaletteOptions ['primary'];
    HBPCTA: PaletteOptions ['primary'];
    Teal: PaletteOptions ['primary'];
    Grey: PaletteOptions['primary'];
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
    },
    HBPBlue: {
      main: '#A5DCE8'
    },
    YellowGreen: {
      main: '#E0F36D'
    },
    SproutGreen: {
      main: '#70E0A3'
    },
    White: {
      main: '#FFFFFF'
    },
    Red: {
      main: '#FF0000'
    },
    HBPCTA: {
      main: '#FBDD40'
    },
    Teal: {
      main: '#25C9D0'
    },
    Grey: {
      main: 'rgba(0, 0, 0, 0.06)'
    }
  }
})
