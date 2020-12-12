import React from "react";
import { CChartBar } from "@coreui/react-chartjs";

const ChartBarMax = (attributes) => {
  const defaultOptions = ((datasets) => {
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      tooltips: {
        enabled: true,
      },
    };
  })(attributes.datasets);

  return (
    <CChartBar
      type="bar"
      {...attributes}
      labels="suppliers"
      options={defaultOptions}
    />
  );
};

export default ChartBarMax;
