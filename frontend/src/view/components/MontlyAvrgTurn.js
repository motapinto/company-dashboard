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

export default ({ replaced, sold, year }) => {
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
              <small className="text-muted">Replaced</small>
              <br />
              <strong className="h4">{replaced}</strong>
            </CCallout>
          </CCol>
          <CCol sm="6">
            <CCallout color="danger">
              <small className="text-muted">Sold</small>
              <br />
              <strong className="h4">{sold}</strong>
            </CCallout>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">January</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="34" />
            <CProgress className="progress-xs" color="danger" value="78" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">February</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="56" />
            <CProgress className="progress-xs" color="danger" value="94" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">March</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="12" />
            <CProgress className="progress-xs" color="danger" value="67" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">April</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="43" />
            <CProgress className="progress-xs" color="danger" value="91" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">May</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="22" />
            <CProgress className="progress-xs" color="danger" value="73" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">June</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="53" />
            <CProgress className="progress-xs" color="danger" value="82" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">July</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="9" />
            <CProgress className="progress-xs" color="danger" value="69" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">August</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="49" />
            <CProgress className="progress-xs" color="danger" value="74" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">September</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="55" />
            <CProgress className="progress-xs" color="danger" value="72" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">October</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="33" />
            <CProgress className="progress-xs" color="danger" value="55" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">November</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="65" />
            <CProgress className="progress-xs" color="danger" value="83" />
          </div>
        </div>
        <div className="progress-group mb-4">
          <div className="progress-group-prepend">
            <span className="progress-group-text">December</span>
          </div>
          <div className="progress-group-bars">
            <CProgress className="progress-xs" color="info" value="71" />
            <CProgress className="progress-xs" color="danger" value="95" />
          </div>
        </div>
        <div className="legend text-center">
          <small>
            <sup className="px-1">
              <CBadge shape="pill" color="info">
                &nbsp;
              </CBadge>
            </sup>
            Replaced &nbsp;
            <sup className="px-1">
              <CBadge shape="pill" color="danger">
                &nbsp;
              </CBadge>
            </sup>
            Sold
          </small>
        </div>
      </CCardBody>
    </CCard>
  );
};
