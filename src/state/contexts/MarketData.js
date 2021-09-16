import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const MarketDataContext = createContext()

const MarketDataProvider = ({children}) => {

    const [marketData, setMarketData] = useState(null)

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?localization=cad')
            .then(res => {
                const data = res.data.market_data
                setMarketData(data)
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
