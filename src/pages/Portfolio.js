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
import { updateSettings } from 'state/actions/updateSettings';

const Portfolio = () => {
    
    const { user } = useContext(AuthContext);
    const { settingsDispatch, portfolio } = useContext(UserContext)


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


    const handleOpen = () => {

            const payload = {
                name: 'modalOpen',
                value: true
            }
            settingsDispatch(updateSettings(payload))
        }

    return (
        <Wrapper>
            <h2>I am the Portfolio</h2>
            <SummaryRow>
                {summaryValues.map(item => {
                    return( <Scorecard {...item} />)
                })}
            </SummaryRow>

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