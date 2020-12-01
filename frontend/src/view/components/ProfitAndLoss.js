import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import MoneyFormat from "../utils/MoneyFormat";

export default ({
  profitAndLossCost,
  profitAndLossRevenue,
  ebitda,
  ebitdaMargin,
  year,
}) => {
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
                <h4>$ {MoneyFormat(profitAndLossRevenue[0].data[0])}</h4>
              </CCol>
              <CCol className="justify-content-center text-center">
                <h4>$ {MoneyFormat(profitAndLossCost[0].data[0])}</h4>
              </CCol>
            </CRow>
            <CRow>
              <CCol style={{ height: "20rem" }} className="text-center">
                <CChartBar
                  className="h-100"
                  type="bar"
                  labels={["Assets"]}
                  datasets={profitAndLossRevenue}
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
                              profitAndLossCost[0].data[0],
                              profitAndLossRevenue[0].data[0]
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
                  labels={["Assets"]}
                  datasets={profitAndLossCost}
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
                              profitAndLossCost[0].data[0],
                              profitAndLossRevenue[0].data[0]
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
                <h4>Cost</h4>
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
