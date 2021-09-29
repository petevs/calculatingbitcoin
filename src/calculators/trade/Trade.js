import DataChart from 'components/DataChart'
import CalculatorPage from 'layouts/CalculatorPage'
import React, { useContext } from 'react'
import { numberWithCommas } from 'utils/numberFormatting'
import styled from 'styled-components'

//CONTEXTS

import { UserContext } from 'state/contexts/UserContext'

//Styled Components
import TradeSellForm from './TradeSellForm'
import Results from 'components/styledComponents/Results'
import ResultRow from 'layouts/ResultRow'
import TwoColEven from 'components/styledComponents/TwoColEven'
import TradeResults from './TradeResults'

const Trade = () => {

    const { trade, settings } = useContext(UserContext)

    const annotations =
        {
            yaxis: [
                {
                    y: trade.bitcoin,
                    label: {
                    // style: {
                    //     color: '#fff',
                    //     background: '#00E396'
                    // },
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

    return (
        <CalculatorPage title='Trade Calculator'>
            <TradeSellForm />
            <TwoColEven>
                <DataChart
                    title={`Bitcoin Acquired with $${numberWithCommas(trade.results().leftOverCash)} Net Proceeds at Various Price Points`}
                    xtype='numeric'
                    xdata={trade.simulation().xdata}
                    data={trade.simulation().series}
                    annotation={annotations}
                />
                <RightCol>
                <Results>
                    <h2>Results</h2>
                    <TradeResults />
                </Results>
                <CallOutBox>
                    To end up with the same amount of bitcoin you started with,<br /> your buyback price will need to be: 
                    <h2>${numberWithCommas(trade.results().breakEven)}</h2>
                    <h4>Requiring a {trade.results().percentageLess}% drop in price.</h4>
                </CallOutBox>

            </RightCol>
            </TwoColEven>
        </CalculatorPage>
    )
}

export default Trade

const RightCol = styled.div`
    display: grid;
    grid-template-columns: 1fr;
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
