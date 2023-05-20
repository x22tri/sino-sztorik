import { CSSProperties } from 'react'
import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'
import { tooltipClasses } from '@mui/material'

const chineseFont = "'Noto Sans SC', sans-serif" // To-Do: Create font with custom chars
const latinFont = "'Rubik', sans-serif"

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
    frequency: {
      veryCommon: string
      quiteCommon: string
      common: string
      uncommon: string
      rare: string
      veryRare: string
    }
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary']
    frequency: {
      veryCommon: string
      quiteCommon: string
      common: string
      uncommon: string
      rare: string
      veryRare: string
    }
  }

  interface PaletteColor {
    100?: string
    200?: string
    300?: string
    400?: string
  }

  interface SimplePaletteColorOptions {
    100?: string
    200?: string
    300?: string
    400?: string
  }

  interface StorySegmentVariants {
    keyword: CSSProperties
    primitive: CSSProperties
    constituent: CSSProperties
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

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
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
      MuiLink: { defaultProps: { underline: 'none' } },
      MuiContainer: { styleOverrides: { root: { paddingLeft: 0, paddingRight: 0 } } },
      MuiIconButton: { styleOverrides: { root: { '&:hover': { backgroundColor: 'transparent', opacity: 0.8 } } } },
    },
    constants: {
      animationDuration: '150ms',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 15px -3px',
      drawerWidth: 300,
      maxContentWidth: '1600px',
    },
    typography: {
      fontFamily: latinFont,
      h4: { fontFamily: latinFont, fontWeight: 800, fontSize: 24 },
      h5: { fontFamily: latinFont, fontWeight: 600, fontSize: 18 },
      h6: { fontFamily: latinFont, fontWeight: 600, fontSize: 14 },
      button: { fontWeight: 'bold', textTransform: 'none' },
      body1: { lineHeight: 1.5 },
      body2: { fontSize: 14 },
      chineseHeading: { fontFamily: chineseFont, fontSize: 120, fontWeight: 400, lineHeight: 1 },
      chineseNormal: { fontFamily: chineseFont, fontSize: 24, fontWeight: 400, lineHeight: 1.2 },
      overline: { fontWeight: 'bold' },
      presentation: {
        keyword: { fontFamily: latinFont, fontWeight: 800, fontSize: 32, lineHeight: 1.1 },
        primitive: { fontSize: 20, fontFamily: latinFont, fontStyle: 'italic', lineHeight: 1.2 },
        pinyin: { fontSize: 14, fontStyle: 'italic' },
      },
      storySegments: {
        keyword: { fontWeight: 900 },
        primitive: { fontWeight: 'bold', fontStyle: 'italic' },
        constituent: {},
      },
      subtitle2: { fontWeight: 400 },
      titleSubtitle: {
        title: { fontWeight: 900, fontSize: '80%', lineHeight: 1 },
        subtitle: { fontWeight: 'bold', lineHeight: 1 },
      },
    },
    palette: {
      primary: { main: '#3366CC', 100: '#DDE8FF', 200: '#C4D6FD', 300: '#7AA4FF', 400: '#6598FF' },
      secondary: { main: '#7613B8', 100: '#F6EDFD' },
      neutral: { main: grey[600], contrastText: grey[50], light: grey[200] },
      warning: { light: '#FFF4EA', main: '#ffa726', dark: '#D25B00' },
      background: { default: '#FDFDFD' },
      frequency: {
        veryCommon: '#d03738',
        quiteCommon: '#D26836',
        common: '#D17F36',
        uncommon: '#D7AF1F',
        rare: grey[700],
        veryRare: grey[500],
      },
    },
  })
)

theme = createTheme(theme, {
  components: {
    MuiBadge: { styleOverrides: { badge: { fontFamily: latinFont } } },
    MuiButton: {
      styleOverrides: { root: { borderRadius: theme.spacing(6) } },
      variants: [
        {
          props: { color: 'primary', variant: 'outlined' },
          style: {
            border: `2px solid ${theme.palette.primary.main}`,
            ':hover': { border: `2px solid ${theme.palette.primary.main}` },
          },
        },
      ],
    },
    MuiLinearProgress: {
      variants: [
        {
          props: { color: 'primary' },
          style: {
            '.MuiLinearProgress-bar': { backgroundColor: theme.palette.primary.main },
            backgroundColor: theme.palette.grey[100],
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: theme.constants.animationDuration,
          '&:hover': { cursor: 'pointer', backgroundColor: theme.palette.primary[100] },
        },
      },
    },
    MuiPopover: { styleOverrides: { paper: { borderRadius: theme.spacing(1.5), boxShadow: theme.constants.boxShadow } } },
    MuiTooltip: {
      styleOverrides: { tooltip: { [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: 2 } } },
    },
  },
  constants: { lessonStartHeight: theme.spacing(8) },
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
