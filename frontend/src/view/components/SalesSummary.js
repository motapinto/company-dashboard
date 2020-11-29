import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import MoneyFormat from "../utils/MoneyFormat";

const yLabel = (value, _index, _values) => {
  return `$ ` + MoneyFormat(value);
};

const SalesSummary = ({ datasets, year }) => {
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
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: yLabel,
                  },
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

export default SalesSummary;
