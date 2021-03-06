import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import { numberWithCommas } from "utils/numberFormatting";

const MyChart = ({ dates, data, invested, currency }) => {
  // const ath = marketData.data.ath.cad

  const options = {
    chart: {
      toolbar: {
        show: false,
        // tools: {
        //     download: false,
        // }
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        // show: false,
        //   show: false,
        formatter: function (value) {
          return "$" + numberWithCommas(value);
        },
        style: {
          colors: ["#fff"],
        },
      },
      // opposite: true,
    },
    xaxis: {
      type: "datetime",
      categories: dates.reverse(),
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    colors: ["#2E99FE", "#FF2F30"],
    tooltip: {
      x: {
        format: "dd MMM HH:mm",
      },
      theme: "dark",
    },
    annotations: {
      // yaxis: [
      //     {
      //         y: ath,
      //         borderColor: '#00E396',
      //         label: {
      //         borderColor: '#00E396',
      //         style: {
      //             color: '#fff',
      //             background: '#00E396'
      //         },
      //         text: `ATH: $${ath}`
      //         },
      //     },
      // ]
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#fff",
      },
    },
  };

  const series = [
    {
      name: `Portfolio Value (${currency})`,
      data: data.reverse(),
    },
    {
      name: `Amount Invested (${currency})`,
      data: invested.reverse(),
    },
  ];

  return (
    <Wrapper>
      <h3>Portfolio Value Over Time</h3>
      <ChartWrapper>
        <Chart
          options={options}
          series={series}
          type="area"
          width="100%"
          height="400px"
        />
      </ChartWrapper>
    </Wrapper>
  );
};

export default MyChart;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  // grid-template-columns: 1fr;
  // justify-items: center;
  background-color: #212b36;
  border-radius: 1rem;
  // color: #263238;
  padding: 1rem;
  @media (min-width: 900px) {
    width: 100%;
  }
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 16px 32px -4px;

  & h3 {
    padding: 1rem;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
`;
