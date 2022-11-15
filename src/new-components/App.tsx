import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'
import LessonSelect from './lesson-select/LessonSelect'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue, deepOrange } from '@mui/material/colors'

const theme = createTheme({
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

function App() {
  return (
    <>
      <CssBaseline />
      {/* <Landing /> */}
      <ThemeProvider {...{ theme }}>
        <LessonSelect />
      </ThemeProvider>
    </>
  )
}

export default App
