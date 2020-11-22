import React from "react";
import { CRow, CCol } from "@coreui/react";
import COGS from "./COGS";
import AOV from "./AOV";
import SalesRegion from "./SalesRegion";
import TopProducts from "./TopProducts";
import ProfitMargin from "./ProfitMargin";

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
          <ProfitMargin />
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
