import React from "react";

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
} from '@coreui/react'

import ChartLineSimple from "../../charts/ChartLineSimple";
import ChartBarSimple from "../../charts/ChartBarSimple";
import LineChart from "../../charts/LineChart";
import {getStyle, hexToRgba} from "@coreui/utils/src";

const ProductInfo = [
  {
    id: 0,
    name: "Tesla Model S",
    supplier: "Tesla",
    cost: "70.000 $",
    profit: "24.000",
    details: "Model S is built from the ground up as an electric vehicle, with high-strength architecture and a floor-mounted battery pack allowing for incredible impact protection.",
  },
];

const fields = ["name", "quantity", "amount"];
const clientsData = [
  {
    id: 0,
    name: "José",
    quantity: "3000",
    amount: "100.000 €",
  },
  {
    id: 1,
    name: "Luís",
    quantity: "2152",
    amount: "89.000 €",
  },
  {
    id: 2,
    name: "Carlos",
    quantity: "1632",
    amount: "76.000 €",
  },
  {
    id: 3,
    name: "Martim",
    quantity: "1543",
    amount: "70.000 €",
  },
  {
    id: 4,
    name: "Kiko",
    quantity: "1364",
    amount: "67.000 €",
  },
];

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const purchaseOrder = [
  {
    label: "Gross Profit",
    backgroundColor: hexToRgba(brandInfo, 10),
    borderColor: brandInfo,
    pointHoverBackgroundColor: brandInfo,
    borderWidth: 2,
    data: [123, 31, 45, 123, 25, 42, 23, 83, 112, 32, 180, 91]
  },
  {
  label: "Net Profit",
    backgroundColor: "transparent",
    borderColor: brandSuccess,
    pointHoverBackgroundColor: brandSuccess,
    borderWidth: 2,
    data: [91, 88, 79, 87, 93, 97, 85, 82, 79, 86, 94, 86]
  }
];

const Product = () => {
  return (
    <>
      <CRow>
        <CCol sm="6" lg="6">
        <h4 class="card-title">Product Information</h4>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: {ProductInfo[0].id}</li>
            <li class="list-group-item">Name: {ProductInfo[0].name}</li>
            <li class="list-group-item">Supplier: {ProductInfo[0].supplier}</li>
            <li class="list-group-item">Cost: {ProductInfo[0].cost}</li>
            <li class="list-group-item">Profit: {ProductInfo[0].profit}</li>
            <li class="list-group-item">Details: {ProductInfo[0].details}</li>
        </ul>
        </CCol>
        <CCol sm="6" lg="6">
        <h4 class="card-title">Top Clients</h4>
        <CDataTable
            items={clientsData}
            fields={fields}
            itemsPerPage={5}
            hover
            bordered
            pagination
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard className="w-100">
            <CCardHeader className="text-center">
              <h3>Gross Profit vs Net Profit</h3>
            </CCardHeader>
            <CCardBody>
                <LineChart datasets={purchaseOrder}/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm="4" lg="4">
        <div class="card border-light mb-3">
        <h3 class="card-header text-center">Units in Stock</h3>
        <div class="card-body">
            <h4 class="card-title text-center">12344</h4>
        </div>
        </div>
        </CCol>
        <CCol sm="4" lg="4">
        <div class="card bg-light mb-3">
        <h3 class="card-header text-center">Units Sold</h3>
        <div class="card-body">
            <h4 class="card-title text-center">943212</h4>
        </div>
        </div>
        </CCol>
        <CCol sm="4" lg="4">
        <div class="card text-white bg-dark mb-3">
        <h3 class="card-header text-center">Annual Product Net Profit</h3>
        <div class="card-body">
            <h4 class="card-title text-center">40%</h4>
        </div>
        </div>
        </CCol>
      </CRow>

    </>
  );
}

export default Product;
