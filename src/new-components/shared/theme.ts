import { createTheme } from '@mui/material/styles'
import { blue, deepOrange, grey, teal } from '@mui/material/colors'
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
    specialParagraphs: {
      generic: string
      tip: string
      whenPrimitive: string
    }
  }

  interface PaletteOptions {
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
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: 'initial',
            backgroundColor: grey[200],
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
      h4: {
        fontFamily: emphasisFont,
        fontWeight: 800,
        fontSize: 32,
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
        lineHeight: 1.5,
      },
      body2: {
        fontSize: 16,
      },
      overline: {
        fontWeight: 'bold',
      },
      chineseHeading: {
        fontFamily: chineseFont,
        fontSize: 120,
        fontWeight: 400,
        lineHeight: 1,
      },
      chineseNormal: {
        fontFamily: chineseFont,
        fontSize: 24,
        lineHeight: 1.2,
      },
      primitiveMeaning: {
        fontSize: 20,
        fontFamily: emphasisFont,
        fontWeight: 'normal',
        fontStyle: 'italic',
        lineHeight: 1.2,
        color: '#C93070',
      },
      storySegments: {
        keyword: {
          fontWeight: 900,
          color: teal[600],
        },
        primitive: {
          fontWeight: 'bold',
          fontStyle: 'italic',
        },
        constituent: {
          color: blue[400],
        },
      },
    },
    palette: {
      primary: {
        main: teal[600],
        light: teal[200],
        lightHovered: teal[300],
      },
      secondary: {
        main: '#C93070',
      },
      background: {
        default: grey[50],
      },
      specialParagraphs: {
        generic: grey[200],
        tip: '#F8F2E9',
        whenPrimitive: '#FDEDED',
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
  },
  typography: {
    primitiveMeaning: {
      color: theme.palette.secondary.main,
    },
    storySegments: {
      primitive: {
        color: theme.palette.secondary.main,
      },
    },
  },
})

export default theme
