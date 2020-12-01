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
import ProductInfo from "../components/ProductInfo";
import TopClients from "../components/TopClients";
import GrossNetProfit from "../components/GrossNetProfit";
import GetProductData from "../../viewmodel/providers/getProductData";
import ResourceGetter from "../components/ResourceGetter";
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const fields = ["name", "quantity", "amount"];

const RenderProduct = (data) => {
  console.log(data);
  const netGrossProfit = [
    {
      label: "Gross Profit",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
      data: data.purchaseOrder.grossProfit,
    },
    {
      label: "Net Profit",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
      data: data.purchaseOrder.netProfit,
    },
  ];

  return (
    <>
      <CRow className="h-100">
        <CCol sm="6" lg="6">
          <ProductInfo ProductInfo={data.productInfo} />
        </CCol>
        <CCol sm="6" lg="6">
          <TopClients clientsData={data.clientsData} fields={fields} />
        </CCol>
      </CRow>
      <CRow className="mt-5">
        <CCol sm="6" lg="6">
          <GrossNetProfit purchaseOrder={netGrossProfit} />
        </CCol>
        <CCol sm="6" lg="6">
          <CCard className="w-100">
            <CCardHeader>
              <h2 class="text-center">Units in Stock</h2>
            </CCardHeader>
            <CCardBody>
              <h3 class="card-title text-center">{data.unitStock}</h3>
            </CCardBody>
          </CCard>

          <CCard className="w-100">
            <CCardHeader>
              <h2 class="text-center">Units Sold</h2>
            </CCardHeader>
            <CCardBody>
              <h3 class="card-title text-center">{data.unitsSold}</h3>
            </CCardBody>
          </CCard>

          <CCard className="w-100">
            <CCardHeader>
              <h2 class="text-center">Annual Product Net Profit</h2>
            </CCardHeader>
            <CCardBody>
              <h3 class="card-title text-center">{data.productNetProfit}%</h3>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const Product = (id, year) => (
  <ResourceGetter
    func={() => GetProductData(id, year)}
    componentToRender={RenderProduct}
  />
);
export default Product;
