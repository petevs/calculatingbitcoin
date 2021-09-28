import React, { createContext,  useReducer, useEffect, useContext } from 'react'
import axios from 'axios'

//DB
import { db } from 'firebase'

//CONTEXTS
import { AuthContext } from './Auth'

//REDUCERS
import { userReducer, initialState } from 'state/reducers/userReducer'
import { portfolioReducer, initialPortfolio } from 'state/reducers/portfolioReducer'
import { calculatorReducer, initialCalculators } from 'state/reducers/calculatorReducer'

//ACTIONS
import { updatePortfolioTransactions } from 'state/actions/updatePortfolio'
import { updateDcaHistoricalData } from 'state/actions/updateCalculators'
import { updatePriceHistory } from 'state/actions/updatePortfolio'


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
    },[user.uid])

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${settings.currency}&days=3650&interval=daily`)
            .then((res) => {
            const data = res.data.prices;
            calculatorsDispatch(updateDcaHistoricalData(data))
            portfolioDispatch(updatePriceHistory(data))
            })
    },[settings.currency])


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
