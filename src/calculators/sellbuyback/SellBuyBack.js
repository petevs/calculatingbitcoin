import CalculatorPage from 'layouts/CalculatorPage'
import NumberFormat from 'react-number-format'
import {
    TextField,
    Tooltip,
    Slider,
    FormControlLabel,
    Switch
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import CalcContainer from 'layouts/CalcContainer'
import CalcColumn from 'layouts/CalcColumn'
import ResultsCol from 'layouts/ResultsCol'
import SBBResults from 'calculators/sellbuyback/SBBResults'
import Scorecard from 'components/Scorecard'
import styled from 'styled-components'

const SellBuyBack = () => {

    const initialDetails = {
        bitcoin: 0,
        averageCost: 0,
        currentPrice: 0,
        taxRate: 35,
        capitalGain: true,
        breakEven: 0,
        percentageLess: 0,
        leftoverCash: 0,
        taxableGain: 0,
        gainRate: 50,
        buyBackPrice: 0,
        amountSpent: 0,
        portfolioPrice: 0
    }

    const [details, setDetails] = useState(initialDetails)
    const [results, setResults] = useState({
        proceeds: 0,
        cost: 0,
        profit: 0,
        netValue: 0
    })


    useEffect(() => {

        const updateResults = () => {

            const proceeds = details.bitcoin * details.currentPrice
            const cost = details.bitcoin * details.averageCost
            const profit = proceeds - cost
            let tax
            let taxableGain
            let gainRate

            if (details.capitalGain === true) {
                tax = Math.round(profit * .5 * (details.taxRate / 100))
                taxableGain = profit * .5
                gainRate = 50
            }

            if (details.capitalGain === false) {
                tax = Math.round(profit * (details.taxRate / 100))
                taxableGain = profit
                gainRate = 100
            }

            const netProfit = profit - tax
            const leftoverCash = proceeds - tax

            const breakEven = leftoverCash / details.bitcoin
            const percentageLess = Math.round((1 - (breakEven / details.currentPrice)) * 100)

            const newBitcoin = details.amountSpent / details.buyBackPrice

            const netBitcoin = (newBitcoin - details.bitcoin).toFixed(8)
            const netCash = leftoverCash - details.amountSpent

            const netValue = netBitcoin * details.portfolioPrice

            setResults({
                proceeds: proceeds,
                cost: cost,
                profit: profit,
                taxes: tax,
                netProfit: netProfit,
                breakEven: breakEven,
                percentageLess: percentageLess,
                leftoverCash: leftoverCash,
                taxableGain: taxableGain,
                gainRate: gainRate,
                newBitcoin: newBitcoin.toFixed(8),
                netBitcoin: netBitcoin,
                netCash: netCash,
                netValue: netValue
            })
        }

        updateResults()

    }, [details])

    const handleTax = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.checked
        })
    }

    const newHandleChange = (val, fName) => {
        setDetails({
            ...details,
            [fName]: val
        })
    }

    const MAX_VAL = 100;
    const withValueLimit = ({ floatValue }) => floatValue <= MAX_VAL;



    return (
        <CalculatorPage
            title='Sell The Top and Buy Back'
            subtitle='Think you can time the top and buy back in? Find out how much the price would have to drop for you to end up with the same amount of bitcoin and how well you would fair under different scenarios.'
        >
            <SummaryRow>
                <Scorecard
                    name='Change Bitcoin Balance'
                    value={results.netBitcoin}
                />
                <Scorecard
                    name='Change Cash Balance'
                    value={results.netCash}
                    prefix='$'
                />
                <Scorecard
                    name='Change in Portfolio Value'
                    value={results.netValue.toFixed()}
                    prefix='$'
                />
            </SummaryRow>
            <CalcContainer>
                <CalcColumn>
                    <h3>Sale Details</h3>
                    <NumberFormat
                        value={details.bitcoin}
                        id='bitcoin'
                        label='Amount of Bitcoin Being Sold'
                        customInput={TextField}
                        decimalScale='9'
                        onValueChange={
                            ({ value: v }) => {
                                newHandleChange(v, 'bitcoin')
                            }
                        }
                        variant='filled'
                    />
                    <NumberFormat
                        id='currentPrice'
                        label='Sale Price'
                        value={details.currentPrice}
                        customInput={TextField}
                        onValueChange={
                            ({ value: v }) => {
                                newHandleChange(v, 'currentPrice')
                            }
                        }
                        variant='filled'
                        thousandSeparator={true}
                        prefix={'$'}
                    />
                    <NumberFormat
                        id='averageCost'
                        label='Average Cost to Acquire'
                        value={details.averageCost}
                        customInput={TextField}
                        onValueChange={
                            ({ value: v }) => {
                                newHandleChange(v, 'averageCost')
                            }
                        }
                        variant='filled'
                        thousandSeparator={true}
                        prefix={'$'}
                    />
                    <Tooltip
                        title='Hopefully in the future we can get around to a more advanced tax calculation'
                        placement='top-start'
                    >
                        <NumberFormat
                            id='taxRate'
                            label='Average Tax Rate'
                            value={details.taxRate}
                            customInput={TextField}
                            onValueChange={
                                ({ value: v }) => {
                                    newHandleChange(v, 'taxRate')
                                }
                            }
                            variant='filled'
                            suffix={'%'}
                            isAllowed={withValueLimit}
                        />
                    </Tooltip>
                    <Slider
                        value={details.taxRate}
                        step={1}
                        min={0}
                        max={100}
                        onChange={(event, newValue) => setDetails({
                            ...details,
                            taxRate: newValue
                        })}
                    />
                    <FormControlLabel
                        control={<Switch checked={details.capitalGain} name='capitalGain' onChange={handleTax} color='primary' />}
                        label='Capital Gain'
                    />

                    <h3>Buyback Details</h3>
                    <p>{`To end up with the same amount of bitcoin you started with, the buyback price of bitcoin will need to be: $${Math.round(results.breakEven)}. Requiring an ${results.percentageLess}% drop in price`}</p>
                    <NumberFormat
                        id='buyBackPrice'
                        label='Buyback Price'
                        value={details.buyBackPrice}
                        customInput={TextField}
                        onValueChange={
                            ({ value: v }) => {
                                newHandleChange(v, 'buyBackPrice')
                            }
                        }
                        variant='filled'
                        thousandSeparator={true}
                        prefix={'$'}
                    />
                    <NumberFormat
                        id='amountSpent'
                        label='Amount Spent'
                        value={details.amountSpent}
                        customInput={TextField}
                        onValueChange={
                            ({ value: v }) => {
                                newHandleChange(v, 'amountSpent')
                            }
                        }
                        variant='filled'
                        thousandSeparator={true}
                        prefix={'$'}
                    />
                    <h3>Current Details</h3>
                    <NumberFormat
                        id='portfolioPrice'
                        label='Price of Bitcoin'
                        value={details.portfolioPrice}
                        customInput={TextField}
                        onValueChange={
                            ({ value: v }) => {
                                newHandleChange(v, 'portfolioPrice')
                            }
                        }
                        variant='filled'
                        thousandSeparator={true}
                        prefix={'$'}
                    />
                </CalcColumn>
                <ResultsCol>
                    <SBBResults
                        details={details}
                        results={results}
                    />
                </ResultsCol>
            </CalcContainer>
        </CalculatorPage>
    )
}

export default SellBuyBack


const SummaryRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0 0 2rem;
`