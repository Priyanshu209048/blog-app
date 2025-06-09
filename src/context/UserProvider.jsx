import React, { useEffect } from "react"
import userContext from "./userContext"
import { useState } from "react"
import { getCurrentUser, isLoggedIn } from "../auth"

function UserProvider({children}) {

    const [user, setUser] = useState({
        data: {},
        login: false
    })

    //If we don't write this then user then details set to null after refresh the page and the delete and update button will not be visible
    useEffect(() => {
        setUser({
            data: getCurrentUser(),
            login: isLoggedIn()
        })
    }, [])

    return(
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider