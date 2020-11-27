import React from "react";
import { CRow, CCol } from "@coreui/react";
import COGS from "./COGS";
import AOV from "./AOV";
import SalesRegion from "./SalesRegion";
import TopProducts from "./TopProducts";
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

const Sales = () => {
  return (
    <>
      <CRow className="mb-4">
        <CCol>
          <COGS />
        </CCol>
        <CCol>
          <AOV />
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
          <SalesRegion />
        </CCol>
      </CRow>
      <TopProducts />
    </>
  );
};

export default Sales;
