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
import ProfitMarginChart from "./ProfitMargin.js";

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

const Sales = () => {
  return (
    <>
      <CRow>
        <CCol sm="6" lg="6">
          <CWidgetDropdown
            color="gradient-secondary"
            header="20.51 B$"
            text="Cost of Goods Sold"
            footerSlot={
              <ChartBarSimple
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                backgroundColor="rgb(250, 152, 152)"
                dataPoints={[24, 37, 48, 52, 63, 51, 43, 31, 47, 78, 52, 61]}
                label="COGS"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="6">
          <CWidgetDropdown
            color="gradient-danger"
            header="$50.000"
            text="Average Order Value (AOV)"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{ height: "70px" }}
                backgroundColor="rgba(255,255,255,.2)"
                dataPoints={[78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56]}
                options={{ elements: { line: { borderWidth: 2.5 } } }}
                pointHoverBackgroundColor="danger"
                label="AOV"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>
      </CRow>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 className="card-title mb-0">Top Products</h4>
              <div className="small text-muted">2019</div>
            </CCol>
            <CCol className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
            </CCol>
          </CRow>
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
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Profit Margin
              </h4>
              <div className="small text-muted">2019</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
            </CCol>
          </CRow>
          <ProfitMarginChart style={{ height: "300px", marginTop: "40px" }} />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 className="card-title mb-0">Sales Region</h4>
              <div className="small text-muted">2019</div>
            </CCol>
            <CCol className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
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
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Sales;
