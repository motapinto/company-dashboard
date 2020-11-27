import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartDoughnut } from "@coreui/react-chartjs";

export default ({ datasets, labels, year }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <CRow>
          <CCol sm="8">
            <h4 className="card-title mb-0">Sales Region</h4>
            <div className="small text-muted">{year}</div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CChartDoughnut
          type="doughnut"
          datasets={[
            {
              backgroundColor: [
                "#fff2a5",
                "#a2d8a5",
                "#93d1fa",
                "#ffaca5",
                "#f6aa72",
              ],
              data: datasets,
            },
          ]}
          labels={labels}
          options={{ maintainAspectRatio: true }}
        />
      </CCardBody>
    </CCard>
  );
};
