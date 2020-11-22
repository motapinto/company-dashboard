import React from "react";

import {
  CWidgetDropdown,
  CRow,
  CCol,
  CBadge,
  CCard,
  CCardBody,
  CDataTable,
  CButton,
  CCardHeader,
  CHeader,
  CCallout,
} from "@coreui/react";
import { CChartBar, CChartDoughnut } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../../charts/ChartLineSimple";
import ChartBarSimple from "../../charts/ChartBarSimple";
import ProfitMarginChart from "../sales/ProfitMargin.js";
import { flagSet } from "@coreui/icons";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import LineChart from "../../charts/LineChart.js";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const profitMargin = [
  {
    label: "Gross Profit Margin",
    backgroundColor: hexToRgba(brandInfo, 10),
    borderColor: brandInfo,
    pointHoverBackgroundColor: brandInfo,
    borderWidth: 2,
    data: [98, 166, 159, 122, 109, 91, 139, 99, 140, 193, 79, 160],
  },
  {
    label: "Net Profit Margin",
    backgroundColor: hexToRgba(brandSuccess, 10),
    borderColor: brandSuccess,
    pointHoverBackgroundColor: brandSuccess,
    borderWidth: 2,
    data: [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65],
  },
];

const vatPaidDeducted = [
  {
    label: "Paid",
    backgroundColor: "#f87979",
    data: [32, 22, 22, 23, 6, 133, 1, 44, 11, 8, 21, 65],
  },
  {
    label: "Deducted",
    backgroundColor: "#4dbd74",
    data: [3, 4, 24, 24, 22, 33, 22, 1, 21, 65, 31, 44],
  },
];

const balanceSheetAssets = [
  {
    label: "NCA",
    backgroundColor: "#4dbd74",
    data: [8223232],
  },
  {
    label: "CA",
    backgroundColor: "#597D35",
    data: [4343433],
  },
];

const balanceSheetEquity = [
  {
    label: "CL",
    backgroundColor: "#680C07",
    data: [3123121],
  },
  {
    label: "NCL",
    backgroundColor: "#900D09",
    data: [2323323],
  },
  {
    label: "E",
    backgroundColor: "#f87979",
    data: [2323323],
  },
];

const profitAndLossRevenue = [
  {
    label: "R",
    backgroundColor: "#4dbd74",
    data: [2312323],
  },
];

const profitAndLossCost = [
  {
    label: "O",
    backgroundColor: "#f87979",
    data: [3123121],
  },
];

const yLabel = (value, _index, _values) => {
  return `$ ${value}K`;
};

const ebitda = 985445;
const ebitdaMargin = 10.45;

const Financial = () => {
  return (
    <>
      <CRow className="mb-4">
        <CCol sm="12" md="12" lg="6">
          <CCard className="h-100">
            <CCardHeader>
              <h4 id="traffic" className="card-title mb-0">
                Vat Paid/Deducted
              </h4>
              <div className="small text-muted">2019</div>
            </CCardHeader>
            <CCardBody className="align-middle pt-0">
              <CRow>
                <CCol sm="6">
                  <CCallout color="lightRed">
                    <small className="text-muted">Paid</small>
                    <br />
                    <strong className="h4">9,123</strong>
                  </CCallout>
                </CCol>
                <CCol sm="6">
                  <CCallout color="lightGreen">
                    <small className="text-muted">Deducted</small>
                    <br />
                    <strong className="h4">22,643</strong>
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
                            return "$" + value;
                          },
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
        </CCol>
        <CCol md="12" lg="6" className="mt-4 mt-md-4 mt-lg-0">
          <CCard style={{ height: "100%" }}>
            <CCardHeader>
              <h4 id="traffic" className="card-title mb-0">
                Profit Margin
              </h4>
              <div className="small text-muted">2019</div>
            </CCardHeader>
            <CCardBody>
              <LineChart datasets={profitMargin} callback={yLabel} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="5">
          <CCard>
            <CCardHeader>
              <h4 className="card-title mb-0">Balance Sheet</h4>
              <div className="small text-muted">2019</div>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol className="justify-content-center text-center">
                  <h4>1.78M €</h4>
                </CCol>

                <CCol className="justify-content-center text-center">
                  <h4>1.78M €</h4>
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
        </CCol>
        <CCol md="7">
          <CCard>
            <CCardHeader>
              <h4 className="card-title mb-0">Profit and Loss</h4>
              <div className="small text-muted">2019</div>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md="12" lg="9">
                  <CRow>
                    <CCol className="justify-content-center text-center">
                      <h4>1.05M €</h4>
                    </CCol>
                    <CCol className="justify-content-center text-center">
                      <h4>1.02M €</h4>
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
                  <h4>{ebitda}€</h4>
                  <h4>EBITDA Margin</h4>
                  <h4>{ebitdaMargin}%</h4>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Financial;
