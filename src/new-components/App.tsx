import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'
import LessonSelect from './lesson-select/LessonSelect'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import AppbarWrapper from './toolbar/AppbarWrapper'
import Learn from './learn/Learn'

function App() {
  return (
    <>
      {/* <Landing /> */}
      <ThemeProvider {...{ theme }}>
        <CssBaseline />
        <AppbarWrapper />
        <LessonSelect />
        {/* <Learn /> */}
      </ThemeProvider>
    </>
  )
}

export default App
