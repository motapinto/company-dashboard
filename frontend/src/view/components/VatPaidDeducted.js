import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CCallout,
} from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import MoneyFormat from "../utils/MoneyFormat";
import {formatNumber} from "../pages/Procurement";

export default ({ vatPaidDeducted, year }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <h4 id="traffic" className="card-title mb-0">
          Vat Paid/Deducted
        </h4>
        <div className="small text-muted">{year}</div>
      </CCardHeader>
      <CCardBody className="align-middle pt-0">
        <CRow>
          <CCol xs="6" sm="6">
            <CCallout color="danger">
              <small className="text-muted">Paid</small>
              <br />
              <strong className="h4">
                {"$ "}
                {MoneyFormat(totalPaid(vatPaidDeducted))}
              </strong>
            </CCallout>
          </CCol>
          <CCol xs="6" sm="6">
            <CCallout color="success">
              <small className="text-muted">Deducted</small>
              <br />
              <strong className="h4">
                {"$ "}
                {MoneyFormat(totalDeducted(vatPaidDeducted))}
              </strong>
            </CCallout>
          </CCol>
        </CRow>
        <CChartBar
          type="bar"
          datasets={vatPaidDeducted}
          labels="months"
          options={{
            maintainAspectRatio: true,
            responsive: true,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return "$ " + formatNumber(value);
                    },
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
                  label += "$ " + formatNumber(tooltipItem.yLabel);
                  return label;
                },
              }
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};

function totalDeducted(vatPaidDeducted) {
  let totalDeducted = 0;

  for (let i = 0; i < vatPaidDeducted[1].data.length; i++) {
    totalDeducted += vatPaidDeducted[1].data[i];
  }

  return totalDeducted;
}

function totalPaid(vatPaidDeducted) {
  let totalPaid = 0;

  for (let i = 0; i < vatPaidDeducted[0].data.length; i++) {
    totalPaid += vatPaidDeducted[0].data[i];
  }

  return totalPaid;
}
