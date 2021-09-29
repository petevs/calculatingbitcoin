import React, { useContext } from 'react'
import CalculatorPage from 'layouts/CalculatorPage'
import MyTextField from 'components/styledComponents/MyTextField'
import { UserContext } from 'state/contexts/UserContext'

//Components
import SummaryRow from 'components/styledComponents/SummaryRow'
import Scorecard from 'components/Scorecard'

const BuyTheDip = () => {

    const { btd, settings } = useContext(UserContext)

    console.log(btd.calculatedBtd())

    const summaryItems = [
        {
            name: `Bitcoin Holdings`,
            value: btd.lastEntry().runningBal,
        },
        {
            name: `Portfolio Value (${settings.currency})`,
            value: btd.lastEntry().value,
            prefix: '$',
        },
        {
            name: `TotalInvested (${settings.currency})`,
            value: btd.lastEntry().totalInvested,
            prefix: '$',
        },
        {
            name: `ROI`,
            value: btd.lastEntry().roi,
            suffix: '%',
        },
        {
            name: `Number of ${btd.dipPercentage}% Dips`,
            value: btd.lastEntry().numberOfDips,
        },
        // {
        //     name: `24H Low (${settings.currency})`,
        //     value: marketData.summaryData().low_24h,
        //     prefix: '$',
        // },
        // {
        //     name: `All Time High (${settings.currency})`,
        //     value: marketData.summaryData().ath,
        //     prefix: '$',
        //     change: marketData.summaryData().ath_change_percentage
        // },
        // {
        //     name: `Market Cap (${settings.currency})`,
        //     value: marketData.summaryData().market_cap,
        //     prefix: '$',
        // },

    ]

    return (
        <CalculatorPage title='Buy The Dip Calculator'>
            <MyTextField
                label='Dip Drop Before Buying'
            />
            <MyTextField
                label='Purchase Amount'
            />
            <SummaryRow>
                {summaryItems.map(item => <Scorecard key={item.name} {...item} />)}
            </SummaryRow>
        </CalculatorPage>
    )
}

export default BuyTheDip
