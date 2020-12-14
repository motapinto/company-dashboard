import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import MoneyFormat from "../utils/MoneyFormat";

export default ({ kpis, year }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <CRow>
          <CCol>
            <h4 className="card-title mb-0">Dashboard KPI's</h4>
            <div className="small text-muted">{year}</div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CRow className="mt-3">
          <CCol md="4" className="text-center mb-xs-4 mb-sm-4 mb-md-0">
            <h4>Sales Gross Total</h4>
            <h4>{"$ " + MoneyFormat(kpis.sgt)}</h4>
          </CCol>
          <CCol md="4" className="text-center mb-xs-4 mb-sm-4 mb-md-0">
            <h4>Sales Net Total</h4>
            <h4>{"$ " + MoneyFormat(kpis.snt)}</h4>
          </CCol>
          <CCol md="4" className="text-center mb-xs-4 mb-sm-4 mb-md-0">
            <h4>Gross Profit Margin</h4>
            <h4>{kpis.gpm.toFixed(2) + "%"}</h4>
          </CCol>
        </CRow>
        <CRow className="mt-sm-0 mt-md-5 mb-3">
          <CCol md="4" className="text-center mb-xs-4 mb-sm-4 mb-md-0">
            <h4>EBITDA</h4>
            <h4>{"$ " + MoneyFormat(kpis.ebitda)}</h4>
          </CCol>
          <CCol md="4" className="text-center mb-xs-4 mb-sm-4 mb-md-0">
            <h4>Net Income</h4>
            <h4>{"$ " + MoneyFormat(kpis.netIncome)}</h4>
          </CCol>
          <CCol md="4" className="text-center">
            <h4>Net Profit Margin </h4>
            <h4>{kpis.npm.toFixed(2) + "%"}</h4>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};
