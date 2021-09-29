import React, { useContext, useState } from 'react'
import CalculatorPage from 'layouts/CalculatorPage'
import MyTextField from 'components/styledComponents/MyTextField'
import { UserContext } from 'state/contexts/UserContext'

//Components
import SummaryRow from 'components/styledComponents/SummaryRow'
import Scorecard from 'components/Scorecard'
import DataChart from 'components/DataChart'

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

    ]

    const [chartType, setChartType] = useState({
        title: `Portfolio Value (${settings.currency})`,
        data: 'value'
    })

    const handleChange = (e) => {
        setChartType({
            title: e.target.name,
            data: e.target.value
        })
    }



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
            <select onChange={handleChange}>
                <option name='Portfolio Value' value='value'>Portfolio Value</option>
                <option name='Bitcoin Holdings' value='runningBal'>Bitcoin Holdings</option>
            </select>
            <DataChart
                title={chartType.title}
                dates={btd.calculatedBtd().map(item => item['date'])}
                data={btd.calculatedBtd().map(item => item[chartType.data])}
            />
        </CalculatorPage>
    )
}

export default BuyTheDip
