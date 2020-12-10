import React from "react";
import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import ProductInfo from "../components/ProductInfo";
import TopClients from "../components/TopClients";
import GrossNetProfit from "../components/GrossNetProfit";
import GetProductData from "../../viewmodel/providers/getProductData";
import ResourceGetter from "../components/ResourceGetter";
import { match } from "assert";
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const RenderProduct = (data) => {
  const profitMargin = [
    {
      label: "Gross Profit",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
      data: data.gpm,
    },
    {
      label: "Net Profit",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
      data: data.npm,
    },
  ];
  return (
    <>
      <CRow className="h-100">
        <CCol md="4" lg="4" className="d-flex align-items-stretch">
          <ProductInfo ProductInfo={data.info} />
        </CCol>
        <CCol md="8" lg="8" className="d-flex align-items-stretch">
          <TopClients
            clientsData={data.clients}
            fields={["name", "quantity", "amount"]}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4" lg="4">
          <CCard className="w-100">
            <CCardHeader>
              <h4 className="card-title mb-0">Units in Stock</h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <h4>{data.stock}</h4>
            </CCardBody>
          </CCard>

          <CCard className="w-100">
            <CCardHeader>
              <h4 className="card-title mb-0">Units Sold</h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <h4>{data.sold}</h4>
            </CCardBody>
          </CCard>

          <CCard className="w-100">
            <CCardHeader>
              <h4 className="card-title mb-0">Annual Net Profit</h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <h4>{data.annualNetProfit}%</h4>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="8" lg="8" className="d-flex align-items-stretch">
          <GrossNetProfit dataset={profitMargin} />
        </CCol>
      </CRow>
    </>
  );
};

const Product = ({ match, year }) => (
  <ResourceGetter
    func={() => GetProductData(match.params.id, year)}
    componentToRender={RenderProduct}
  />
);
export default Product;
