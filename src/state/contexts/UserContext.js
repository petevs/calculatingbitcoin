import React, { createContext,  useReducer, useEffect, useContext } from 'react'
import { userReducer, initialState } from 'state/reducers/userReducer'
import { portfolioReducer, initialPortfolio } from 'state/reducers/portfolioReducer'
import { updatePortfolioTransactions } from 'state/actions/updatePortfolio'
import { db } from 'firebase'
import { AuthContext } from './Auth'
import { calculatorReducer, initialCalculators } from 'state/reducers/calculatorReducer'
import { updatePriceHistory } from 'state/actions/updatePortfolio'
import axios from 'axios'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const { user } = useContext(AuthContext)

    const [settings, settingsDispatch] = useReducer(userReducer, initialState)
    const [portfolio, portfolioDispatch] = useReducer(portfolioReducer, initialPortfolio)
    const [calculators, calculatorsDispatch] = useReducer(calculatorReducer, initialCalculators)

    useEffect(() => {
        db.collection('users').doc(user.uid).collection('transactions').orderBy('date', 'desc').onSnapshot(snapshot => {
            portfolioDispatch(updatePortfolioTransactions(snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data}
                })
            ))
        })
    },[])

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=cad&from=1588140000&to=1632492624`)
              .then((res) => {
                const data = res.data.prices;
                portfolioDispatch(updatePriceHistory(data))
              })}
    ,[])


    return (
        <UserContext.Provider
            value={{
                settings,
                settingsDispatch,
                portfolio,
                portfolioDispatch,
                calculators,
                calculatorsDispatch
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
