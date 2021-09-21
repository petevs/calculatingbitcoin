import React, { useState, useContext } from 'react'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'
import Row from "components/Row";
import { styles } from "styles/theme";
import SummaryRow from 'components/styledComponents/SummaryRow';
import Scorecard from 'components/Scorecard';
import { Modal } from '@mui/material';
import { db } from 'firebase'
import { AuthContext } from "state/contexts/Auth";
import { UserContext } from "state/contexts/UserContext";

const Portfolio = () => {
    
    const { user } = useContext(AuthContext);
    const { portfolio } = useContext(UserContext)

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
        setOpen(false)
    }


    const summaryValues = [
        {
            name: 'Portfolio Value',
            prefix: '$',
            suffix: '',
            value: 1000000
        },
        {
            name: 'ROI',
            suffix: '%',
            prefix: '',
            value: 350
        }
    ]

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Wrapper>
            <h2>I am the Portfolio</h2>
            <SummaryRow>
                {summaryValues.map(item => {
                    return( <Scorecard {...item} />)
                })}
            </SummaryRow>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle}>
            <MyForm onSubmit={handleSubmit}>
                <h3>Add Transaction</h3>
                <TextField 
                    label='date'
                    type='date'
                    defaultValue={todayDate}
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
                </div>
            </Modal>
            <Results>
                <HeaderRow>
                    <h2>Transactions</h2>
                    <button
                        onClick={handleOpen}
                    >Add Transaction</button>
                </HeaderRow>
                <Row
                    item={{
                        col1: "id",
                        col2: "Date",
                        col3: "Type",
                        col4: "Description",
                        col5: "Amount",
                        col6: 'edit'
                    }}
                    itemClass="header"
                    />
                    <RowResults>
                    {portfolio.transactions.map((item) => {
                        return <Row type='transaction' item={{...item}} />
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
    & h3 {
        margin-bottom: 1rem;
    }
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

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  & h2 {
      justify-self: start;
  }
  & button {
      justify-self: end;
      padding: .5rem;
  }

`

const RowResults = styled.div`
  position: relative;
  height: 200px;
  overflow: auto;
  scrollbar-color: light;
`;