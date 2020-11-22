import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const LineChart = (attributes) => {
  const defaultOptions = (() => {
    return {
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
              stepSize: Math.ceil(250 / 5),
              max: 250,
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
      {...attributes}
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

export default LineChart;
