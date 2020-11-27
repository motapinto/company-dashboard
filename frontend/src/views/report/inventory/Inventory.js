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
  CCallout,
  CProgress,
  CCardHeader,
  CCardFooter,
  CButtonGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  CChartBar
}
  from "@coreui/react-chartjs";
import ChartBarSimple from "../../charts/ChartBarSimple";
import ChartLineSimple from "../../charts/ChartLineSimple";
import MainChartExample from "../../charts/MainChartExample.js";



const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const fields = ["name", "price", "totalSold", "status"];
const productsData = [
  {
    id: 0,
    name: "Tesla Model S",
    price: "70.000 $",
    totalSold: "24.000",
    status: "Active",
  },
  {
    id: 1,
    name: "Tesla Model Y",
    price: "45.000 $",
    totalSold: "49.000",
    status: "Inactive",
  },
  {
    id: 2,
    name: "Tesla Model 3",
    price: "35.000 $",
    totalSold: "77.000",
    status: "Active",
  },
  {
    id: 3,
    name: "Tesla Model X",
    price: "120.000 $",
    totalSold: "34.500",
    status: "Banned",
  },
  {
    id: 4,
    name: "Tesla Roadster",
    price: "200.000 $",
    totalSold: "0",
    status: "Pending",
  },
  {
    id: 5,
    name: "Cybertruck",
    price: "39.900 $",
    totalSold: "0",
    status: "Pending",
  },
];

const Inventory = () => {
  return (
    <>
      <CRow>
        <CCol md="6">
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <h4>Total Assets in Stock</h4>
                </CCardHeader>
                <CCardBody>
                  <h2>9,323K €</h2>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <h4>Average Days to Sell Inventory</h4>
                </CCardHeader>
                <CCardBody>
                  <h2>30</h2>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard className="p-1 h-100">
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <h4 className="card-title mb-0">Monthly Average Inventory</h4>
                      <div className="small text-muted">2019</div>
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
                            label: 'GitHub Commits',
                            backgroundColor: '#41B883',
                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
                            barPercentage: 0.6,
                            categoryPercentage: 1,
                          }
                        ]}
                        labels="months"
                        options={{
                          tooltips: {
                            enabled: true
                          }
                        }}
                      />
                    }
                  >
                  </CWidgetDropdown>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
        <CCol md="6">
          <CCard className="h-100">
            <CCardHeader>
              <CRow>
                <CCol>
                  <h4 className="card-title mb-0">Monthly Inventory Turnover</h4>
                  <div className="small text-muted">2019</div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6">
                  <CCallout color="info">
                    <small className="text-muted">Replaced</small>
                    <br />
                    <strong className="h4">9,123</strong>
                  </CCallout>
                </CCol>
                <CCol sm="6">
                  <CCallout color="danger">
                    <small className="text-muted">Sold</small>
                    <br />
                    <strong className="h4">22,643</strong>
                  </CCallout>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">January</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="34"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="78"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">February</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="56"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="94"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">March</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="12"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="67"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">April</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="43"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="91"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">May</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="22"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="73"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">June</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="53"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="82"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">July</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="9"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="69"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">August</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="49"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="74"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">September</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="55"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="72"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">October</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="33"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="55"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">November</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="65"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="83"
                  />
                </div>
              </div>
              <div className="progress-group mb-4">
                <div className="progress-group-prepend">
                  <span className="progress-group-text">December</span>
                </div>
                <div className="progress-group-bars">
                  <CProgress
                    className="progress-xs"
                    color="info"
                    value="71"
                  />
                  <CProgress
                    className="progress-xs"
                    color="danger"
                    value="95"
                  />
                </div>
              </div>
              <div className="legend text-center">
                <small>
                  <sup className="px-1">
                    <CBadge shape="pill" color="info">
                      &nbsp;
                    </CBadge>
                  </sup>
                Replaced &nbsp;
                <sup className="px-1">
                    <CBadge shape="pill" color="danger">
                      &nbsp;
                  </CBadge>
                  </sup>
                Sold
              </small>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>



      <CRow className="h-100 mt-5">
        <CCol>
          <CCard className="h-100">
            <CCardHeader>
              <CRow>
                <CCol>
                  <h4 className="card-title mb-0">Top Products</h4>
                  <div className="small text-muted">2019</div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={productsData}
                fields={fields}
                itemsPerPage={5}
                hover
                bordered
                pagination
                clickableRows
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Inventory;
