import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const PurchaseOrderTimeChart = (params, attributes) => {
  const datasets = ((orderCycle, orderLead) => {
    return [
    {
      label: "Product Order Cycle Time (days)",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
      data: orderCycle
    },
    {
      label: "Product Order Lead Time (days)",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
      data: orderLead
    }
  ]})(params.orderCycle, params.orderLead);

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
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

  // render
  return (
    <CChartLine
      {...attributes}
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
        "Dec"
      ]}
    />
  );
};

export default PurchaseOrderTimeChart;
