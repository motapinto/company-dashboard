import React from "react";

import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";

import MonthlyAvrgInv from "../components/MonthlyAvrgInv";
import MontlyAvrgTurn from "../components/MontlyAvrgTurn";
import TopProducts from "../components/TopProducts";

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

const monthlyAvrgInv = [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11];

const Inventory = () => {
  return (
    <>
      <CRow>
        <CCol md="6">
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <h4 className="card-title mb-0">Total Assets in Stock</h4>
                  <div className="small text-muted">{2019}</div>
                </CCardHeader>
                <CCardBody>
                  <h4>9,323K €</h4>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <h4 className="card-title mb-0">
                    Average Days to Sell Inventory
                  </h4>
                  <div className="small text-muted">{2019}</div>
                </CCardHeader>
                <CCardBody>
                  <h4>30</h4>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <MonthlyAvrgInv dataset={monthlyAvrgInv} year={2019} />
            </CCol>
          </CRow>
        </CCol>
        <CCol md="6">
          <MontlyAvrgTurn sold={20000} replaced={23122} year={2019} />
        </CCol>
      </CRow>
      <CRow className="h-100 mt-5">
        <CCol>
          <TopProducts
            fields={fields}
            productsData={productsData}
            year={2019}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Inventory;
