import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import yLabel from '../utils/yLabel'

export default ({ datasets, year }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <CRow>
          <CCol>
            <h4 className="card-title mb-0">Sales Summary</h4>
            <div className="small text-muted">{year}</div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CChartBar
          type="bar"
          datasets={datasets}
          labels="months"
          options={{
            maintainAspectRatio: true,
            responsive: true,
            legend: {
              display: true,
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: { callback: yLabel },
                },
              ],
            },
            tooltips: {
              enabled: true,
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};
