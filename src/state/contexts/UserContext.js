import React, { createContext,  useReducer, useEffect, useContext, useState } from 'react'

//LIBRARIES
import axios from 'axios'
import { Backdrop, CircularProgress } from "@mui/material";

//DB
import { db } from 'firebase'

//CONTEXTS
import { AuthContext } from './Auth'

//REDUCERS
import { userReducer, initialState } from 'state/reducers/userReducer'
import { portfolioReducer, initialPortfolio } from 'state/reducers/portfolioReducer'
import { calculatorReducer, initialCalculators } from 'state/reducers/calculatorReducer'
import { marketDataReducer, initialMarketData } from 'state/reducers/marketDataReducer'
import { setMarketData, updateDailyPrices } from 'state/actions/updateMarketData'

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
    const [marketData, marketDataDispatch] = useReducer(marketDataReducer, initialMarketData)

    const [pending, setPending] = useState(true);


    //GET & SET USER TRANSACTIONS
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


    //GET & SET CURRENT MARKET DATA
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')
            .then(res => {
                const data = res.data.market_data
                marketDataDispatch(setMarketData(data))
            })

        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${settings.currency}&days=3650&interval=daily`)
            .then((res) => {
            const data = res.data.prices;
            calculatorsDispatch(updateDcaHistoricalData(data))
            portfolioDispatch(updatePriceHistory(data))
            marketDataDispatch(updateDailyPrices(data))
            })
            setPending(false)
    },[settings.currency])

    if (pending) {
        return (
        <Backdrop sx={{ backgroundColor: 'black'}} open>
          <CircularProgress />
        </Backdrop>);
      }
    


    return (
        <UserContext.Provider
            value={{
                settings,
                settingsDispatch,
                portfolio,
                portfolioDispatch,
                calculators,
                calculatorsDispatch,
                marketData,
                marketDataDispatch
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
