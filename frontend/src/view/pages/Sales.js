import React, { useState } from "react";
import { CRow, CCol } from "@coreui/react";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import COGS from "../components/COGS";
import AOV from "../components/AOV";
import SalesRegion from "../components/SalesRegion";
import TopProducts from "../components/TopProducts";
import ProfitMargin from "../components/ProfitMargin";

import { getOrders } from "../../requests/requests"; // aux

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const Sales = () => {
  const [COGSData, setCOGSData] = useState([
    24,
    37,
    48,
    52,
    63,
    51,
    43,
    31,
    47,
    78,
    52,
    61,
  ]);

  const [AOVData, setAOVData] = useState([
    78,
    81,
    80,
    45,
    34,
    12,
    40,
    55,
    67,
    89,
    76,
    56,
  ]);

  const [GrossProfitMargin, setGrossProfitMargin] = useState([
    98,
    166,
    159,
    122,
    109,
    91,
    139,
    99,
    140,
    193,
    79,
    160,
  ]);

  const [NetProfitMargin, setNetProfitMargin] = useState([
    86,
    82,
    92,
    81,
    86,
    88,
    80,
    92,
    88,
    84,
    46,
    65,
  ]);

  const profitMargin = [
    {
      label: "Gross Profit Margin",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
      data: GrossProfitMargin,
    },
    {
      label: "Net Profit Margin",
      backgroundColor: hexToRgba(brandSuccess, 10),
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
      data: NetProfitMargin,
    },
  ];

  const salesRegionLabels = [
    "America",
    "China",
    "Europe",
    "Australia",
    "Africa",
  ];

  const [salesRegionsData, setSalesRegionsData] = useState([
    40,
    65,
    42,
    22,
    15,
  ]);

  const topProductsLabels = ["name", "price", "totalSold", "status"];

  const [topProductsData, setTopProductsData] = useState([
    {
      id: 0,
      name: "Tesla Model S",
      price: "70.000 $",
      totalSold: "94.000",
      status: "Active",
    },
    {
      id: 1,
      name: "Tesla Model Y",
      price: "45.000 $",
      totalSold: "89.000",
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
      totalSold: "54.500",
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
  ]);

  getOrders();

  return (
    <>
      <CRow>
        <CCol sm="6" lg="6" className="d-flex align-items-stretch">
          <COGS dataset={COGSData} />
        </CCol>
        <CCol sm="6" lg="6" className="d-flex align-items-stretch">
          <AOV dataset={AOVData} />
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
            datasets={salesRegionsData}
            labels={salesRegionLabels}
            year={2019}
          />
        </CCol>
      </CRow>
      <TopProducts
        fields={topProductsLabels}
        productsData={topProductsData}
        year={2019}
      />
    </>
  );
};

export default Sales;
