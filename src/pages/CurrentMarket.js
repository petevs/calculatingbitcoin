import PortfolioChart from 'components/PortfolioChart'
import Scorecard from 'components/Scorecard'
import SummaryRow from 'components/styledComponents/SummaryRow'
import CalculatorPage from 'layouts/CalculatorPage'
import React, { useContext } from 'react'
import { UserContext } from 'state/contexts/UserContext'
import { updateTimeFrame } from 'state/actions/updateMarketData'
import { StyledButton } from 'components/styledComponents/Button'

const CurrentMarket = () => {

    const { marketData, marketDataDispatch, settings } = useContext(UserContext)

    const summaryItems = [
        {
            name: `Current Price ${settings.currency}`,
            value: marketData.data.current_price[settings.currency],
            prefix: '$'
        }
    ]


    const timeValues = [
        {label: '1W', value: 7},
        {label: '1M', value: 30},
        {label: '3M', value: 90},
        {label: '6M', value: 180},
        {label: '1Y', value: 365},
        {label: '5Y', value: 1825},

    ]

    const handleChange = (e) => {
        marketDataDispatch(updateTimeFrame(e.target.value))
    }
 
    console.log(marketData.filteredPrices())

    return (
        <CalculatorPage title='Current Market'>
            <SummaryRow>
                {summaryItems.map(item => <Scorecard key={item.name} {...item} />)}
            </SummaryRow>
            {timeValues.map(item => <StyledButton onClick={handleChange} value={item.value}>{item.label}</StyledButton>)}
            <PortfolioChart
                title={`Bitcoin Price ${settings.currency}`}
                dates={marketData.filteredPrices().dates}
                portfolio={marketData.filteredPrices().prices}
            />
        </CalculatorPage>
    )
}

export default CurrentMarket
