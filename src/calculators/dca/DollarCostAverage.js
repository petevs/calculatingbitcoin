import React, { useState, useContext } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import moment from 'moment'

//CONTEXT & ACTIONS
import { UserContext } from "state/contexts/UserContext";
import { updateDcaCalculator} from "state/actions/updateCalculators";

//PAGES & COMPONENTS
import CalculatorPage from "layouts/CalculatorPage";
import MyChart from "components/MyChart";
import Scorecard from "components/Scorecard";


//STYLED COMPONENTS
// import MyTableHead from 'components/styledComponents/MyTableHead';
// import MyTableRow from 'components/styledComponents/MyTableRow';
import SummaryRow from "components/styledComponents/SummaryRow";


//MATERIAL UI
import { Button, TextField } from "@material-ui/core";
// import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const DollarCostAverage = () => {

  const { settings, calculators, calculatorsDispatch } = useContext(UserContext);
  const { dca } = calculators


  const [userInputs, setUserInputs] = useState({
    purchaseAmount: dca.purchaseAmount,
    startDate: dca.startDate
  })

  const newHandleChange = (val, fName) => {
    setUserInputs({
      ...userInputs,
      [fName]: val
    })
  };

  const handleDateChange = (e) => {
    setUserInputs({
      ...userInputs,
      [e.target.id]: e.target.value
    })
  }

  const updateState = () => {
    for (const key in userInputs){
      const payload = {
        name: key,
        value: userInputs[key]
      }
      calculatorsDispatch(updateDcaCalculator(payload))
    }
  }

  if(!dca.calculatedData()){
    return (
      <>
        Loading...
      </>
    )
  }

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
          dates={dca.calculatedData().map((item) => {
            return item.date;
          })}
          data={dca.calculatedData().map((item) => {
            return item.value;
          })}
          invested={dca.calculatedData().map((item) => {
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
            value={userInputs.purchaseAmount}
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
              max: moment().format('YYYY-MM-DD'),
            }}
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={updateState}
            size="large"
          >
            Calculate
          </Button>
        </InputBox>
        </TwoCol>
      {/* <Results>
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

      </Results> */}
    </CalculatorPage>
  );
};

export default DollarCostAverage;

// const Results = styled.div`
//   display: grid;
//   gap: 0.5rem;
//   padding: 1rem;
//   background-color: #212b36;
//   box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
//     rgb(145 158 171 / 24%) 0px 16px 32px -4px;
//   border-radius: 1rem;
//   overflow-x: scroll;
//   & h3 {
//     padding: 1rem;
//   }
// `;


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
