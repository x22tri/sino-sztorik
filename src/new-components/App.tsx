import CssBaseline from '@mui/material/CssBaseline'
import { Landing } from './landing/Landing'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import Learn from './learn/Learn'
import LessonSelect from './lesson-select/LessonSelect'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { loadLearn } from './shared/route-loaders/loadLearn'
import { loadReview } from './shared/route-loaders/loadReview'
import LanguageContextProvider from './shared/localization/LanguageContext'
import { loadLessonSelect } from './shared/route-loaders/loadLessonSelect'
import { ErrorPage } from './error-page/ErrorPage'
import { AdminCharEdit } from './admin/admin-char-edit/AdminCharEdit'
import { loadAdminChar } from './shared/route-loaders/loadAdminChar'
import { AdminCharList } from './admin/admin-char-list/AdminCharList'
import { AdminDashboard } from './admin/admin-dashboard/AdminDashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: `/lessons/:lessonNumber?`,
    element: <LessonSelect />,
    errorElement: <div>An error occurred on LessonSelect</div>,
    loader: ({ params }) => loadLessonSelect({ params }),
  },
  {
    path: `/learn`,
    element: <Learn />,
    errorElement: <div>An error occurred on Learn</div>,
    loader: loadLearn,
  },
  {
    path: `/review/:lessonNumber`,
    element: <Learn />,
    errorElement: <div>An error occurred on Review</div>,
    loader: loadReview,
  },
  {
    path: `/admin`,
    children: [
      {
        path: '',
        element: <AdminDashboard />,
      },
      {
        path: `characters`,
        element: <AdminCharList />,
      },
      {
        path: `characters/:glyph`,
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
