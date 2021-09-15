import React, { useState } from 'react'
import axios from 'axios'
import Row from 'components/Row'
import { Button, TextField } from '@material-ui/core'
import styled from 'styled-components'
import MyChart from 'components/MyChart'
import Scorecard from 'components/Scorecard'

const DollarCostAverage = () => {

    const convertDate = (x) => {
        const theDate = new Date(x)
        return theDate.toLocaleDateString()
    }

    let todayDate = new Date()
    todayDate = todayDate.toISOString().split('T')[0]


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


    const condition = (x) => {
        if (x.length < 1) {
            return false
        } else {
            return true
        }
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
                    const profit = (value - totalInvested)

                    const roi = (value - totalInvested) / totalInvested * 100

                    historicalData.push({
                        date: friendlyDate,
                        price: price,
                        bitcoinAdded: bitcoinAdded,
                        bal: runningBal.toFixed(8),
                        value: value,
                        totalInvested: totalInvested,
                        roi: `${roi.toFixed(2)}%`,
                        profit: Math.round(profit)
                    })
                })

                setPrices(historicalData)

            })
    }

    return (
        <Wrapper>

            <SummaryRow>
                <Scorecard 
                    value={!condition(prices) ? '' : prices[prices.length - 1].value}
                    name='Portfolio Value (CAD)'
                    prefix='$'
                />
                <Scorecard 
                    value={!condition(prices) ? '' : prices[prices.length - 1].totalInvested}
                    name='Total Invested (CAD)'
                    prefix='$'
                />
                <Scorecard 
                    value={!condition(prices) ? '' : prices[prices.length - 1].roi}
                    name='ROI'
                    suffix='%'
                />
                <Scorecard 
                    value={!condition(prices) ? '' : prices[prices.length - 1].bal}
                    name='Bitcoin Balance'
                />
            </SummaryRow>

            <TwoCol>
                
                <MyChart
                    dates={prices.map(item => {
                        return item.date
                    })}
                    data={prices.map(item => {
                        return item.value
                    })}
                    invested={prices.map(item => {
                        return item.totalInvested
                    })}
                />

                <InputBox>
                    <h3>DCA Settings</h3>
                    <TextField
                        id='purchaseAmount' 
                        label='Daily Purchase Amount'
                        onChange={handleChange}
                        value={inputs.purchaseAmount}
                        variant='filled'
                        size='small'
                    />
                    <TextField
                        id='start'
                        label='Start Date'
                        type='date'
                        variant='filled'
                        size='small'
                        onChange={handleDateChange}
                        defaultValue={todayDate}
                        inputProps={
                            {
                                max: todayDate
                            }
                        }

                    />
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={getValues}
                        size='medium'
                    >
                        Calculate
                    </Button>
                </InputBox>
            </TwoCol>

            <Results>
                <h3>Details</h3>
                <Row 
                    item={{
                        'col1': 'Date',
                        'col2': 'BTC Price',
                        'col3': 'BTC Purchased',
                        'col4': 'BTC Balance',
                        'col5': 'Portfolio Value (CAD)',
                        'col6': 'Total Invested (CAD)',
                        'col7': 'ROI',
                        'col8': 'Gain / Loss'
                    }}

                    itemClass='header'
                />
                {prices.map(item => {
                    return (
                        <Row
                            item={{ ...item }}
                        />
                    )
                })}
            </Results>
        </Wrapper>
    )
}

export default DollarCostAverage

const Wrapper = styled.div`
    padding: 2rem;
`

const Results = styled.div`
    display: grid;
    gap: .5rem;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 
        rgb(145 158 171 / 24%) 0px 0px 2px 0px, 
        rgb(145 158 171 / 24%) 0px 16px 32px -4px;
    border-radius: 1rem;
    overflow-x: scroll;

    & h3{
        padding: 1rem;
    }
`

const TwoCol = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1rem;
    align-items: start;
`

const SummaryRow = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem 0 1rem;
`

const InputBox = styled.div`
    display: grid;
    background-color: rgb(244, 246, 248);
    border-radius: 1rem;
    padding: 2rem;
    gap: 1rem;
`