import { createTheme } from '@mui/material/styles'
import { blue, deepOrange } from '@mui/material/colors'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'

const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    typography: {
      fontFamily: "'Noto Sans', sans-serif",
      h5: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
      },
      h6: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
      },
      button: {
        fontFamily: "'Montserrat', sans-serif",
      },
    },
    palette: {
      primary: {
        main: blue[800],
      },
      secondary: {
        main: deepOrange[500],
        dark: deepOrange[700],
      },
      background: {
        default: '#EBF8FF',
      },
    },
  })
)

export default theme
