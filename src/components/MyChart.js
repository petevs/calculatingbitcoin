import React from 'react'
import styled from 'styled-components'
import Chart from 'react-apexcharts'

const MyChart = ({dates, data}) => {

// const ath = marketData.data.ath.cad

const options = {
    chart: {
        toolbar: {
            tools: {
                download: false,
            }
        }
    },
    dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
        //   show: false,
            // formatter: function (value) {
            //   return "$" + numberWithCommas(value);
            // }
            style: {
                colors: ['#fff']
            }
          },
        opposite: true,
    },
    xaxis: {
        type: 'datetime',
        categories: dates.reverse(),
    },
    colors: ['#F7931C'],
    tooltip: {
        x: {
            format: 'dd MMM HH:mm'
        }
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
              }
          }
      }
}

const series = [
    {
        name: "Price",
        data: data.reverse()
    }
]

return (
    <Wrapper>
        <ChartWrapper>
            <Chart
                options={options}
                series={series}
                type="area"
                width="100%"
                height='400px'
            />
        </ChartWrapper>
    </Wrapper>
)
}

export default MyChart

const Wrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr;
    justify-items: center;
    // background-color: #fff;
    // box-shadow: 0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50);
    // transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    // color: #263238;
    padding: 1rem;
    @media (min-width: 900px) {
      width: 100%;
    }
    margin-top: 1rem;
    `

const ChartWrapper = styled.div`
    width: 100%;
`