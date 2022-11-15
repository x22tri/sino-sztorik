import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'
import LessonSelect from './lesson-select/LessonSelect'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import AppbarWrapper from './toolbar/AppbarWrapper'

function App() {
  return (
    <>
      <CssBaseline />
      {/* <Landing /> */}
      <ThemeProvider {...{ theme }}>
        <AppbarWrapper />
        <LessonSelect />
      </ThemeProvider>
    </>
  )
}

export default App
