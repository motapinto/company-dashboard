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
import yLabel from "../utils/yLabel";
import {formatNumber} from "../pages/Procurement";

export default ({ dataset, year }) => {
  return (
    <CCard className="mb-xs-4 mb-md-0" style={{ height: "57%" }}>
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
                        callback: yLabel,
                      },
                      gridLines: {
                        display: true,
                      },
                    },
                  ],
                },
                tooltips: {
                  enabled: true,
                  callbacks: {
                    label: function (tooltipItem, data) {
                      let label =
                          data.datasets[tooltipItem.datasetIndex].label || "";

                      if (label) {
                        label += ": ";
                      }

                      label += "$" + formatNumber(tooltipItem.yLabel);
                      return label;
                    }
                  }
                },
              }}
            />
          }
        />
      </CCardBody>
    </CCard>
  );
};
