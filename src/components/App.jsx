import { useState } from "react";

import AuthContext from "../context/auth-context";
import useAuth from "../auxiliaries/useAuth";
import useEventListener from "../auxiliaries/useEventListener";

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
import PhraseOrOtherUseList from "./admin-components/PhraseOrOtherUseList";
import SimilarList from "./admin-components/SimilarList";

import { Routes, Route, Navigate } from "react-router-dom";

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from "../auxiliaries/theme";

function App() {
    // Importing variables related to authentication.
    const { loggedInUser, token, login, logout } = useAuth()

    // Setting up useState for the "dark" flag for light/dark mode.
    const [dark, setDark] = useState(false);
    const themeToggle = () => setDark(prevMode => !prevMode)

    useEventListener('keydown', ({ key }) => {if (key === 't') themeToggle()})

    // Setting up the routes for when the user is authenticated and not authenticated.
    let mainContentRoutes
    if (loggedInUser) {
        mainContentRoutes = (
            <>
            <Route path="/" element={<LessonSelect {...{themeToggle}} />} />
            <Route path="/learn" element={<Learn {...{themeToggle}} />} />
            <Route path="/review/:lessonNumberToReview" element={<Learn {...{themeToggle}} />} />
            <Route path="/admin" element={<Admin {...{themeToggle}} />} >
                <Route path="" element={<AdminMainMenu />} />
                <Route path="lesson-list" element={<AllLessons />} />
                <Route path="lesson/:lessonId" element={<LessonEditor />} />
                <Route path="character-list/:lessonId" element={<CharacterList />} />
                <Route path="character/:charId" element={<CharacterEditScreen />} />
                <Route path="phrase-list" element={<PhraseOrOtherUseList type='phrase' />} />
                <Route path="other-use-list" element={<PhraseOrOtherUseList type='other-use' />} />
                <Route path="similar-list/meaning" element={<SimilarList type='meaning' />} />
                <Route path="similar-list/appearance" element={<SimilarList type='appearance' />} />
            </Route>
            <Route path="/continue" element={<Navigate to="/learn" />} />
            <Route path="*" element={<Navigate to="/" />} />
            </>
        )
    } else {
        mainContentRoutes = (
            <>
            <Route path="/" element={<MainPage {...{themeToggle}} />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            </>
        )
    }

    return (
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <CssBaseline />
            <AuthContext.Provider value={{...{loggedInUser, token, login, logout} }}>
                <Routes>
                    {mainContentRoutes}
                </Routes>
            </AuthContext.Provider>
        </ThemeProvider>
    )
}

export default App