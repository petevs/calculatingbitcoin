import React, { useContext, useState } from 'react'

//CONTEXTS

import { UserContext } from 'state/contexts/UserContext'
import { updateTradeData } from 'state/actions/updateCalculators'

//Styled Components
import InlineInputBox from 'components/styledComponents/InlineInputBox'
import MyNumberFormat from 'components/styledComponents/MyNumberFormat'
import { FormControlLabel, Switch, TextField } from '@mui/material'
import { StyledButton } from 'components/styledComponents/Button'
import FormWrapper from 'components/styledComponents/FormWrapper'

const TradeSellForm = () => {

    const { trade, tradeDispatch } = useContext(UserContext)

    const [form, setForm] = useState(trade)


    const handleChange = (val, fName) => {
        setForm({
          ...form,
          [fName]: val,
        });
      };

    const handleTax = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.checked,
        });
      };

    const handleClick = () => {
        tradeDispatch(updateTradeData(form))
    }

    return (
      <>
        <InlineInputBox>
                <MyNumberFormat
                    name="bitcoin"
                    label='Bitcoin Sold'
                    customInput={TextField}
                    value={form.bitcoin}
                    variant='filled'
                    onValueChange={({ value: v }) => {
                        handleChange(v, "bitcoin");
                      }}
                />
                <MyNumberFormat
                    label='Sale Price'
                    customInput={TextField}
                    value={form.currentPrice}
                    variant='filled'
                    thousandSeparator={true}
                    onValueChange={({ value: v }) => {
                        handleChange(v, "currentPrice");
                      }}
                />
                <MyNumberFormat
                    label='Average Cost Per BTC'
                    customInput={TextField}
                    value={form.averageCost}
                    variant='filled'
                    thousandSeparator={true}
                    onValueChange={({ value: v }) => {
                        handleChange(v, "averageCost");
                      }}
                />
                <MyNumberFormat
                    label='Average Tax Rate'
                    customInput={TextField}
                    value={form.taxRate}
                    variant='filled'
                    suffix='%'
                    onValueChange={({ value: v }) => {
                        handleChange(v, "taxRate");
                      }}
                />
                <FormControlLabel
                    control={
                    <Switch
                        checked={form.capitalGain}
                        name="capitalGain"
                        onChange={handleTax}
                        color="primary"
                    />
                    }
                    label="Capital Gain"
                />
                  <MyNumberFormat
                    label='Buy Back Price'
                    customInput={TextField}
                    value={form.buyBackPrice}
                    variant='filled'
                    prefix='$'
                    thousandSeparator={true}
                    onValueChange={({ value: v }) => {
                        handleChange(v, "buyBackPrice");
                      }}
                />
              <StyledButton onClick={handleClick} primary>Calculate</StyledButton>
            </InlineInputBox>
          </>
    )
}

export default TradeSellForm
