import React, { createContext, useEffect, useReducer, useContext } from 'react'
import axios from 'axios'
import { initialState, marketDataReducer } from 'state/reducers/marketDataReducer'
import { setMarketData } from 'state/actions/setMarketData'
import { UserContext } from 'state/contexts/UserContext'

export const MarketDataContext = createContext()

const MarketDataProvider = ({children}) => {

    const [marketData, marketDataDispatch] = useReducer(marketDataReducer, initialState)
    
    const { settings } = useContext(UserContext)

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')
            .then(res => {
                const data = res.data.market_data
                marketDataDispatch(setMarketData(data))
            })
    },[settings.currency])


    return (
        <MarketDataContext.Provider
            value={{
                marketData
            }}
        >
            {children}
        </MarketDataContext.Provider>
    )
}

export default MarketDataProvider
