import React from "react";

import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartDoughnut } from "@coreui/react-chartjs";
import LineChart from "../components/LineChart";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import ChartBarPercentage from "../charts/ChartBarPercentage";
import ProgressBar from "../components/ProgressBar";
import ChartBarMax from "../charts/ChartBarMax";

const numberSuppliers = [
  {
    label: "Short suppliers",
    data: [40],
    backgroundColor: "#00D8FF",
  },
  {
    label: "Medium suppliers",
    data: [25],
    backgroundColor: "#f87979",
  },
  {
    label: "Long suppliers",
    data: [70],
    backgroundColor: "#41B883",
  },
];

const supplierQuality = {
  datasets: [
    {
      label: "Supplier Quality Rating",
      data: [40, 20, 13, 40, 10, 40, 38, 80, 40, 20, 14, 11],
      backgroundColor: "#f87979",
    },
  ],
  labels: [
    "AGC",
    "Brembo",
    "ZF",
    "Fisher",
    "Sika",
    "akg",
    "IRL",
    "MOB",
    "WES",
    "AWS",
    "TES",
    "MJG",
  ],
};

const purchasesInTB = {
  totalPurchases: {
    name: "",
    inTime: 192235,
    total: 343277,
    percentile: 0.559,
  },
  categories: [
    {
      name: "Electrical Supply",
      inTime: 76129,
      total: 160372,
      percentile: 0.4747,
    },
    {
      name: "Logistics",
      inTime: 51223,
      total: 87941,
      percentile: 0.58247,
    },
    {
      name: "Packaging",
      inTime: 37564,
      total: 49906,
      percentile: 0.75269,
    },
    {
      name: "Services",
      inTime: 27319,
      total: 45058,
      percentile: 0.6063,
    },
  ],
};

const suppliers = {
  labels: ["AOC", "Fisher", "MOB", "Others"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
};

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const purchaseOrder = [
  {
    label: "Product Order Cycle Time (days)",
    backgroundColor: hexToRgba(brandInfo, 10),
    borderColor: brandInfo,
    pointHoverBackgroundColor: brandInfo,
    borderWidth: 2,
    data: [123, 31, 45, 123, 25, 42, 23, 83, 112, 32, 180, 91],
  },
  {
    label: "Product Order Lead Time (days)",
    backgroundColor: hexToRgba(brandSuccess, 10),
    borderColor: brandSuccess,
    pointHoverBackgroundColor: brandSuccess,
    borderWidth: 2,
    data: [91, 88, 79, 87, 93, 97, 85, 82, 79, 86, 94, 86],
  },
];

const yLabel = (value, _index, _values) => {
  return `${value}`;
};

export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Procurement = () => {
  const progressBars = [];

  for (let i = 0; i < purchasesInTB.categories.length; i++) {
    progressBars.push(
      <ProgressBar key={`categories${i}`} data={purchasesInTB.categories[i]} />
    );
  }

  return (
    <>
      <CRow>
        <CCol sm="6" lg="6">
          <CCard>
            <CCardHeader>
              <h3>Number of Suppliers</h3>
            </CCardHeader>
            <CCardBody>
              <ChartBarMax datasets={numberSuppliers} />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="6" lg="6">
          <CCard>
            <CCardHeader>
              <h3>Suppliers</h3>
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                type="doughnut"
                datasets={suppliers.datasets}
                labels={suppliers.labels}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="h-100">
        <CCol sm="6" lg="6" className="mb-4">
          <CCard className="h-100">
            <CCardHeader>
              <h3>Supplier Quality Rating</h3>
            </CCardHeader>
            <CCardBody>
              <ChartBarPercentage
                datasets={supplierQuality.datasets}
                labels={supplierQuality.labels}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="6" lg="6" className="mb-4">
          <CCard className="h-100">
            <CCardHeader>
              <h3>Purchases in Time and Budget</h3>
            </CCardHeader>
            <CCardBody>
              <h4 className="mb-0">Total</h4>
              <ProgressBar data={purchasesInTB.totalPurchases} />

              <h4>By category</h4>
              {progressBars}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard className="w-100">
            <CCardHeader className="text-center">
              <h3>Purchase Order Cycle Time and Lead Time</h3>
            </CCardHeader>
            <CCardBody>
              <LineChart datasets={purchaseOrder} callback={yLabel} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Procurement;
