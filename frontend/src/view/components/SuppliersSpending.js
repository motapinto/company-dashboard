import React from "react";
import { CChartDoughnut } from "@coreui/react-chartjs";
import {formatNumber} from "../pages/Procurement";

export default ({datasets, labels}) => {
  const defaultOptions = (()=>{
    return {
      tooltips: {
        enabled: true,
          callbacks: {
          label: function (tooltipItem, data) {
            let label =
              data.labels[tooltipItem.index] || "";

            if (label) {
              label += ": ";
            }

            label +=
              "$" + formatNumber(data.datasets[0].data[tooltipItem.index]);
            return label;
          },
        },
      }
    }
  })()

  return (
    <CChartDoughnut
    type="doughnut"
    datasets={datasets}
    labels={labels}
    options={defaultOptions}
    />
  )
}
