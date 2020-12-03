import React from "react";

import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";

import MonthlyAvrgInv from "../components/MonthlyAvrgInv";
import MontlyAvrgTurn from "../components/MontlyAvrgTurn";
import TopProducts from "../components/TopProducts";
import ResourceGetter from "../components/ResourceGetter";
import getInventoryData from "../../viewmodel/providers/getInventoryData";

const RenderInventory = (data) => {
  console.log(data);
  const fields = ["name", "price", "totalSold", "status"];

  const monthlyAvrgTurn = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    sold: {
      total: data.soldTotal,
      data: data.sold,
      label: "Sold",
    },
    replaced: {
      total: data.replacedTotal,
      data: data.replaced,
      label: "Replaced",
    },
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h4 className="card-title mb-0">Total Assets in Stock</h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <h4>{data.assets}€</h4>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              <h4 className="card-title mb-0">
                Average Days to Sell Inventory
              </h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <h4>{data.daysToSell}</h4>
            </CCardBody>
          </CCard>
          <MonthlyAvrgInv dataset={data.monthlyAvrgInv} year={2019} />
        </CCol>
        <CCol md="6">
          <MontlyAvrgTurn
            labels={monthlyAvrgTurn.labels}
            data1={monthlyAvrgTurn.sold}
            data2={monthlyAvrgTurn.replaced}
            year={2019}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol>
          <TopProducts
            fields={fields}
            productsData={data.topProducts}
            year={2019}
          />
        </CCol>
      </CRow>
    </>
  );
};

const Inventory = (year) => (
  <ResourceGetter
    func={() => getInventoryData(year)}
    componentToRender={RenderInventory}
  />
);

export default Inventory;
