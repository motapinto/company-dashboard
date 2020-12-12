import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import MoneyFormat from "../utils/MoneyFormat";

export default ({ expenses, revenue, ebitda, ebitdaMargin, year }) => {
  console.log(expenses[0].data);
  console.log(revenue[0].data);
  console.log(ebitda);
  return (
    <CCard className="w-100">
      <CCardHeader>
        <h4 className="card-title mb-0">Profit and Loss</h4>
        <div className="small text-muted">{year}</div>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md="12" lg="9">
            <CRow>
              <CCol className="justify-content-center text-center">
                <h4>$ {MoneyFormat(revenue[0].data)}</h4>
              </CCol>
              <CCol className="justify-content-center text-center">
                <h4>$ {MoneyFormat(expenses[0].data)}</h4>
              </CCol>
            </CRow>
            <CRow>
              <CCol style={{ height: "20rem" }} className="text-center">
                <CChartBar
                  className="h-100"
                  type="bar"
                  labels={["Revenue"]}
                  datasets={revenue}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      display: true,
                    },
                    scales: {
                      xAxes: [
                        {
                          display: false,
                          stacked: true,
                        },
                      ],
                      yAxes: [
                        {
                          ticks: {
                            max: Math.max(
                              expenses[0].data,
                              revenue[0].data
                            ),
                          },
                          beginAtZero: true,
                          display: false,
                          stacked: true,
                        },
                      ],
                    },
                    tooltips: {
                      enabled: true,
                    },
                  }}
                ></CChartBar>
              </CCol>
              <CCol style={{ height: "20rem" }} className="text-center">
                <CChartBar
                  className="h-100"
                  type="bar"
                  labels={["Expenses"]}
                  datasets={expenses}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      display: true,
                    },
                    scales: {
                      xAxes: [
                        {
                          display: false,
                          stacked: true,
                        },
                      ],
                      yAxes: [
                        {
                          ticks: {
                            max: Math.max(
                              expenses[0].data,
                              revenue[0].data
                            ),
                          },
                          beginAtZero: true,
                          display: false,
                          stacked: true,
                        },
                      ],
                    },
                    tooltips: {
                      enabled: true,
                    },
                  }}
                ></CChartBar>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="justify-content-center text-center">
                <h4>Revenue</h4>
              </CCol>
              <CCol className="justify-content-center text-center">
                <h4>expenses</h4>
              </CCol>
            </CRow>
          </CCol>
          <CCol md="12" lg="3" className="d-none d-lg-block">
            <h4>EBITDA</h4>
            <h4>$ {MoneyFormat(ebitda)}</h4>
            <h4>EBITDA Margin</h4>
            <h4>{ebitdaMargin}%</h4>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};
