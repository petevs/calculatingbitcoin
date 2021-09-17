import React, { createContext, useState, useReducer } from 'react'
import { userReducer, initialState } from 'state/reducers/userReducer'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [settings, settingsDispatch] = useReducer(userReducer, initialState)

    return (
        <UserContext.Provider
            value={{
                settings,
                settingsDispatch
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
