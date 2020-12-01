import React from "react";

import {
  CRow,
  CCol,
  CBadge,
  CCard,
  CCardBody,
  CCallout,
  CProgress,
  CCardHeader,
} from "@coreui/react";

export default ({ labels, data1, data2, year }) => {
  let bars = [];
  for (let i = 0; i < data1.data.length && i < data2.data.length && i < labels.length; i++) {
    bars.push(
      <div key={"data-progress-"+i} className="progress-group mb-4">
        <div className="progress-group-prepend">
          <span className="progress-group-text">{labels[i]}</span>
        </div>
        <div className="progress-group-bars">
          <CProgress className="progress-xs" color="info" value={data1.data[i]} />
          <CProgress className="progress-xs" color="danger" value={data2.data[i]} />
        </div>
      </div>
    );
  }

  return (
    <CCard className="h-100">
      <CCardHeader>
        <CRow>
          <CCol>
            <h4 className="card-title mb-0">Monthly Inventory Turnover</h4>
            <div className="small text-muted">{year}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="6">
            <CCallout color="info">
              <small className="text-muted">{data1.label}</small>
              <br />
              <strong className="h4">{data1.total}</strong>
            </CCallout>
          </CCol>
          <CCol sm="6">
            <CCallout color="danger">
              <small className="text-muted">{data2.label}</small>
              <br />
              <strong className="h4">{data2.total}</strong>
            </CCallout>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        {bars}
        <div className="legend text-center">
          <small>
            <sup className="px-1">
              <CBadge shape="pill" color="info">
                &nbsp;
              </CBadge>
            </sup>
            {data1.label} &nbsp;
            <sup className="px-1">
              <CBadge shape="pill" color="danger">
                &nbsp;
              </CBadge>
            </sup>
            {data2.label}
          </small>
        </div>
      </CCardBody>
    </CCard>
  );
};
