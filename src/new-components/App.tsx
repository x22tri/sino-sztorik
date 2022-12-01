import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'
import LessonSelect from './lesson-select/LessonSelect'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import AppbarWrapper from './toolbar/AppbarWrapper'
import Box from '@mui/material/Box'

function App() {
  return (
    <>
      <CssBaseline />
      {/* <Landing /> */}
      <ThemeProvider {...{ theme }}>
        <Box
          sx={{
            backgroundColor: ({ palette }) => palette.background.default,
            height: '100vh',
          }}
        >
          <AppbarWrapper />
          <LessonSelect />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
