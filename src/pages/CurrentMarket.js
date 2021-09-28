import PortfolioChart from 'components/PortfolioChart'
import Scorecard from 'components/Scorecard'
import SummaryRow from 'components/styledComponents/SummaryRow'
import CalculatorPage from 'layouts/CalculatorPage'
import React, { useContext, } from 'react'
import { UserContext } from 'state/contexts/UserContext'
import { updateTimeFrame, updateActiveButton } from 'state/actions/updateMarketData'
import { StyledButton } from 'components/styledComponents/Button'
import moment from 'moment'
import ButtonRow from 'components/styledComponents/ButtonRow'

const CurrentMarket = () => {

    const { marketData, marketDataDispatch, settings } = useContext(UserContext)

    const summaryItems = [
        {
            name: `Current Price ${settings.currency}`,
            value: marketData.data.current_price[settings.currency],
            prefix: '$'
        }
    ]

    const ytd = () => {
        let today = moment()
        let startYear = moment('2021-01-01')
        return today.diff(startYear, 'days')
    }



    const timeButtons = [
        {name: '1W', value: 7},
        {name: '1M', value: 30},
        {name: '3M', value: 90},
        {name: '6M', value: 180},
        {name: 'YTD', value: ytd()},
        {name: '1Y', value: 365},
        {name: '5Y', value: 1825},
    ]


    const handleChange = (e) => {
        marketDataDispatch(updateActiveButton(e.target.name))
        marketDataDispatch(updateTimeFrame(e.target.value))
    }


    return (
        <CalculatorPage title='Current Market'>
            <SummaryRow>
                {summaryItems.map(item => <Scorecard key={item.name} {...item} />)}
            </SummaryRow>
            <ButtonRow>
                {timeButtons.map((item, idx) => 
                    <StyledButton 
                        name={item.name} 
                        value={item.value} 
                        onClick={handleChange}
                        primary={item.name === marketData.activeButton}
                    >
                        {item.name}
                    </StyledButton>)
                }
            </ButtonRow>
            <PortfolioChart
                title={`Bitcoin Price (${settings.currency})`}
                dates={marketData.filteredPrices().dates}
                portfolio={marketData.filteredPrices().prices}
            />
        </CalculatorPage>
    )
}

export default CurrentMarket
