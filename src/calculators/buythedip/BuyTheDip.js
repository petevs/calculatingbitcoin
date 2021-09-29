import React, { useContext, useState } from 'react'
import CalculatorPage from 'layouts/CalculatorPage'
import { UserContext } from 'state/contexts/UserContext'

import moment from 'moment'

//Styled Components
import MyTextField from 'components/styledComponents/MyTextField'
import MyCalField from 'components/styledComponents/MyCalField'
import MySelect from 'components/styledComponents/MySelect'
import InlineInputBox from "components/styledComponents/InlineInputBox";

//Components
import SummaryRow from 'components/styledComponents/SummaryRow'
import { StyledButton } from 'components/styledComponents/Button'
import Scorecard from 'components/Scorecard'
import DataChart from 'components/DataChart'

//Actions
import { updateBtdInputs, updateBtdChartType } from 'state/actions/updateCalculators'


const BuyTheDip = () => {

    const { btd, btdDispatch, settings } = useContext(UserContext)

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
            name: `Total Invested (${settings.currency})`,
            value: btd.lastEntry().totalInvested,
            prefix: '$',
        },
        {
            name: `Average Cost (${settings.currency})`,
            value: btd.lastEntry().averageCost,
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

    //CHART CHANGE

    const handleChartChange = (e) => {
        btdDispatch(updateBtdChartType(e.target.value))
    }

    // CALCULATOR INPUTS
    const initialInputs = {
        startDate: btd.startDate,
        dipPercentage: btd.dipPercentage,
        purchaseAmount: btd.purchaseAmount
    }

    const [inputData, setInputData] = useState(initialInputs)


    const handleInputChange = (e) => {
        let value = e.target.value

        if(e.target.name !== 'startDate'){
            value = Number(e.target.value)
        }

        setInputData({
            ...inputData,
            [e.target.name]: value
        })
    }

    const handleSubmit = () => {
        btdDispatch(updateBtdInputs(inputData))
    }

    return (
        <CalculatorPage title='Buy The Dip Calculator'>
            <InlineInputBox>
                <MyCalField
                    type="date"
                    name='startDate'
                    variant='outlined'
                    label='Start Date'
                    value={inputData.startDate}
                    onChange={handleInputChange}
                    inputProps={{
                        max: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                    }}

                />
                <MyTextField
                    name='dipPercentage'
                    label='Dip % Drop Before Buying'
                    value={inputData.dipPercentage}
                    onChange={handleInputChange}
                />
                <MyTextField
                    name='purchaseAmount'
                    label='Purchase Amount Per Dip'
                    value={inputData.purchaseAmount}
                    onChange={handleInputChange}
                />
                <StyledButton primary onClick={handleSubmit}>Calculate</StyledButton>
            </InlineInputBox>
            <SummaryRow>
                {summaryItems.map(item => <Scorecard key={item.name} {...item} />)}
            </SummaryRow>
            <MySelect onChange={handleChartChange}>
                <option name='Bitcoin Holdings' value='runningBal'>Bitcoin Holdings</option>
                <option name='Portfolio Value' value='value'>Portfolio Value</option>
            </MySelect>
            <DataChart
                xtype='datetime'
                title={btd.chartData().title}
                xdata={btd.calculatedBtd().map(item => item['date'])}
                data={btd.chartData().series}
            />
        </CalculatorPage>
    )
}

export default BuyTheDip
