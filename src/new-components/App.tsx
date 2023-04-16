import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import Learn from './learn/Learn'
import LessonSelect from './lesson-select-new/LessonSelect'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LessonSelect />,
    errorElement: <div>An error occurred on LessonSelect</div>,
  },
  {
    path: '/learn',
    element: <Learn />,
    errorElement: <div>An error occurred on Learn</div>,
  },
])

function App() {
  return (
    <>
      {/* <Landing /> */}
      <ThemeProvider {...{ theme }}>
        <CssBaseline />
        <RouterProvider {...{ router }} />
      </ThemeProvider>
    </>
  )
}

export default App
