import React, { useState } from 'react'
import axios from 'axios'
import Row from 'components/Row'

const DollarCostAverage = () => {

    const convertDate = (x) => {
        const theDate = new Date(x)
        return theDate.toString("MMM dd")
    }


    const getTimeBetweenDates = (x) => {
        const today = new Date()
        const start = new Date(x)

        const diff_in_time = today.getTime() - start.getTime()
        const diff_in_days = diff_in_time / (1000 * 3600 * 24)

        return Math.round(diff_in_days)
    }

    const [daysBtwn, setDaysBtwn] = useState(null)
    const [prices, setPrices] = useState([])

    const handleDateChange = (e) => {
        setDaysBtwn(getTimeBetweenDates(e.target.value))
    }


    const getValues = () => {

        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=${daysBtwn}&interval=daily`)
            .then(res => {
                const data = res.data.prices
                const historicalData = []

                data.map(item => {
                    let friendlyDate = convertDate(item[0])
                    historicalData.push({
                        date: friendlyDate,
                        price: Math.round(item[1]),
                        bitcoinAdded: (5 / Math.round(item[1])).toFixed(8)
                    })
                })
                setPrices(historicalData)
            })
    }

    return (
        <div>
            {/* {convertDate('2018-01-01')} */}
            <label for='start'>Start Date:</label>
            <input id='start' type='date' onChange={handleDateChange} />
            <button onClick={getValues}>Calculate</button>

            <div>
                {prices.map(item => {
                    return (
                        <Row
                            item={{ ...item }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default DollarCostAverage