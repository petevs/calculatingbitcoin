import React, { useState } from 'react'
import axios from 'axios'
import Row from 'components/Row'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'

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
    const [inputs, setInputs] = useState({
        purchaseAmount: '5'
    })


    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value
        })
    }

    const handleDateChange = (e) => {
        setDaysBtwn(getTimeBetweenDates(e.target.value))
    }


    const getValues = () => {

        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=${daysBtwn}&interval=daily`)
            .then(res => {
                const data = res.data.prices
                const historicalData = []

                let runningBal = 0
                let totalInvested = 0

                data.map(item => {
                    let friendlyDate = convertDate(item[0])

                    const price = Math.round(item[1])
                    const bitcoinAdded = Number((inputs.purchaseAmount / Math.round(item[1])).toFixed(8))

                    runningBal = runningBal + bitcoinAdded

                    totalInvested = totalInvested + Number(inputs.purchaseAmount)

                    const value = Number((price * runningBal).toFixed(2))

                    const roi = (value - totalInvested) / totalInvested * 100

                    historicalData.push({
                        date: friendlyDate,
                        price: price,
                        bitcoinAdded: bitcoinAdded,
                        bal: runningBal.toFixed(8),
                        value: value,
                        totalInvested: totalInvested,
                        roi: `${roi.toFixed(2)}%`
                    })
                })

                setPrices(historicalData)

            })
    }

    return (
        <div>
            {/* {convertDate('2018-01-01')} */}
            <TextField
                id='purchaseAmount' 
                label='Purchase Amount'
                onChange={handleChange}
                value={inputs.purchaseAmount}
            />
            <label for='start'>Start Date:</label>
            <input id='start' type='date' onChange={handleDateChange} />
            <button onClick={getValues}>Calculate</button>

            <Results>
                <Row 
                    item={{
                        'col1': 'Date',
                        'col2': 'Price',
                        'col3': 'BTC Purchased',
                        'col4': 'BTC Portfolio',
                        'col5': 'Portfolio Value (CAD)',
                        'col6': 'Total Invested',
                        'col7': 'ROI'
                    }}
                />
                {prices.map(item => {
                    return (
                        <Row
                            item={{ ...item }}
                        />
                    )
                })}
            </Results>
        </div>
    )
}

export default DollarCostAverage

const Results = styled.div`
    padding: 1rem;
`