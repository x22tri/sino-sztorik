import { createContext } from "react";

const AuthContext = createContext({
    loggedInUser: null,
    token: null,
    login: () => {}, 
    logout: () => {}
})

export default AuthContext