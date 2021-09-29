import React, { useState, useContext } from "react";
import ResultRow from "layouts/ResultRow";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import styled from "styled-components";
import { UserContext } from "state/contexts/UserContext";

const TradeResults = ({ results, details }) => {
  const [calcVisibility, setCalcVisibility] = useState(true);
  const { trade } = useContext(UserContext)

  const toggleVisibility = () => {
    setCalcVisibility(!calcVisibility);
  };

  function nWC(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const MyIcon = () => {
    return (
      <>
        {calcVisibility ? (
          <KeyboardArrowUpIcon onClick={toggleVisibility} />
        ) : (
          <KeyboardArrowDownIcon onClick={toggleVisibility} />
        )}
      </>
    );
  };

  return (
    <>
      <ResultRow
        label="Sale Proceeds"
        value={trade.proceeds()}
        thousandSeparator={true}
        prefix={"$"}
        suffix={""}
        size=""
        border=""
      />
      <ResultRow
        label="Less: Tax"
        value={trade.taxResults().tax}
        thousandSeparator={true}
        prefix={"$"}
        suffix={""}
        size="sm"
        icon={<MyIcon />}
        cursor="pointer"
      />
      {calcVisibility && (
        <DetailedCalc>
          <ResultRow
            label={`Sale Proceeds (${trade.bitcoin} x ${nWC(
              trade.currentPrice
            )})`}
            value={trade.proceeds()}
            thousandSeparator={true}
            prefix={"$"}
            suffix={""}
            size="sm"
            type="calc"
          />
          <ResultRow
            label={`Less: Cost (${trade.bitcoin} x ${nWC(
              trade.averageCost
            )})`}
            value={trade.cost()}
            thousandSeparator={true}
            prefix={"$"}
            suffix={""}
            size="sm"
            type="calc"
          />
          <ResultRow
            label="Total Gain"
            value={nWC(trade.profit())}
            thousandSeparator={true}
            prefix={"$"}
            suffix={""}
            size="sm"
            type="calc"
            border="top"
          />
          <ResultRow
            label={`Taxable Gain (${nWC(trade.profit())} x ${
              trade.taxResults().gainRate
            }%)`}
            value={trade.taxResults().taxableGain}
            thousandSeparator={true}
            prefix={"$"}
            suffix={""}
            size="sm"
            type="calc"
          />
          <ResultRow
            label={`Taxes Owed (${nWC(trade.taxResults().taxableGain)} x ${
              trade.taxRate
            }%)`}
            value={trade.taxResults().tax}
            thousandSeparator={true}
            prefix={"$"}
            suffix={""}
            size="sm"
            type="calc"
            border="top"
          />
        </DetailedCalc>
      )}
      <ResultRow
        label="Net Proceeds"
        value={trade.results().leftOverCash}
        thousandSeparator={true}
        prefix={"$"}
        suffix={""}
        size="lg"
        border="top"
      />
    </>
  );
};

export default TradeResults;

const DetailedCalc = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 0.25rem;
  background-color: #f5f5f5;
  padding: 1rem 0;
  border: 1px dashed #ccc;
  background-color: transparent;
`;
