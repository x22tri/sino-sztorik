import { useState } from 'react'

import AuthContext from '../context/AuthContext'
import useAuth from '../auxiliaries/useAuth'

import Learn from './Learn'
import Admin from './Admin'
import AuthPage from './AuthPage'
import LessonSelect from './LessonSelect'
import MainPage from './MainPage'
import AdminMainMenu from './admin-components/AdminMainMenu'
import AllLessons from './admin-components/AllLessons'
import LessonEditor from './admin-components/LessonEditor'
import CharacterList from './admin-components/CharacterList'
import { CharacterEditScreen } from './admin-components/CharacterEditScreen'
import PhraseOrOtherUseList from './admin-components/PhraseOrOtherUseList'
import SimilarList from './admin-components/SimilarList'

import { Routes, Route, Navigate } from 'react-router-dom'

import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { darkTheme, lightTheme } from '../auxiliaries/theme'

function App() {
  const { loggedInUser, token, login, logout } = useAuth()
  const [dark, setDark] = useState(false)
  const themeToggle = () => setDark(prevMode => !prevMode)

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthContext.Provider
        value={{ ...{ loggedInUser, token, login, logout } }}
      >
        <Routes>
          {loggedInUser ? ( // Authenticated route
            <>
              <Route path='/' element={<LessonSelect {...{ themeToggle }} />} />
              <Route path='/learn' element={<Learn {...{ themeToggle }} />} />
              <Route
                path='/review/:lessonNumberToReview'
                element={<Learn {...{ themeToggle }} />}
              />
              <Route path='/admin' element={<Admin {...{ themeToggle }} />}>
                <Route path='' element={<AdminMainMenu />} />
                <Route path='lesson-list' element={<AllLessons />} />
                <Route path='lesson/:lessonId' element={<LessonEditor />} />
                <Route
                  path='character-list/:lessonId'
                  element={<CharacterList />}
                />
                <Route
                  path='character/:charId'
                  element={<CharacterEditScreen />}
                />
                <Route
                  path='phrase-list'
                  element={<PhraseOrOtherUseList type='phrase' />}
                />
                <Route
                  path='other-use-list'
                  element={<PhraseOrOtherUseList type='other-use' />}
                />
                <Route
                  path='similar-list/meaning'
                  element={<SimilarList type='meaning' />}
                />
                <Route
                  path='similar-list/appearance'
                  element={<SimilarList type='appearance' />}
                />
              </Route>
              <Route path='/continue' element={<Navigate to='/learn' />} />
              <Route path='*' element={<Navigate to='/' />} />
            </>
          ) : (
            // Unauthenticated route
            <>
              <Route path='/' element={<MainPage {...{ themeToggle }} />} />
              <Route path='/auth' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/' />} />
            </>
          )}
        </Routes>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App
