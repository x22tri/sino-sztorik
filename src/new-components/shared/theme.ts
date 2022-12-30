import { CSSProperties } from 'react'
import { createTheme } from '@mui/material/styles'
import { grey, teal } from '@mui/material/colors'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'

const chineseFont = "'Noto Sans', sans-serif" // To-Do: Create font with custom chars
const genericFont = "'Noto Sans', sans-serif"
const emphasisFont = "'Montserrat', sans-serif"

declare module '@mui/material/styles' {
  interface Theme {
    constants: {
      animationDuration: number
      backButtonStripHeight: string
      maxContentWidth: string
      toolbarHeight: string
    }
  }

  interface ThemeOptions {
    constants?: {
      animationDuration?: number
      backButtonStripHeight?: string
      maxContentWidth?: string
      toolbarHeight?: string
    }
  }

  interface Palette {
    neutral: Palette['primary']
    specialParagraphs: {
      generic: string
      tip: string
      whenPrimitive: string
    }
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary']
    specialParagraphs: {
      generic: string
      tip: string
      whenPrimitive: string
    }
  }

  interface PaletteColor {
    lightHovered?: string
  }

  interface SimplePaletteColorOptions {
    lightHovered?: string
  }

  interface StorySegmentVariants {
    keyword: CSSProperties
    primitive: CSSProperties
    constituent: CSSProperties
  }

  interface TypographyVariants {
    chineseHeading: CSSProperties
    chineseNormal: CSSProperties
    primitiveMeaning: CSSProperties
    storySegments: StorySegmentVariants
  }

  // Allows configuration using `createTheme`.
  interface TypographyVariantsOptions {
    chineseHeading?: CSSProperties
    chineseNormal?: CSSProperties
    primitiveMeaning?: CSSProperties
    storySegments?: StorySegmentVariants
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    neutral: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
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
        defaultProps: { disableRipple: true },
        // styleOverrides: { root: { textTransform: 'none' } },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'transparent',
              opacity: 0.8,
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: { paddingLeft: 0, paddingRight: 0 },
        },
      },
      MuiLink: {
        defaultProps: { underline: 'none' },
        styleOverrides: {
          root: {
            color: 'initial',
            fontStyle: 'italic',
            borderRadius: '4px',
            padding: '0 2px',
            transition: '200ms',
            '&:hover': { cursor: 'pointer' },
          },
        },
      },
    },
    constants: {
      animationDuration: 150,
      backButtonStripHeight: '40px',
      maxContentWidth: '48rem',
      toolbarHeight: '48px',
    },
    typography: {
      fontFamily: genericFont,
      h4: { fontFamily: emphasisFont, fontWeight: 800, fontSize: 32 },
      h5: { fontFamily: emphasisFont, fontWeight: 600, fontSize: 28 },
      h6: { fontFamily: emphasisFont, fontWeight: 600, fontSize: 18 },
      button: { fontFamily: emphasisFont, textTransform: 'none' },
      body1: { lineHeight: 1.5 },
      body2: { fontSize: 16 },
      overline: { fontWeight: 'bold' },
      chineseHeading: {
        fontFamily: chineseFont,
        fontSize: 120,
        fontWeight: 400,
        lineHeight: 1,
      },
      chineseNormal: { fontFamily: chineseFont, fontSize: 24, lineHeight: 1.2 },
      primitiveMeaning: {
        fontSize: 20,
        fontFamily: emphasisFont,
        fontWeight: 'normal',
        fontStyle: 'italic',
        lineHeight: 1.2,
      },
      storySegments: {
        keyword: { fontWeight: 900 },
        primitive: { fontWeight: 'bold', fontStyle: 'italic' },
        constituent: {},
      },
    },
    palette: {
      primary: { main: teal[600], light: teal[200], lightHovered: teal[300] },
      secondary: { light: '#FFEFF3', main: '#D91147' },
      neutral: { main: grey[600], contrastText: grey[50], light: grey[200] },
      background: { default: grey[50] },
      specialParagraphs: {
        generic: grey[200],
        tip: '#F8F2E9',
        whenPrimitive: '', // Fallback. Overridden later to be in line with 'secondary.light'.
      },
    },
  })
)

theme = createTheme(theme, {
  components: {
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontFamily: emphasisFont,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.secondary.light,
          // color: theme.palette.secondary.dark,
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          },
        },
      },
    },
  },
  palette: {
    specialParagraphs: {
      whenPrimitive: theme.palette.secondary.light,
    },
  },
  typography: {
    primitiveMeaning: {
      color: theme.palette.secondary.main,
    },
    storySegments: {
      keyword: {
        color: theme.palette.primary.main,
      },
      primitive: {
        color: theme.palette.secondary.main,
      },
    },
  },
})

export default theme
