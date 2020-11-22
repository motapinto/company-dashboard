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
} from "@coreui/react";
import { CChartDoughnut } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../../charts/ChartLineSimple";
import ChartBarSimple from "../../charts/ChartBarSimple";
import LineChart from "../../charts/LineChart.js";
import { getStyle, hexToRgba } from "@coreui/utils/src";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

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

const yLabel = (value, _index, _values) => {
  return `$ ${value}K`;
};

const cogsCallback = (value, _index, _values) => {
  return `$ ${value}K`;
};

const Sales = () => {
  return (
    <>
      <CRow className="mb-4">
        <CCol>
          <CWidgetDropdown
            color="dark"
            className="h-100"
            header="$ 20B"
            text="Cost of Goods Sold"
            footerSlot={
              <ChartBarSimple
                style={{ height: "70px" }}
                backgroundColor="primary"
                dataPoints={[24, 37, 48, 52, 63, 51, 43, 31, 47, 78, 52, 61]}
                pointHoverBackgroundColor="danger"
                label="COGS"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>
        <CCol>
          <CWidgetDropdown
            color="dark"
            className="h-100"
            header="$ 50.000"
            text="Average Order Value (AOV)"
            footerSlot={
              <ChartLineSimple
                style={{ height: "70px" }}
                backgroundColor="primary"
                dataPoints={[78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56]}
                pointHoverBackgroundColor="danger"
                label="AOV"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="8">
                  <h4 id="traffic" className="card-title mb-0">
                    Profit Margin
                  </h4>
                  <div className="small text-muted">2019</div>
                </CCol>
              </CRow>
              <LineChart datasets={profitMargin} callback={yLabel} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="8">
                  <h4 className="card-title mb-0">Sales Region</h4>
                  <div className="small text-muted">2019</div>
                </CCol>
              </CRow>
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
                    data: [40, 65, 42, 22, 15],
                  },
                ]}
                labels={["America", "China", "Europe", "Australia", "Africa"]}
                options={{ maintainAspectRatio: true }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 className="card-title mb-0">Top Products</h4>
              <div className="small text-muted">2019</div>
            </CCol>
          </CRow>
          <CDataTable
            items={productsData}
            fields={fields}
            itemsPerPage={5}
            hover
            bordered
            pagination
            options={{
              aspectRatio: false,
            }}
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
    </>
  );
};

export default Sales;
