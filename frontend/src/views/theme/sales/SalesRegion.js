import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartDoughnut } from "@coreui/react-chartjs";

export default (attributes) => {
  const data = [40, 65, 42, 22, 15];
  const labels = ["America", "China", "Europe", "Australia", "Africa"];

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm="8">
            <h4 className="card-title mb-0">Sales Region</h4>
            <div className="small text-muted">2019</div>
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
              data: data,
            },
          ]}
          labels={labels}
          options={{ maintainAspectRatio: true }}
        />
      </CCardBody>
    </CCard>
  );
};
