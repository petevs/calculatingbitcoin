import React, { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [currency, setCurrency] = useState('usd')



    return (
        <UserContext.Provider
            value={{
                currency
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
