import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'
import LessonSelect from './lesson-select/LessonSelect'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import { LessonSelectAppbar } from './lesson-select/lesson-select-appbar/LessonSelectAppbar'
import { LearnAppbar } from './learn/learn-appbar/LearnAppbar'
import Learn from './learn/Learn'
import LessonSelectNew from './lesson-select-new/LessonSelectNew'

function App() {
  return (
    <>
      {/* <Landing /> */}
      <ThemeProvider {...{ theme }}>
        <CssBaseline />
        {/* <LessonSelectAppbar /> */}
        {/* <LessonSelect /> */}
        <LessonSelectNew />
        {/* <Learn /> */}
      </ThemeProvider>
    </>
  )
}

export default App
