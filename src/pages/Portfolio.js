import React, { useContext } from 'react'
import styled from 'styled-components'
import SummaryRow from 'components/styledComponents/SummaryRow';
import Scorecard from 'components/Scorecard';
import { UserContext } from "state/contexts/UserContext";
import { updateSettings } from 'state/actions/updateSettings';
import TransactionForm from 'components/TransactionForm';
import MainModal from 'components/MainModal';
import { updateChartType, updateEditingTransaction } from 'state/actions/updatePortfolio';
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

    const handleChartChange = (e) => {
        portfolioDispatch(updateChartType(e.target.value))
    }

    const chartDates = portfolio.chartData().map((item) => {
        return item.dates;
        })
    const portfolioData = portfolio.chartData().map((item) => {
        return item.values;
        })
    

    return (
        <CalculatorPage title='Portfolio'>
            <SummaryRow>
                {summaryValues.map(item => {
                    return( <Scorecard key={item.name} {...item} />)
                })}
            </SummaryRow>
            <select onChange={handleChartChange} value={portfolio.chartType} style={{margin: '0 0 1rem 0'}}>
                <option value='portfolio'>Portfolio Value Over Time</option>
                <option value='bitcoin'>Bitcoin Holdings Over Time</option>
            </select>
            <PortfolioChart
                title={portfolio.chartTitle()}
                dates={chartDates}
                portfolio={portfolioData}
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