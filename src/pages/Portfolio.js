import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import SummaryRow from 'components/styledComponents/SummaryRow';
import Scorecard from 'components/Scorecard';
import { UserContext } from "state/contexts/UserContext";
import { updateSettings } from 'state/actions/updateSettings';
import TransactionForm from 'components/TransactionForm';
import MainModal from 'components/MainModal';
import { updateEditingTransaction } from 'state/actions/updatePortfolio';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import MyTableHead from 'components/styledComponents/MyTableHead';
import MyTableRow from 'components/styledComponents/MyTableRow';
import EditTransaction from 'components/EditTransaction';
import { StyledButton } from 'components/styledComponents/Button'
import PortfolioChart from 'components/PortfolioChart'
import CalculatorPage from 'layouts/CalculatorPage';

const Portfolio = () => {
    
    const { settings, settingsDispatch, portfolio, portfolioDispatch } = useContext(UserContext)

    const summaryValues = [
        {
            name: 'Bitcoin Holdings',
            prefix: '',
            suffix: '',
            value: portfolio.calculatedTotal()
        },
        {
            name: 'Portfolio Value',
            prefix: '',
            suffix: '',
            value: portfolio.value()
        },
        {
            name: 'Total Invested',
            prefix: '',
            suffix: '',
            value: portfolio.calculatedTotalInvested()
        },
        {
            name: 'ROI',
            suffix: '%',
            prefix: '',
            value: portfolio.calculatedRoi()
        },
        {
            name: 'Avg BTC Purchase Price',
            suffix: '',
            prefix: '$',
            value: portfolio.calculatedAvgCost()
        }
    ]


    const handleOpen = () => {

            const payload = {
                name: 'modalOpen',
                value: true
            }
            settingsDispatch(updateSettings(payload))
        }

    const handleClose = () => {

        const initialTransaction = {
            id: null,
            date: '',
            type: '',
            description: '',
            amount: 0
        }


        const payload = {
            name: 'modalOpen',
            value: false
        }
        settingsDispatch(updateSettings(payload))
        portfolioDispatch(updateEditingTransaction({...initialTransaction}))
    }

    return (
        <CalculatorPage title='Portfolio'>
            <SummaryRow>
                {summaryValues.map(item => {
                    return( <Scorecard {...item} />)
                })}
            </SummaryRow>
            <PortfolioChart
                dates={portfolio.calculatedTransactions().map((item) => {
                return item.date;
                })}
                data={portfolio.calculatedTransactions().map((item) => {
                return item.runningBal;
                })}
            />
            <MainModal open={settings.modalOpen} onClose={handleClose}>
                <TransactionForm />
            </MainModal>
            <Results>
                <HeaderRow>
                    <h2>Transactions</h2>
                    <StyledButton
                        primary
                        onClick={handleOpen}
                    >Add Transaction</StyledButton>
                </HeaderRow>
                    <Table>
                        <MyTableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Memo</TableCell>
                                <TableCell>Dollar Amount</TableCell>
                                <TableCell>Bitcoin Amount</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </MyTableHead>
                        <TableBody>
                            {
                                portfolio.calculatedTransactions().map((row) => (
                                    <MyTableRow
                                        key={row.id}
                                    >
                                        <TableCell>
                                            {row.date}
                                        </TableCell>
                                        <TableCell>
                                            {row.type}
                                        </TableCell>
                                        <TableCell>
                                            {row.memo}
                                        </TableCell>
                                        <TableCell>
                                            {row.dollarAmount}
                                        </TableCell>
                                        <TableCell>
                                            {row.bitcoinAmount}
                                        </TableCell>
                                        <TableCell>
                                            {row.runningBal}
                                        </TableCell>
                                        <TableCell>
                                            <EditTransaction {...row} />
                                        </TableCell>
                                    </MyTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
            </Results>
        </CalculatorPage>
    )
}

export default Portfolio


const Wrapper = styled.div`
    padding: 2rem;
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