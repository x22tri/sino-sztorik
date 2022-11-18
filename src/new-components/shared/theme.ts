import { createTheme } from '@mui/material/styles'
import { blue, deepOrange, grey } from '@mui/material/colors'
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'
import { indigo } from '@material-ui/core/colors'

const genericFont = "'Noto Sans', sans-serif"
const emphasisFont = "'Montserrat', sans-serif"

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
      fontFamily: genericFont,
      h4: {
        fontFamily: emphasisFont,
        fontWeight: 800,
        fontSize: 24,
      },
      h5: {
        fontFamily: emphasisFont,
        fontWeight: 600,
      },
      h6: {
        fontFamily: emphasisFont,
        fontWeight: 600,
      },
      button: {
        fontFamily: emphasisFont,
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
      },
      background: {
        default: grey[50],
      },
    },
  })
)

export default theme
