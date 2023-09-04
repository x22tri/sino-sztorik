import CssBaseline from '@mui/material/CssBaseline'
import { Landing } from './landing/Landing'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import Learn from './learn/Learn'
import LessonSelect from './lesson-select/LessonSelect'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { loadLearn } from './shared/logic/loadLearn'
import { ADMIN_CHARACTERS_SUBPATH, ADMIN_PATH, LEARN_PATH, LESSON_SELECT_PATH, REVIEW_PATH, ROOT_PATH } from './shared/paths'
import { loadReview } from './shared/logic/loadReview'
import LanguageContextProvider from './shared/localization/LanguageContext'
import { loadLessonSelect } from './shared/logic/loadLessonSelect'
import { ErrorPage } from './error-page/ErrorPage'
import { AdminCharEdit } from './admin/admin-char-edit/AdminCharEdit'
import { loadAdminChar } from './shared/logic/loadAdminChar'

const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${LESSON_SELECT_PATH}/:lessonNumber?`,
    element: <LessonSelect />,
    errorElement: <div>An error occurred on LessonSelect</div>,
    loader: ({ params }) => loadLessonSelect({ params }),
  },
  {
    path: `${LEARN_PATH}`,
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
  {
    path: `${ADMIN_PATH}`,
    children: [
      {
        path: `${ADMIN_PATH}${ADMIN_CHARACTERS_SUBPATH}`,
        children: [
          {
            path: `${ADMIN_PATH}${ADMIN_CHARACTERS_SUBPATH}/:glyph`,
            element: <AdminCharEdit />,
            action: async ({ params, request }) => {
              let formData = Object.fromEntries(await request.formData())
              console.log(formData)
              return null
            },
            loader: ({ params }) => loadAdminChar({ params }),
          },
        ],
      },
    ],
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
