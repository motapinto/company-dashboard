import React from "react";
import { CRow, CCol } from "@coreui/react";
import COGS from "./COGS";
import AOV from "./AOV";
import SalesRegion from "../shared/SalesRegion";
import TopProducts from "../shared/TopProducts";
import ProfitMargin from "../shared/ProfitMargin";
import { getStyle, hexToRgba } from "@coreui/utils/src";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const profitMargin = [
  {
    label: "Gross Profit Margin",
    backgroundColor: hexToRgba(brandInfo, 10),
    borderColor: brandInfo,
    pointHoverBackgroundColor: brandInfo,
    borderWidth: 2,
    data: [98, 166, 159, 122, 109, 91, 139, 99, 140, 193, 79, 160],
  },
  {
    label: "Net Profit Margin",
    backgroundColor: hexToRgba(brandSuccess, 10),
    borderColor: brandSuccess,
    pointHoverBackgroundColor: brandSuccess,
    borderWidth: 2,
    data: [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65],
  },
];

const fields = ["name", "price", "totalSold", "status"];
const productsData = [
  {
    id: 0,
    name: "Tesla Model S",
    price: "70.000 $",
    totalSold: "24.000",
    status: "Active",
  },
  {
    id: 1,
    name: "Tesla Model Y",
    price: "45.000 $",
    totalSold: "49.000",
    status: "Inactive",
  },
  {
    id: 2,
    name: "Tesla Model 3",
    price: "35.000 $",
    totalSold: "77.000",
    status: "Active",
  },
  {
    id: 3,
    name: "Tesla Model X",
    price: "120.000 $",
    totalSold: "34.500",
    status: "Banned",
  },
  {
    id: 4,
    name: "Tesla Roadster",
    price: "200.000 $",
    totalSold: "0",
    status: "Pending",
  },
  {
    id: 5,
    name: "Cybertruck",
    price: "39.900 $",
    totalSold: "0",
    status: "Pending",
  },
];

const regionSalesData = [40, 65, 42, 22, 15];
const regionLabels = ["America", "China", "Europe", "Australia", "Africa"];

const COGSDataset = [24, 37, 48, 52, 63, 51, 43, 31, 47, 78, 52, 61];
const AOVDataset = [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];

const Sales = () => {
  return (
    <>
      <CRow>
        <CCol sm="6" lg="6" className="d-flex align-items-stretch">
          <COGS dataset={COGSDataset} />
        </CCol>
        <CCol sm="6" lg="6" className="d-flex align-items-stretch">
          <AOV dataset={AOVDataset} />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <ProfitMargin
            profitMargin={profitMargin}
            year={2019}
            heightValue="auto"
          />
        </CCol>
        <CCol>
          <SalesRegion
            datasets={regionSalesData}
            labels={regionLabels}
            year={2019}
          />
        </CCol>
      </CRow>
      <TopProducts fields={fields} productsData={productsData} year={2019} />
    </>
  );
};

export default Sales;
