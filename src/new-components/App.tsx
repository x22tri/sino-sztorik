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
import { AdminCharList } from './admin/char-list/CharList'
import { AdminDashboard } from './admin/dashboard/Dashboard'
import { AdminLessonList } from './admin/lesson-list/LessonList'
import { AdminLessonEdit } from './admin/lesson-edit/LessonEdit'
import { loadLessonEdit } from './shared/route-loaders/loadLessonEdit'
import { CharEdit } from './admin/char-edit/CharEdit'
import { BaseInfo as CharBaseInfo } from './admin/char-edit/base-info/BaseInfo'
import { OtherUses } from './admin/char-edit/other-uses/OtherUses'
import { Constituents } from './admin/char-edit/constituents/Constituents'
import { Story } from './admin/char-edit/story/Story'
import { BaseInfo as LessonBaseInfo } from './admin/lesson-edit/base-info/BaseInfo'
import { Characters } from './admin/lesson-edit/characters/Characters'
import { loadCharacters } from './shared/route-loaders/loadCharacters'

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
                element: <CharEdit />,
              },
              {
                path: 'base-info',
                element: <CharBaseInfo />,
                action: async ({ request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect('..')
                },
              },
              {
                path: 'constituents',
                element: <Constituents />,
                action: async ({ request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect('..')
                },
              },
              {
                path: 'other-uses',
                element: <OtherUses />,
                action: async ({ request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect('..')
                },
              },
              {
                path: 'story/:tier',
                element: <Story />,
                action: async ({ request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect('..')
                },
              },
            ],
          },
        ],
      },
      {
        path: 'lessons',
        children: [
          {
            index: true,
            element: <AdminLessonList />,
          },
          {
            path: ':lessonNumber',
            loader: ({ params }) => loadLessonEdit({ params }),
            id: 'lessonEdit',
            children: [
              {
                index: true,
                element: <AdminLessonEdit />,
              },
              {
                path: 'base-info',
                element: <LessonBaseInfo />,
                action: async ({ request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect('..')
                },
              },
              {
                path: 'characters',
                element: <Characters />,
                loader: ({ params }) => loadCharacters({ params }),
              },
              {
                path: 'preface/:tier',
                element: <></>,
              },
            ],
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
