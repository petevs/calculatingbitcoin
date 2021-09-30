import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const DataChart = ({ xdata, data, title, xtype, annotation}) => {
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
        // formatter: function (value) {
        //   return "$" + numberWithCommas(value);
        // },
        style: {
          colors: ["#fff"],
        },
        min: 0,
      },
      // opposite: true,
    },
    xaxis: {
      type: xtype,
      categories: xdata.reverse(),
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
    annotations: annotation || {},
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
    // markers: {
    //     shape: "circle",
    //     size: [5]
    // }
  };

  const series = data;

  return (
    <Wrapper>
      <h3>{title}</h3>
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

export default DataChart;

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
  margin-bottom: 1rem;
`;

const ChartWrapper = styled.div`
  width: 100%;
`;
