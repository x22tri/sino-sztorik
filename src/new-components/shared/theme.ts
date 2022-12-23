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
    frequency: {
      unknown: string
      veryCommon: string
      quiteCommon: string
      common: string
      uncommon: string
      rare: string
      veryRare: string
    }
    specialParagraphs: {
      explanation: string
      tip: string
      notes: string
      whenPrimitive: string
    }
  }
  interface PaletteOptions {
    frequency: {
      unknown: string
      veryCommon: string
      quiteCommon: string
      common: string
      uncommon: string
      rare: string
      veryRare: string
    }
    specialParagraphs: {
      explanation: string
      tip: string
      notes: string
      whenPrimitive: string
    }
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
      MuiCssBaseline: {
        styleOverrides: `.swiper-slide {
          height: auto;
        }

        .swiper-slide:not(.swiper-slide-active) > .swiper-slide {
          filter: blur(4px);
        } 
        
        #root {
          height: 100vh
        }`,
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
      body2: {
        fontSize: 16,
      },
      overline: {
        fontWeight: 'bold',
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
        lineHeight: 1.2,
      },
      primitiveMeaning: {
        fontSize: 20,
        fontFamily: emphasisFont,
        fontWeight: 'normal',
        fontStyle: 'italic',
        lineHeight: 1.2,
      },
      storySegments: {
        keyword: {
          fontWeight: 'bold',
        },
        primitive: {
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: deepOrange[400],
        },
        constituent: {
          color: blue[400],
        },
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
      frequency: {
        unknown: grey[500],
        veryCommon: '#d03738',
        quiteCommon: '#D26836',
        common: '#D17F36',
        uncommon: '#D7AF1F',
        rare: grey[700],
        veryRare: grey[500],
      },
      specialParagraphs: {
        explanation: blue[800],
        tip: '#F1B100',
        notes: grey[500],
        whenPrimitive: deepOrange[400],
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
