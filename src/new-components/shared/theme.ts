import { CSSProperties } from 'react'
import { createTheme } from '@mui/material/styles'
import { blue, grey, teal } from '@mui/material/colors'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'
import { tooltipClasses } from '@mui/material'

const chineseFont = "'Noto Sans SC', sans-serif" // To-Do: Create font with custom chars
const genericFont = "'Rubik', sans-serif"
export const emphasisFont = "'Rubik', sans-serif"

declare module '@mui/material/styles' {
  interface Theme {
    constants: {
      animationDuration: `${number}ms`
      boxShadow: string
      drawerWidth: number
      lessonStartHeight: `${number}px`
      maxContentWidth: string
    }
  }

  interface ThemeOptions {
    constants?: {
      animationDuration?: `${number}ms`
      boxShadow?: string
      drawerWidth?: number
      lessonStartHeight?: `${number}px`
      maxContentWidth?: string
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
    specialParagraphHeading: CSSProperties
  }

  interface PresentationVariants {
    keyword: CSSProperties
    primitive: CSSProperties
    pinyin: CSSProperties
  }

  interface TypographyVariants {
    chineseHeading: CSSProperties
    chineseNormal: CSSProperties
    presentation: PresentationVariants
    storySegments: StorySegmentVariants
    titleSubtitle: { title: CSSProperties; subtitle: CSSProperties }
    logo: CSSProperties
  }

  // Allows configuration using `createTheme`.
  interface TypographyVariantsOptions {
    chineseHeading?: CSSProperties
    chineseNormal?: CSSProperties
    presentation?: PresentationVariants
    storySegments?: StorySegmentVariants
    titleSubtitle?: { title: CSSProperties; subtitle: CSSProperties }
    logo?: CSSProperties
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
    logo: true
  }
}

let theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiContainer: { styleOverrides: { root: { paddingLeft: 0, paddingRight: 0 } } },
      MuiIconButton: { styleOverrides: { root: { '&:hover': { backgroundColor: 'transparent', opacity: 0.8 } } } },
      MuiLink: {
        defaultProps: { underline: 'none' },
        styleOverrides: { root: { color: '#3366CC', '&:hover': { cursor: 'pointer', backgroundColor: '#DDE8FF' } } },
      },
    },
    constants: {
      animationDuration: '150ms',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 15px -3px',
      drawerWidth: 300,
      maxContentWidth: '48rem',
    },
    typography: {
      fontFamily: genericFont,
      h4: { fontFamily: emphasisFont, fontWeight: 800, fontSize: 24 },
      h5: { fontFamily: emphasisFont, fontWeight: 600, fontSize: 18 },
      h6: { fontFamily: emphasisFont, fontWeight: 600, fontSize: 14 },
      button: { fontWeight: 'bold', textTransform: 'none' },
      body1: { lineHeight: 1.5 },
      body2: { fontSize: 16 },
      chineseHeading: { fontFamily: chineseFont, fontSize: 120, fontWeight: 400, lineHeight: 1 },
      chineseNormal: { fontFamily: chineseFont, fontSize: 24, lineHeight: 1.2 },
      overline: { fontWeight: 'bold' },
      presentation: {
        keyword: { fontFamily: emphasisFont, fontWeight: 800, fontSize: 32, lineHeight: 1.1 },
        primitive: { fontSize: 20, fontFamily: emphasisFont, fontStyle: 'italic', lineHeight: 1.2 },
        pinyin: { fontSize: 14, fontStyle: 'italic' },
      },
      storySegments: {
        keyword: { fontWeight: 900 },
        primitive: { fontWeight: 'bold', fontStyle: 'italic' },
        constituent: {},
        specialParagraphHeading: { fontFamily: emphasisFont, fontSize: 16 },
      },
      subtitle2: { fontWeight: 400 },
      titleSubtitle: {
        title: { fontWeight: 900, fontSize: '80%', lineHeight: 1 },
        subtitle: { fontWeight: 'bold', lineHeight: 1 },
      },
    },
    palette: {
      primary: { main: teal[600], light: teal[200], lightHovered: teal[300] },
      secondary: { light: '#FFEFF3', main: '#D91147' },
      neutral: { main: grey[600], contrastText: grey[50], light: grey[200] },
      background: { default: '#FDFDFD' },
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
    MuiBadge: { styleOverrides: { badge: { fontFamily: emphasisFont } } },
    MuiButtonGroup: { styleOverrides: { grouped: { borderRightColor: 'transparent' } } },
    MuiLink: { styleOverrides: { root: { transition: theme.constants.animationDuration } } },
    // MuiLink: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: theme.palette.secondary.light,
    //       '&:hover': { backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText },
    //     },
    //   },
    // },
    MuiTooltip: {
      styleOverrides: { tooltip: { [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: 2 } } },
    },
  },
  constants: { lessonStartHeight: theme.spacing(8) },
  palette: { specialParagraphs: { whenPrimitive: theme.palette.secondary.light } },
  typography: {
    logo: { ...theme.typography.h4, textDecoration: 'none' },
    presentation: {
      keyword: { color: theme.palette.primary.main },
      primitive: { color: theme.palette.secondary.main },
    },
    storySegments: {
      keyword: { color: theme.palette.primary.main },
      primitive: { color: theme.palette.secondary.main },
    },
  },
})

export default theme
