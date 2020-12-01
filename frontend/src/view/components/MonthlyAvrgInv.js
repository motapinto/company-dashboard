import React from "react";

import {
  CWidgetDropdown,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";

export default ({ dataset, year }) => {
  return (
    <CCard className="p-1 h-100">
      <CCardHeader>
        <CRow>
          <CCol>
            <h4 className="card-title mb-0">Monthly Average Inventory</h4>
            <div className="small text-muted">{year}</div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CWidgetDropdown
          footerSlot={
            <CChartBar
              type="bar"
              datasets={[
                {
                  label: "Monthly Inventory",
                  backgroundColor: "#41B883",
                  data: dataset,
                  barPercentage: 0.6,
                  categoryPercentage: 1,
                },
              ]}
              labels="months"
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                tooltips: {
                  enabled: true,
                },
              }}
            />
          }
        />
      </CCardBody>
    </CCard>
  );
};
