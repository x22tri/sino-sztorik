import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import Learn from './learn/Learn'
import LessonSelect from './lesson-select-new/LessonSelect'

function App() {
  return (
    <>
      {/* <Landing /> */}
      <ThemeProvider {...{ theme }}>
        <CssBaseline />
        <LessonSelect />
        {/* <Learn /> */}
      </ThemeProvider>
    </>
  )
}

export default App
