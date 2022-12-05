import { createTheme } from '@mui/material/styles'
import { blue, deepOrange, grey } from '@mui/material/colors'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'
import { indigo } from '@material-ui/core/colors'
import { CSSProperties } from 'react'

const chineseFont = "'Noto Sans', sans-serif" // To-Do: Create font with custom chars
const genericFont = "'Noto Sans', sans-serif"
const emphasisFont = "'Montserrat', sans-serif"

declare module '@mui/material/styles' {
  interface Theme {
    constants: {
      animationDuration: number
      maxContentWidth: string
    }
  }

  interface ThemeOptions {
    constants?: {
      animationDuration?: number
      maxContentWidth?: string
    }
  }

  interface TypographyVariants {
    chineseHeading: CSSProperties
    chineseNormal: CSSProperties
    primitiveMeaning: CSSProperties
  }

  // Allows configuration using `createTheme`.
  interface TypographyVariantsOptions {
    chineseHeading?: CSSProperties
    chineseNormal?: CSSProperties
    primitiveMeaning?: CSSProperties
  }
}

// Updates the Typography's variant prop options.
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    chineseHeading: true
    chineseNormal: true
    primitiveMeaning: true
  }
}

let theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    constants: {
      animationDuration: 150,
      maxContentWidth: '48rem',
    },
    typography: {
      fontFamily: genericFont,
      h4: {
        fontFamily: emphasisFont,
        fontWeight: 800,
        fontSize: 24,
        lineHeight: 1.2,
      },
      h5: {
        fontFamily: emphasisFont,
        fontWeight: 600,
        fontSize: 28,
      },
      h6: {
        fontFamily: emphasisFont,
        fontWeight: 600,
        fontSize: 18,
      },
      button: {
        fontFamily: emphasisFont,
      },
      body1: {
        lineHeight: 2,
      },
      chineseHeading: {
        fontFamily: chineseFont,
        fontSize: 96,
        fontWeight: 400,
        lineHeight: 1,
      },
      chineseNormal: {
        fontFamily: chineseFont,
        fontSize: 24,
      },
      primitiveMeaning: {
        fontSize: 20,
        fontFamily: emphasisFont,
        fontWeight: 'normal',
        fontStyle: 'italic',
        lineHeight: 1.2,
      },
    },
    palette: {
      primary: {
        main: blue[800],
        dark: indigo[900],
      },
      secondary: {
        main: deepOrange[500],
        dark: deepOrange[700],
        light: deepOrange[200],
      },
      background: {
        default: grey[50],
      },
    },
  })
)

theme = createTheme(theme, {
  typography: {
    primitiveMeaning: {
      color: theme.palette.secondary.main,
    },
  },
})

export default theme
