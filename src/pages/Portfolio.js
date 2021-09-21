import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'
import Row from "components/Row";

const Portfolio = () => {

    const initialTransaction = {
        date: '',
        type: '',
        description: '',
        amount: ''
    }

    const [transactions, setTransactions] = useState([{}])
    const [currentTransaction, setCurrentTransaction] = useState(initialTransaction)

    const handleChange = (e) => {
        setCurrentTransaction({
            ...currentTransaction,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setTransactions([...transactions, currentTransaction])
        setCurrentTransaction(initialTransaction)
        console.log(transactions)
    }


    return (
        <Wrapper>
            I am the Portfolio
            <MyForm onSubmit={handleSubmit}>
                <TextField 
                    label='date'
                    type='date'
                    value={currentTransaction.date}
                    onChange={handleChange}
                    name='date'
                />
                <TextField 
                    label='type'
                    value={currentTransaction.type}
                    onChange={handleChange}
                    name='type' 
                />
                <TextField 
                    label='description'
                    value={currentTransaction.description}
                    onChange={handleChange}
                    name='description' 
                />
                <TextField 
                    label='amount'
                    value={currentTransaction.amount}
                    onChange={handleChange}
                    name='amount' 
                />
                <button>
                    Add Transaction
                </button>
            </MyForm>
            <Results>
                <h2>Transactions</h2>
                <Row
          item={{
            col1: "Date",
            col2: "Type",
            col3: "Description",
            col4: "Amount"
          }}
          itemClass="header"
        />
        <RowResults>
          {transactions.map((item) => {
              return <Row item={{...item}} />
          })}
        </RowResults>
            </Results>
        </Wrapper>
    )
}

export default Portfolio


const Wrapper = styled.div`
    padding: 2rem;
`

const MyForm = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    padding: 2rem;
    background-color: white;

`

const Results = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #212b36;
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 16px 32px -4px;
  border-radius: 1rem;
  overflow-x: scroll;
  & h3 {
    padding: 1rem;
  }
`;

const RowResults = styled.div`
  position: relative;
  height: 200px;
  overflow: auto;
`;