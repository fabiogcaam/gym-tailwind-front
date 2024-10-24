import { createContext, useState, useEffect } from "react"
import authService from "./../services/auth.services"

const AuthContext = createContext()

function AuthProviderWraper(props) {

    const [loggedUser, setLoggedUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authUser
    }, [])

    function authUser() {
        const token = localStorage.getItem('authToken')

        token ?

            authService
                .verify(token)
                .then(({ data }) => {
                    setLoggedUser(data.loggedUser)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))

            :

            logout()
    }

    function logout() {

        localStorage.removeItem('authToken')
        setLoggedUser(null)
        setIsLoading(false)

    }

    return (
        <AuthContext.Provider value={{ loggedUser, isLoading, authUser, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWraper, AuthContext }