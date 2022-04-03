import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [token, setToken] = useState(null)

    const login = useCallback((user, token) => {
        setLoggedInUser(user)
        setToken(token)
        localStorage.setItem('userData', JSON.stringify({userId: user, token: token}))
    }, [])

    const logout = useCallback(() => {
        setLoggedInUser(null)
        setToken(null)
        localStorage.removeItem('userData')
    }, [])

    // Setting up auto-login.
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (storedData && storedData.token) {
        login(storedData.userId, storedData.token)
        }
    }, [login])

    return { loggedInUser, token, login, logout }
}

export default useAuth