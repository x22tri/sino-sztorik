import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'
import LessonSelect from './lesson-select/LessonSelect'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import { LessonSelectAppbar } from './toolbar/AppbarWrapper'
import { LearnAppbar } from './learn/learn-appbar/LearnAppbar'
import Learn from './learn/Learn'

function App() {
  return (
    <>
      {/* <Landing /> */}
      <ThemeProvider {...{ theme }}>
        <CssBaseline />
        {/* <LessonSelectAppbar /> */}
        {/* <LessonSelect /> */}
        <Learn />
      </ThemeProvider>
    </>
  )
}

export default App
