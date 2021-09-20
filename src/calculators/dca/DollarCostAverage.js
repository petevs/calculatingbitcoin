import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Row from "components/Row";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import MyChart from "components/MyChart";
import Scorecard from "components/Scorecard";
import NumberFormat from "react-number-format";
import CalculatorPage from "layouts/CalculatorPage";
import { UserContext } from "state/contexts/UserContext";

const DollarCostAverage = () => {
  const { settings, settingsDispatch } = useContext(UserContext);

  const convertDate = (x) => {
    const theDate = new Date(x);
    return theDate.toLocaleDateString();
  };

  let todayDate = new Date();
  todayDate = todayDate.toISOString().split("T")[0];

  const getTimeBetweenDates = (x) => {
    const today = new Date();
    const start = new Date(x);

    const diff_in_time = today.getTime() - start.getTime();
    const diff_in_days = diff_in_time / (1000 * 3600 * 24);

    return Math.round(diff_in_days);
  };

  const [daysBtwn, setDaysBtwn] = useState(getTimeBetweenDates("2021-01-01"));
  const [prices, setPrices] = useState([]);
  const [inputs, setInputs] = useState({
    purchaseAmount: "5",
  });
  const [lastEntry, setLastEntry] = useState(null);

  const newHandleChange = (val, fName) => {
    setInputs({
      ...inputs,
      [fName]: val,
    });
  };

  const handleDateChange = (e) => {
    setDaysBtwn(getTimeBetweenDates(e.target.value));
  };

  const getValues = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${settings.currency}&days=${daysBtwn}&interval=daily`
      )
      .then((res) => {
        const data = res.data.prices;
        const historicalData = [];

        let runningBal = 0;
        let totalInvested = 0;

        data.map((item) => {
          let friendlyDate = convertDate(item[0]);

          const price = Math.round(item[1]);
          const bitcoinAdded = Number(
            (inputs.purchaseAmount / Math.round(item[1])).toFixed(8)
          );

          runningBal = runningBal + bitcoinAdded;

          totalInvested = totalInvested + Number(inputs.purchaseAmount);

          const value = Number((price * runningBal).toFixed(2));
          const profit = value - totalInvested;

          const roi = ((value - totalInvested) / totalInvested) * 100;

          historicalData.push({
            date: friendlyDate,
            price: price,
            bitcoinAdded: bitcoinAdded,
            bal: runningBal.toFixed(8),
            value: value,
            totalInvested: totalInvested,
            roi: `${roi.toFixed(2)}%`,
            profit: Math.round(profit),
          });
        });

        setPrices(historicalData);
      });
  };

  useEffect(() => {
    if (prices.length > 1) {
      const latestEntry = prices[prices.length - 1];
      // const averageCost = latestEntry.totalInvested

      setLastEntry({
        ...latestEntry,
        averageCost: Math.round(latestEntry.totalInvested / latestEntry.bal),
      });
    }
  }, [prices]);

  useEffect(() => {
    getValues();
  }, [settings.currency]);

  return (
    <CalculatorPage title="Dollar Cost Average">
      <SummaryRow>
        <Scorecard
          // value={!condition(prices) ? '' : prices[prices.length - 1].value}
          value={!lastEntry ? "" : lastEntry.value}
          name={`Portfolio Value (${settings.currency})`}
          prefix="$"
        />
        <Scorecard
          value={!lastEntry ? "" : lastEntry.bal}
          name="Bitcoin Balance"
        />
        <Scorecard
          value={!lastEntry ? "" : lastEntry.totalInvested}
          name={`Total Invested (${settings.currency})`}
          prefix="$"
        />
        <Scorecard
          value={!lastEntry ? "" : lastEntry.averageCost}
          name="Avg. BTC Purchase Price"
          prefix="$"
        />
        <Scorecard
          value={!lastEntry ? "" : lastEntry.profit}
          name="Profit"
          prefix="$"
        />
        <Scorecard
          value={!lastEntry ? "" : lastEntry.roi}
          name="ROI"
          suffix="%"
        />
      </SummaryRow>

      <TwoCol>
        <MyChart
          dates={prices.map((item) => {
            return item.date;
          })}
          data={prices.map((item) => {
            return item.value;
          })}
          invested={prices.map((item) => {
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
            value={inputs.purchaseAmount}
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
            id="start"
            label="Start Date"
            type="date"
            variant="outlined"
            size="small"
            onChange={handleDateChange}
            defaultValue={"2021-01-01"}
            inputProps={{
              max: todayDate,
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
        <Row
          item={{
            col1: "Date",
            col2: "BTC Price",
            col3: "BTC Purchased",
            col4: "BTC Balance",
            col5: `Portfolio Value (${settings.currency})`,
            col6: `Total Invested (${settings.currency})`,
            col7: "ROI",
            col8: "Gain / Loss",
          }}
          itemClass="header"
        />
        <RowResults>
          {prices.map((item) => {
            return <Row item={{ ...item }} />;
          })}
        </RowResults>
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

const RowResults = styled.div`
  position: relative;
  height: 200px;
  overflow: auto;
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

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem 0 1rem;
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
