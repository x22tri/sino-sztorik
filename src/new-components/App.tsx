import CssBaseline from '@mui/material/CssBaseline'
import { Landing } from './landing/Landing'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import Learn from './learn/Learn'
import LessonSelect from './lesson-select/LessonSelect'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { loadLearn } from './shared/route-loaders/loadLearn'
import { loadReview } from './shared/route-loaders/loadReview'
import LanguageContextProvider from './shared/localization/LanguageContext'
import { loadLessonSelect } from './shared/route-loaders/loadLessonSelect'
import { ErrorPage } from './error-page/ErrorPage'
import { loadCharEdit } from './shared/route-loaders/loadCharEdit'
import { AdminCharList } from './admin/admin-char-list/AdminCharList'
import { AdminDashboard } from './admin/admin-dashboard/AdminDashboard'
import { AdminLessonList } from './admin/admin-lesson-list/AdminLessonList'
import { AdminLessonEdit } from './admin/admin-lesson-edit/AdminLessonEdit'
import { loadLessonEdit } from './shared/route-loaders/loadLessonEdit'
import { Overview } from './admin/admin-char-edit/overview/Overview'
import { BaseInfo } from './admin/admin-char-edit/base-info/BaseInfo'
import { OtherUses } from './admin/admin-char-edit/other-uses/OtherUses'
import { Constituents } from './admin/admin-char-edit/constituents/Constituents'
import { Story } from './admin/admin-char-edit/story/Story'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/lessons/:lessonNumber?',
    element: <LessonSelect />,
    errorElement: <div>An error occurred on LessonSelect</div>,
    loader: ({ params }) => loadLessonSelect({ params }),
  },
  {
    path: '/learn',
    element: <Learn />,
    errorElement: <div>An error occurred on Learn</div>,
    loader: loadLearn,
  },
  {
    path: '/review/:lessonNumber',
    element: <Learn />,
    errorElement: <div>An error occurred on Review</div>,
    loader: loadReview,
  },
  {
    path: '/admin',
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'characters',
        children: [
          {
            index: true,
            element: <AdminCharList />,
          },
          {
            path: ':glyph',
            loader: ({ params }) => loadCharEdit({ params }),
            id: 'charEdit',
            children: [
              {
                index: true,
                element: <Overview />,
              },
              {
                path: 'base-info',
                element: <BaseInfo />,
                action: async ({ params, request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect(`/admin/characters/${encodeURI(params.glyph!)}`)
                },
              },
              {
                path: 'constituents',
                element: <Constituents />,
                action: async ({ params, request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect(`/admin/characters/${encodeURI(params.glyph!)}`)
                },
              },
              {
                path: 'other-uses',
                element: <OtherUses />,
                action: async ({ params, request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect(`/admin/characters/${encodeURI(params.glyph!)}`)
                },
              },
              {
                path: 'story/:tier',
                element: <Story />,
                action: async ({ params, request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect(`/admin/characters/${encodeURI(params.glyph!)}`)
                },
              },
            ],
          },
        ],
      },
      { path: 'lessons', element: <AdminLessonList /> },
      {
        path: 'lessons/:lessonNumber',

        loader: ({ params }) => loadLessonEdit({ params }),
        id: 'lessonEdit',
        children: [{ index: true, element: <AdminLessonEdit /> }],
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
