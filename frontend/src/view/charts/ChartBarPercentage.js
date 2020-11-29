import React from 'react'
import { CChartBar } from '@coreui/react-chartjs'

const ChartBarPercentage = (attributes) => {
   const defaultOptions = (()=>{
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 100,
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value + " %";
              },
            },
          },
        ],
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem, data) {
            let label =
              data.datasets[tooltipItem.datasetIndex].label || "";

            if (label) {
              label += ": ";
            }
            label +=
              Math.round(tooltipItem.yLabel * 100) / 100 + "%";
            return label;
          },
        },
      },
    }
  })()

  // render
  return (
    <CChartBar
      type="bar"
      {...attributes}
      options={defaultOptions}
    />
  )
}

export default ChartBarPercentage
