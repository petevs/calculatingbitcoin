import React from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";

const Scorecard = ({ name, value, comp, change, prefix, suffix }) => {
  const changeClass = () => {
    if (change < 0) {
      return { class: "neg", prefix: "" };
    } else {
      return { class: "", prefix: "⬆" };
    }
  };

  return (
    <Card>
      <Title>{name}</Title>
      <Row>
        <Value>
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            prefix={prefix}
            suffix={suffix}
          />
        </Value>
        {comp}
        {change ? (
          <Change className={changeClass().class}>
            <NumberFormat
              value={change}
              displayType={"text"}
              thousandSeparator={true}
              prefix={`${changeClass().prefix} `}
              suffix='%'
            />
          </Change>
        ) : (
          <></>
        )}
      </Row>
    </Card>
  );
};

export default Scorecard;

const Card = styled.div`
  display: grid;
  background-color: #212b36;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  gap: 0;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 2px 0 rgba(63, 63, 68, 0.15);
  & * {
    margin: 0;
  }
`;
const Title = styled.h3`
  font-size: 0.75rem;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
`;

const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: baseline;
  gap: 0.25rem;
`;

const Value = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
`;

const Change = styled.h6`
  font-size: 0.75rem;
  color: #4caf50;
  background-color: rgba(76, 175, 80, 0.08);
  justify-self: start;
  padding: 0.125rem;
  &.neg {
    background-color: rgba(244, 67, 54, 0.08);
    color: #fa4336;
  }
`;
