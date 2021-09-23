import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import NumberFormat from "react-number-format";

//CONTEXT & ACTIONS
import { UserContext } from "state/contexts/UserContext";
import { updateDcaCalculator, updateDcaHistoricalData } from "state/actions/updateCalculators";

//PAGES & COMPONENTS
import CalculatorPage from "layouts/CalculatorPage";
import MyChart from "components/MyChart";
import Scorecard from "components/Scorecard";


//STYLED COMPONENTS
import MyTableHead from 'components/styledComponents/MyTableHead';
import MyTableRow from 'components/styledComponents/MyTableRow';
import SummaryRow from "components/styledComponents/SummaryRow";


//MATERIAL UI
import { Button, TextField } from "@material-ui/core";
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const DollarCostAverage = () => {
  const { settings, calculators, calculatorsDispatch } = useContext(UserContext);

  const { dca } = calculators

  const newHandleChange = (val, fName) => {
    const payload = {
      name: fName,
      value: val
    }
    calculatorsDispatch(updateDcaCalculator(payload))
  };

  const handleDateChange = (e) => {
    const payload = {
      name: e.target.id,
      value: e.target.value
    }
    calculatorsDispatch(updateDcaCalculator(payload))
  }

  const getValues = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${settings.currency}&days=${dca.timeBetween()}&interval=daily`)
            .then((res) => {
              const data = res.data.prices;
              calculatorsDispatch(updateDcaHistoricalData(data))
            })}

  useEffect(() => {
    getValues();
  }, [settings.currency]);



  return (
    <CalculatorPage title="Dollar Cost Average">
      <SummaryRow>
        <Scorecard
          // value={!condition(prices) ? '' : prices[prices.length - 1].value}
          value={!dca.lastEntry() ? "" : dca.lastEntry().value}
          name={`Portfolio Value (${settings.currency})`}
          prefix="$"
        />
        <Scorecard
          value={!dca.lastEntry() ? "" : dca.lastEntry().runningBal}
          name="Bitcoin Balance"
        />
        <Scorecard
          value={!dca.lastEntry() ? "" : dca.lastEntry().totalInvested}
          name={`Total Invested (${settings.currency})`}
          prefix="$"
        />
        <Scorecard
          value={!dca.lastEntry() ? "" : dca.lastEntry().averageCost}
          name="Avg. BTC Purchase Price"
          prefix="$"
        />
        <Scorecard
          value={!dca.lastEntry() ? "" : dca.lastEntry().profit}
          name="Profit"
          prefix="$"
        />
        <Scorecard
          value={!dca.lastEntry() ? "" : dca.lastEntry().roi}
          name="ROI"
          suffix="%"
        />
      </SummaryRow>
     

      <TwoCol>
        <MyChart
          dates={dca.dataTable().map((item) => {
            return item.date;
          })}
          data={dca.dataTable().map((item) => {
            return item.value;
          })}
          invested={dca.dataTable().map((item) => {
            return item.totalInvested;
          })}
          currency={settings.currency}
        />

        <InputBox>
          <h3>DCA Settings</h3>
          <MyNumberFormat
            id="purchaseAmount"
            customInput={TextField}
            label="Daily Purchase Amount"
            value={dca.purchaseAmount}
            variant="outlined"
            size="small"
            thousandSeparator={true}
            prefix={"$"}
            onValueChange={({ value: v }) => {
              newHandleChange(v, "purchaseAmount");
            }}
            autoComplete="off"
          />
          <MyCalField
            id="startDate"
            label="Start Date"
            type="date"
            variant="outlined"
            size="small"
            onChange={handleDateChange}
            defaultValue={"2021-01-01"}
            inputProps={{
              max: dca.today(),
            }}
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={getValues}
            size="large"
          >
            Calculate
          </Button>
        </InputBox>
        </TwoCol>
      <Results>
        <h3>Details</h3>
     
        <Table>
          <MyTableHead>
              <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>BTC Price</TableCell>
                  <TableCell>BTC Purchased</TableCell>
                  <TableCell>BTC Balance</TableCell>
                  <TableCell>{`Portfolio Value (${settings.currency})`}</TableCell>
                  <TableCell>{`Total Invested (${settings.currency})`}</TableCell>
                  <TableCell>ROI</TableCell>
                  <TableCell>Gain / Loss</TableCell>
              </TableRow>
          </MyTableHead>
          <TableBody>{dca.dataTable().map((row) => (
              <MyTableRow>
                <TableCell>
                  {row.date}
                </TableCell>
                <TableCell>
                  {row.price}
                </TableCell>
                <TableCell>
                  {row.bitcoinAdded}
                </TableCell>
                <TableCell>
                  {row.runningBal}
                </TableCell>
                <TableCell>
                  {row.value}
                </TableCell>
                <TableCell>
                  {row.totalInvested}
                </TableCell>
                <TableCell>
                  {row.roi}
                </TableCell>
                <TableCell>
                  {row.profit}
                </TableCell>
              </MyTableRow>
            ))}
          </TableBody>
        </Table>
      </Results>
    </CalculatorPage>
  );
};

export default DollarCostAverage;

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


const TwoCol = styled.div`
  display: grid;
  grid-template-columns: auto 300px;
  gap: 1rem;
  padding: 1rem 0;
  align-items: start;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const InputBox = styled.div`
  display: grid;
  background-color: #293139;
  border-radius: 1rem;
  padding: 2rem;
  gap: 1rem;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const MyNumberFormat = styled(NumberFormat)`
  & .MuiFormLabel-root {
    color: #fff !important;
  }

  & .MuiInputBase-root {
    color: #fff !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }
`;

const MyCalField = styled(TextField)`
  & .MuiFormLabel-root {
    color: #fff !important;
  }

  & .MuiInputBase-root {
    color: #fff !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }

  & ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;
