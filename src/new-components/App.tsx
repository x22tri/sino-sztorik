import CssBaseline from '@mui/material/CssBaseline'
import { Landing } from './landing/Landing'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import Learn from './learn/Learn'
import LessonSelect from './lesson-select/LessonSelect'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { loadLearn } from './shared/logic/loadLearn'
import { LEARN_PATH, LESSON_SELECT_PATH, REVIEW_PATH, ROOT_PATH } from './shared/paths'
import { loadReview } from './shared/logic/loadReview'
import LanguageContextProvider from './shared/localization/LanguageContext'
import { loadLessonSelect } from './shared/logic/loadLessonSelect'
import { ErrorPage } from './error-page/ErrorPage'

const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: LESSON_SELECT_PATH,
    element: <LessonSelect />,
    errorElement: <div>An error occurred on Learn</div>,
    loader: loadLessonSelect,
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
    <ThemeProvider {...{ theme }}>
      <LanguageContextProvider>
        <CssBaseline />
        <RouterProvider {...{ router }} />
      </LanguageContextProvider>
    </ThemeProvider>
  )
}

export default App
