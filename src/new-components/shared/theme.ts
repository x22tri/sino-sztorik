import { CSSProperties } from 'react'
import { createTheme } from '@mui/material/styles'
import { common, grey } from '@mui/material/colors'
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
      bottomToolbarHeight: `${number}px`
      maxContentWidth: `${number}px`
      synapsesBackground: string
    }
  }

  interface ThemeOptions {
    constants?: {
      animationDuration?: `${number}ms`
      boxShadow?: string
      drawerWidth?: number
      bottomToolbarHeight?: `${number}px`
      maxContentWidth?: `${number}px`
      synapsesBackground?: string
    }
  }

  interface Palette {
    neutral: Palette['primary']
    white: Palette['primary']
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
    white: PaletteOptions['primary']
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
    50?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    700?: string
    800?: string
  }

  interface SimplePaletteColorOptions {
    50?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    700?: string
    800?: string
  }

  interface TypographyVariants {
    chineseText: CSSProperties
    pinyin: CSSProperties
    titleSubtitle: { title: CSSProperties; subtitle: CSSProperties }
  }

  // Allows configuration using `createTheme`.
  interface TypographyVariantsOptions {
    chineseText?: CSSProperties
    pinyin?: CSSProperties
    titleSubtitle?: { title: CSSProperties; subtitle: CSSProperties }
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
    white: true
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
    chineseText: true
    pinyin: true
  }
}

let theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiButton: { defaultProps: { disableElevation: true } },
      MuiButtonGroup: { defaultProps: { disableElevation: true, disableRipple: true } },
      MuiLink: { defaultProps: { underline: 'none' } },
      MuiIconButton: { styleOverrides: { root: { '&:hover': { backgroundColor: 'transparent', opacity: 0.8 } } } },
      MuiTooltip: {
        styleOverrides: { tooltip: { [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: 2 } } },
      },
    },
    constants: {
      animationDuration: '150ms',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 15px -3px',
      drawerWidth: 300,
      maxContentWidth: '1600px',
      synapsesBackground: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%232B57AE' stroke-width='1.7'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%232B58AF'%3E%3Ccircle cx='769' cy='229' r='7'/%3E%3Ccircle cx='539' cy='269' r='7'/%3E%3Ccircle cx='603' cy='493' r='7'/%3E%3Ccircle cx='731' cy='737' r='7'/%3E%3Ccircle cx='520' cy='660' r='7'/%3E%3Ccircle cx='309' cy='538' r='7'/%3E%3Ccircle cx='295' cy='764' r='7'/%3E%3Ccircle cx='40' cy='599' r='7'/%3E%3Ccircle cx='102' cy='382' r='7'/%3E%3Ccircle cx='127' cy='80' r='7'/%3E%3Ccircle cx='370' cy='105' r='7'/%3E%3Ccircle cx='578' cy='42' r='7'/%3E%3Ccircle cx='237' cy='261' r='7'/%3E%3Ccircle cx='390' cy='382' r='7'/%3E%3C/g%3E%3C/svg%3E")`,
    },
    typography: {
      fontFamily: latinFont,
      h2: { fontWeight: 'bold', fontSize: 56 },
      h4: { fontWeight: 'bold', fontSize: 24 },
      h5: { fontSize: 18 },
      h6: { fontSize: 14 },
      button: { fontWeight: 'bold', textTransform: 'none' },
      chineseText: { fontFamily: chineseFont, fontSize: 24, fontWeight: 400, lineHeight: 1.2 },
      overline: { fontWeight: 'bold' },
      pinyin: { fontSize: 14, fontStyle: 'italic' },
      titleSubtitle: {
        title: { fontWeight: 'bold', fontSize: 13, lineHeight: 1 },
        subtitle: { fontWeight: 'bold', lineHeight: 1 },
      },
    },
    palette: {
      primary: {
        main: '#3366CC',
        50: '#EFF3FB',
        100: '#DDE8FF',
        200: '#C4D6FD',
        300: '#82A1E5',
        400: '#6598FF',
        500: '#2952A3',
        700: '#1A3F87',
        800: '#183162',
      },
      secondary: { main: '#7613B8', 100: '#F6EDFD', 200: '#EEDAFB', 300: '#C37EF1', 400: '#A134EA' },
      neutral: { main: grey[600], contrastText: grey[50], light: grey[200] },
      white: { main: common.white, contrastText: grey[900] },
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
    MuiButton: {
      styleOverrides: { root: { borderRadius: theme.spacing(6) } },
      variants: [
        { props: { variant: 'outlined' }, style: { borderWidth: '2px', ':hover': { borderWidth: '2px' } } },
        { props: { color: 'primary' }, style: { borderColor: theme.palette.primary.main } },
        { props: { color: 'white' }, style: { borderColor: theme.palette.white.main } },
        {
          props: { color: 'white', variant: 'contained' },
          style: { ':hover': { color: theme.palette.primary.main } },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: theme.constants.animationDuration,
          ':hover': { cursor: 'pointer', backgroundColor: theme.palette.primary[100] },
        },
      },
      variants: [{ props: { color: 'secondary' }, style: { ':hover': { backgroundColor: theme.palette.secondary[100] } } }],
    },
    MuiPopover: { styleOverrides: { paper: { borderRadius: theme.spacing(1.5), boxShadow: theme.constants.boxShadow } } },
  },
  constants: { bottomToolbarHeight: theme.spacing(8) },
})

export default theme
