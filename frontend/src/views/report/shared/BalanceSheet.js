import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import MoneyFormat from "./MoneyFormat";

export default ({ balanceSheetAssets, balanceSheetEquity, year }) => {
  return (
    <CCard>
      <CCardHeader>
        <h4 className="card-title mb-0">Balance Sheet</h4>
        <div className="small text-muted">{year}</div>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol className="justify-content-center text-center">
            <h4>
              {"$ "}
              {MoneyFormat(
                balanceSheetAssets[0].data[0] + balanceSheetAssets[1].data[0]
              )}
            </h4>
          </CCol>

          <CCol className="justify-content-center text-center">
            <h4>
              {"$ "}
              {MoneyFormat(
                balanceSheetEquity[0].data[0] + balanceSheetEquity[1].data[0]
              )}
            </h4>
          </CCol>
        </CRow>
        <CRow>
          <CCol style={{ height: "20rem" }} className="text-center">
            <CChartBar
              className="h-100"
              type="bar"
              labels={["Assets"]}
              datasets={balanceSheetAssets}
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
                          balanceSheetAssets[0].data[0] +
                            balanceSheetAssets[1].data[0],
                          balanceSheetEquity[0].data[0] +
                            balanceSheetEquity[1].data[0] +
                            balanceSheetEquity[2].data[0]
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
              labels={["Equity $ Liabilities"]}
              datasets={balanceSheetEquity}
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
                        max:
                          balanceSheetAssets[0].data[0] +
                          balanceSheetAssets[1].data[0],
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
            <h4>Assets</h4>
          </CCol>

          <CCol className="justify-content-center text-center">
            <h4>Equity & Liabilities</h4>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};
