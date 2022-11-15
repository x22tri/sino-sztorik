import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'
import LessonSelect from './lesson-select/LessonSelect'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'

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
