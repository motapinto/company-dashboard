import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import {formatNumber} from "../pages/Procurement";

export default ({ datasets, callback, tooltipCallback }) => {
  const defaultOptions = (() => {
    return {
      tooltips: {
        enabled: true,
        callbacks: {
          label: tooltipCallback
        },
      },
      maintainAspectRatio: true,
      legend: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              callback: callback,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  return (
    <CChartLine
      datasets={datasets}
      options={defaultOptions}
      labels={[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jue",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ]}
    />
  );
};
