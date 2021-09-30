import DataChart from 'components/DataChart'
import CalculatorPage from 'layouts/CalculatorPage'
import React, { useState, useContext } from 'react'
import { numberWithCommas } from 'utils/numberFormatting'
import styled from 'styled-components'

//CONTEXTS

import { UserContext } from 'state/contexts/UserContext'
import { updateTradeBuyback } from 'state/actions/updateCalculators'

//Styled Components
import TradeSellForm from './TradeSellForm'
import Results from 'components/styledComponents/Results'
import ResultRow from 'layouts/ResultRow'
import TwoColEven from 'components/styledComponents/TwoColEven'
import TradeResults from './TradeResults'
import { Slider } from '@mui/material'
import MyTextField from 'components/styledComponents/MyTextField'
import SummaryRow from 'components/styledComponents/SummaryRow'
import Scorecard from 'components/Scorecard'

const Trade = () => {

    const { trade, tradeDispatch, settings } = useContext(UserContext)

    const annotations =
        {
            yaxis: [
                {
                    y: trade.bitcoin,
                    label: {
                    text: `BreakEven Bitcoin: ${trade.bitcoin}`
                    },
                },
            ],
            xaxis: [
              {
                x: trade.results().breakEven,
                label: {
                    text: `Breakeven Price (${settings.currency}): $${trade.results().breakEven}`
                }
              }
            ]
          }


    const handleChange = (e) => {
        tradeDispatch(updateTradeBuyback(e.target.value))
    }

    return (
        <CalculatorPage title='Trade Calculator'>
            <TradeSellForm />
            <SummaryRow>
                <Scorecard
                    name={`Sale Proceeds (${settings.currency})`}
                    value={numberWithCommas(trade.proceeds())}
                    prefix='$'
                />
                <Scorecard
                    name={`Approx. Taxes Owed (${settings.currency})`}
                    value={numberWithCommas(trade.taxResults().tax)}
                    prefix='$'
                />
                <Scorecard
                    name={`Net Sale Proceeds (${settings.currency})`}
                    value={numberWithCommas(trade.results().leftOverCash)}
                    prefix='$'
                />
                <Scorecard
                    name={`Breakeven Price (${settings.currency})`}
                    value={numberWithCommas(trade.results().breakEven)}
                    prefix='$'
                    change={trade.results().percentageLess}
                />
                {/* <CallOutBox>
                    <MyTextField
                        label='Buyback Price'
                        value={trade.buyBackPrice}
                        onChange={handleChange}
                    />
                    <br />
                    <h4>Bitcoin Acquired: {trade.buyBackCalc().newBitcoinAcquired}</h4>
                    Net {trade.buyBackCalc().changeInBitcoin < 0 ? 'Decrease' : 'Increase'} in Bitcoin: {trade.buyBackCalc().changeInBitcoin} ({trade.buyBackCalc().percentChange})%
                </CallOutBox> */}
            </SummaryRow>
                <DataChart
                    title={`Bitcoin Acquired with $${numberWithCommas(trade.results().leftOverCash)} Net Proceeds at Various Price Points`}
                    xtype='numeric'
                    xdata={trade.simulation().xdata}
                    data={trade.simulation().series}
                    annotation={annotations}
                />
        </CalculatorPage>
    )
}

export default Trade

const RightCol = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    min-width: 500px;
    gap: 1rem;
`

const CallOutBox = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0rem;
    padding: 2rem;
    background-color: #212b36;
    box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 16px 32px -4px;
    border-radius: 1rem;
    overflow-x: scroll;
    justify-items: center;
    text-transform: capitalize;
    text-align: center;
`
