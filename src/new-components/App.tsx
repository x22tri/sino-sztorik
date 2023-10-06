import CssBaseline from '@mui/material/CssBaseline'
import { Landing } from './landing/Landing'

import { ThemeProvider } from '@mui/material/styles'
import theme from './shared/theme'
import Learn from './learn/Learn'
import LessonSelect from './lesson-select/LessonSelect'
import { Navigate, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { loadLearn } from './shared/route-loaders/loadLearn'
import { loadReview } from './shared/route-loaders/loadReview'
import LanguageContextProvider from './shared/localization/LanguageContext'
import { loadLessonSelect } from './shared/route-loaders/loadLessonSelect'
import { ErrorPage } from './error-page/ErrorPage'
import { AdminCharEdit } from './admin/admin-char-edit/AdminCharEdit'
import { loadCharEdit } from './shared/route-loaders/loadCharEdit'
import { AdminCharList } from './admin/admin-char-list/AdminCharList'
import { AdminDashboard } from './admin/admin-dashboard/AdminDashboard'
import { AdminLessonList } from './admin/admin-lesson-list/AdminLessonList'
import { AdminLessonEdit } from './admin/admin-lesson-edit/AdminLessonEdit'
import { loadLessonEdit } from './shared/route-loaders/loadLessonEdit'
import { CharForm } from './admin/admin-char-edit/char-form/CharForm'
import { loadCharForm } from './shared/route-loaders/loadCharForm'
import { loadCharTimeline } from './shared/route-loaders/loadCharTimeline'
import { Timeline } from './admin/admin-char-edit/admin-content/timeline/Timeline'
import { Overview } from './admin/admin-char-edit/overview/Overview'
import { CharacterSection } from './admin/admin-char-edit/admin-content/sections/CharacterSection'
import { OtherUsesSection } from './admin/admin-char-edit/admin-content/sections/OtherUsesSection'
import { ConstituentsSection } from './admin/admin-char-edit/admin-content/sections/ConstituentsSection'

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
                element: <CharacterSection />,
                action: async ({ params, request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect(`/admin/characters/${encodeURI(params.glyph!)}`)
                },
              },
              {
                path: 'constituents',
                element: <ConstituentsSection />,
                action: async ({ params, request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect(`/admin/characters/${encodeURI(params.glyph!)}`)
                },
              },
              {
                path: 'other-uses',
                element: <OtherUsesSection />,
                action: async ({ params, request }) => {
                  console.log(await request.formData())
                  // To-Do: Send to backend, do backend validation, redirect only when 200
                  return redirect(`/admin/characters/${encodeURI(params.glyph!)}`)
                },
              },
            ],
          },
        ],
        // element: <AdminCharList />,
      },
      // {
      //   path: 'characters/:glyph',
      //   element: <Overview />,
      //   loader: ({ params }) => loadCharEdit({ params }),
      //   id: 'overview',
      //   children: [

      //   ]
      // },
      // {
      //   path: 'characters/:glyph/'
      // }
      // {
      //   path: 'characters/:glyph',
      //   element: <AdminCharEdit />,
      //   action: async ({ params, request }) => {
      //     let formData = Object.fromEntries(await request.formData())
      //     console.log(formData)
      //     return null
      //   },
      //   loader: ({ params }) => loadCharEdit({ params }),
      //   children: [
      //     {
      //       path: 'form/:step',
      //       element: (
      //         <form>
      //           <CharForm />
      //         </form>
      //       ),
      //       loader: ({ params }) => loadCharForm({ params }),
      //     },
      //     { path: 'timeline/:tier', element: <Timeline />, loader: ({ params }) => loadCharTimeline({ params }) },
      //     {
      //       path: '*',
      //       loader: ({ params }) => redirect(`/admin/characters/${encodeURI(params.glyph!)}/form/1`),
      //     },
      //     {
      //       path: '',
      //       element: <Overview />,
      //       // loader: ({ params }) => redirect(`/admin/characters/${encodeURI(params.glyph!)}/form/1`),
      //     },
      //   ],
      // },
      { path: 'lessons', element: <AdminLessonList /> },
      { path: 'lessons/:lessonNumber', element: <AdminLessonEdit />, loader: ({ params }) => loadLessonEdit({ params }) },
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
