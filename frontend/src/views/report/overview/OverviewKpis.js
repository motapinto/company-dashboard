import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CWidgetDropdown,
} from "@coreui/react";
import MoneyFormat from "../shared/MoneyFormat";

const OverviewKpis = ({ kpis, year }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <CRow>
          <CCol>
            <h4 className="card-title mb-0">Overview KPI's</h4>
            <div className="small text-muted">{year}</div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-5 mt-4">
          <CCol sm="4" className="text-center">
            <h4>Sales Gross Total</h4>
            <h4>{"$ " + MoneyFormat(kpis.sgt)}</h4>
          </CCol>
          <CCol sm="4" className="text-center">
            <h4>Sales Net Total</h4>
            <h4>{"$ " + MoneyFormat(kpis.snt)}</h4>
          </CCol>
          <CCol sm="4" className="text-center">
            <h4>Gross Profit Margin</h4>
            <h4>{kpis.gpm.toFixed(2) + "%"}</h4>
          </CCol>
        </CRow>
        <CRow className="mb-4 mt-5">
          <CCol sm="4" className="text-center">
            <h4>Earning Growth Rate</h4>
            <h4>{kpis.egr.toFixed(2) + "%"}</h4>
          </CCol>
          <CCol sm="4" className="text-center">
            <h4>Revenue Growth Rate</h4>
            <h4>{kpis.rgr.toFixed(2) + "%"}</h4>
          </CCol>
          <CCol sm="4" className="text-center">
            <h4>Net Profit Margin </h4>
            <h4>{kpis.npm.toFixed(2) + "%"}</h4>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default OverviewKpis;
