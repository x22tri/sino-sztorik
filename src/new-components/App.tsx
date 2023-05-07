import CssBaseline from '@mui/material/CssBaseline'
import Landing from './Landing'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import Learn from './learn/Learn'
import LessonSelect from './lesson-select-new/LessonSelect'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { loadLearn } from './shared/logic/loadLearn'
import { LEARN_PATH, REVIEW_PATH, ROOT_PATH } from './shared/paths'
import { loadReview } from './shared/logic/loadReview'

const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <LessonSelect />,
    errorElement: <div>An error occurred on LessonSelect</div>,
  },
  {
    path: LEARN_PATH,
    element: <Learn />,
    errorElement: <div>An error occurred on Learn</div>,
    loader: loadLearn,
  },
  {
    path: `${REVIEW_PATH}/:lessonNumber`,
    element: <Learn />,
    errorElement: <div>An error occurred on Review</div>,
    loader: loadReview,
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
