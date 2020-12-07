import React from "react";
import { CChartBar } from "@coreui/react-chartjs";

const ChartBarMax = (attributes) => {
  const defaultOptions = ((datasets) => {
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              max:
                Math.max.apply(
                  Math,
                  datasets.map((element) => {
                    return element.data[0];
                  })
                ) + 10,
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
