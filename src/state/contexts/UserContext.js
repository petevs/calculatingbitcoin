import React, { createContext,  useReducer, useEffect, useContext } from 'react'
import { userReducer, initialState } from 'state/reducers/userReducer'
import { portfolioReducer, initialPortfolio } from 'state/reducers/portfolioReducer'
import { updatePortfolioTransactions } from 'state/actions/updatePortfolio'
import { db } from 'firebase'
import { AuthContext } from './Auth'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const { user } = useContext(AuthContext)

    const [settings, settingsDispatch] = useReducer(userReducer, initialState)
    const [portfolio, portfolioDispatch] = useReducer(portfolioReducer, initialPortfolio)

    useEffect(() => {
        db.collection('users').doc(user.uid).collection('transactions').onSnapshot(snapshot => {
            portfolioDispatch(updatePortfolioTransactions(snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data}
                })
            ))
        })
    },[])


    return (
        <UserContext.Provider
            value={{
                settings,
                settingsDispatch,
                portfolio,
                portfolioDispatch
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
