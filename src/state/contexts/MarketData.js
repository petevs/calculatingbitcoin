import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { initialState, marketDataReducer } from 'state/reducers/marketDataReducer'
import { setMarketData } from 'state/actions/setMarketData'

export const MarketDataContext = createContext()

const MarketDataProvider = ({children}) => {

    const [marketData, marketDataDispatch] = useReducer(marketDataReducer, initialState)

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')
            .then(res => {
                const data = res.data.market_data
                marketDataDispatch(setMarketData(data))
            })
    },[])


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
