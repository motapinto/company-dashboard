import React from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
} from "@coreui/react";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import LineChart from "../components/LineChart";
import yLabel from "../utils/yLabel";
import ProductInfo from "../components/ProductInfo";
import TopClients from "../components/TopClients";
import GrossNetProfit from "../components/GrossNetProfit";

const Product = ({ match }) => {
  const productInfo = [
    {
      id: match.params.id,
      name: "Tesla Model S",
      supplier: "Tesla",
      cost: "70.000 $",
      profit: "24.000",
      details:
        "Model S is built from the ground up as an electric vehicle, with high-strength architecture and a floor-mounted battery pack allowing for incredible impact protection.",
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
      data: [123, 31, 45, 123, 25, 42, 23, 83, 112, 32, 180, 91],
    },
    {
      label: "Net Profit",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
      data: [91, 88, 79, 87, 93, 97, 85, 82, 79, 86, 94, 86],
    },
  ];

  return (
    <>
      <CRow className="h-100">
        <CCol sm="6" lg="6">
          <ProductInfo ProductInfo={productInfo} />
        </CCol>
        <CCol sm="6" lg="6">
          <TopClients clientsData={clientsData} fields={fields} />
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol sm="6" lg="6">
          <GrossNetProfit purchaseOrder={purchaseOrder} />
        </CCol>
        <CCol sm="6" lg="6">
          <CCard className="w-100">
            <CCardHeader>
              <h2 class="text-center">Units in Stock</h2>
            </CCardHeader>
            <CCardBody>
              <h3 class="card-title text-center">12344</h3>
            </CCardBody>
          </CCard>

          <CCard className="w-100">
            <CCardHeader>
              <h2 class="text-center">Units Sold</h2>
            </CCardHeader>
            <CCardBody>
              <h3 class="card-title text-center">943212</h3>
            </CCardBody>
          </CCard>

          <CCard className="w-100">
            <CCardHeader>
              <h2 class="text-center">Annual Product Net Profit</h2>
            </CCardHeader>
            <CCardBody>
              <h3 class="card-title text-center">40%</h3>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Product;
