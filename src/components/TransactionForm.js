import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { db } from 'firebase'
import { updateSettings } from 'state/actions/updateSettings'
import { UserContext } from 'state/contexts/UserContext'
import { AuthContext } from 'state/contexts/Auth'
import MyTextField from './styledComponents/MyTextField'

const TransactionForm = (props) => {

    if(props){
        console.log('ive got props')
    }

    const { settings, settingsDispatch } = useContext(UserContext)
    const { user } = useContext(AuthContext)

    const handleClose = () => {
        const payload = {
            name: 'modalOpen',
            value: !settings.modalOpen
        }
        settingsDispatch(updateSettings(payload))
    }


    //Establish today's date for add transaction default value
    let todayDate = new Date();
    todayDate = todayDate.toISOString().split("T")[0];

    const initialTransaction = {
        date: {todayDate}.toString(),
        type: '',
        description: '',
        amount: 0
    }


    const [currentTransaction, setCurrentTransaction] = useState(initialTransaction)

    const handleChange = (e) => {
        setCurrentTransaction({
            ...currentTransaction,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        db.collection('users').doc(user.uid).collection('transactions').doc().set(currentTransaction)
        setCurrentTransaction(initialTransaction)
        handleClose()
    }

    return (
        <MyForm onSubmit={handleSubmit}>
                <h3>{settings.modalType === 'addTransaction' ? 'Add Transaction' : 'Edit Transaction'}</h3>
                <MyTextField 
                    label='date'
                    type='date'
                    defaultValue={todayDate}
                    onChange={handleChange}
                    name='date'
                />
                <MyTextField 
                    label='type'
                    value={currentTransaction.type}
                    onChange={handleChange}
                    name='type' 
                />
                <MyTextField 
                    label='description'
                    value={currentTransaction.description}
                    onChange={handleChange}
                    name='description' 
                />
                <MyTextField 
                    label='amount'
                    value={currentTransaction.amount}
                    onChange={handleChange}
                    name='amount' 
                />
                <Button variant='outlined' color='primary' type='submit'>
                {settings.modalType === 'addTransaction' ? 'Add Transaction' : 'Edit Transaction'}
                </Button>
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