import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Button, FormControl, InputLabel, MenuItem } from '@mui/material'
import { db } from 'firebase'
import { AuthContext } from 'state/contexts/Auth'
import MyTextField from './styledComponents/MyTextField'
import { UserContext } from 'state/contexts/UserContext'
import { updateEditingTransaction } from 'state/actions/updatePortfolio'
import { updateSettings } from 'state/actions/updateSettings'
import { Select } from '@mui/material'
import MySelect from './styledComponents/MySelect'
import { StyledButton } from './styledComponents/Button'

const TransactionForm = () => {

    const { user } = useContext(AuthContext)
    const { portfolio, portfolioDispatch, settingsDispatch } = useContext(UserContext)


    // Establish today's date for add transaction default value
    let todayDate = new Date();
    todayDate = todayDate.toISOString().split("T")[0];

    let initialTransaction = {
        id: null,
        date: '',
        type: '',
        memo: '',
        dollarAmount: 0,
        bitcoinAmount: 0
    }

    const [currentTransaction, setCurrentTransaction] = useState(portfolio.editing)

    useEffect(() => {
        setCurrentTransaction(portfolio.editing.values)
    },[portfolio.editing])


    const handleChange = (e) => {
        setCurrentTransaction({
            ...currentTransaction,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(portfolio.editing.id){
            db.collection('users').doc(user.uid).collection('transactions').doc(portfolio.editing.id).update(currentTransaction)
            setCurrentTransaction(initialTransaction)
            portfolioDispatch(updateEditingTransaction({...initialTransaction}))

            const payload = {
                name: 'modalOpen',
                value: false
            }
            settingsDispatch(updateSettings(payload))
        }
    
        else {
            db.collection('users').doc(user.uid).collection('transactions').doc().set(currentTransaction)
            setCurrentTransaction(initialTransaction)
            portfolioDispatch(updateEditingTransaction({...initialTransaction}))

            const payload = {
                name: 'modalOpen',
                value: false
            }
            settingsDispatch(updateSettings(payload))
        }
        

    }

    return (
        <MyForm onSubmit={handleSubmit}>
            <h3>{!portfolio.editing.id ? 'Add Transaction' : 'Edit Transaction'}</h3>
                <MyTextField 
                    name='date'
                    label='Date'
                    type='date'
                    value={currentTransaction.date}
                    defaultValue={todayDate}
                    onChange={handleChange}
                />
                {/* <MyTextField 
                    name='type' 
                    label='type'
                    value={currentTransaction.type}
                    onChange={handleChange}
                /> */}
                <FormControl fullWidth>
                    <InputLabel id='type'>Type</InputLabel>
                    <Select
                        name='type' 
                        id='type'
                        label='type'
                        value={currentTransaction.type}
                        onChange={handleChange}
                        defaultValue={portfolio.editing.values.type}
                    >
                        <MenuItem value='Purchase'>Purchase</MenuItem>
                        <MenuItem value='Sale'>Sale</MenuItem>
                    </Select>
                </FormControl>
                <MyTextField 
                    name='dollarAmount' 
                    label='Dollars'
                    value={currentTransaction.dollarAmount}
                    onChange={handleChange}
                />
                <MyTextField 
                    name='bitcoinAmount' 
                    label='Bitcoin'
                    value={currentTransaction.bitcoinAmount}
                    onChange={handleChange}
                />
                <MyTextField 
                name='memo' 
                label='Memo'
                value={currentTransaction.memo}
                onChange={handleChange}
            />
                <StyledButton primary type='submit'>
                    {!portfolio.editing.id ? 'Add Transaction' : 'Save Changes'}
                </StyledButton>
            </MyForm>
    )
}

export default TransactionForm

const MyForm = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
    padding: 2rem;
    & h3 {
        margin-bottom: 1rem;
    }
`