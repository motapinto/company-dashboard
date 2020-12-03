import React from "react";

import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartDoughnut } from "@coreui/react-chartjs";
import LineChart from "../components/LineChart";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import ChartBarPercentage from "../charts/ChartBarPercentage";
import ProgressBar from "../components/ProgressBar";
import ChartBarMax from "../charts/ChartBarMax";
import yLabel from "../utils/yLabel";
import ResourceGetter from "../components/ResourceGetter";
import getProcurementData from "../../viewmodel/providers/getProcurementData";

export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const RenderProcurement = (data) => {
  const brandSuccess = getStyle("success") || "#4dbd74";
  const brandInfo = getStyle("info") || "#20a8d8";

  const colorOrder = ["#41B883", "#E46651", "#00D8FF", "#DD1B16"];

  const numberSuppliers = [];
  for (let i = 0; i < data.numberSuppliers.length; i++) {
    numberSuppliers.push({
      label: data.numberSuppliers[i].label,
      data: data.numberSuppliers[i].data,
      backgroundColor: colorOrder[i],
    });
  }

  const suppliers = data.suppliers;
  suppliers.datasets[0] = {
    label: suppliers.datasets[0].label,
    data: suppliers.datasets[0].data,
    backgroundColor: colorOrder,
  };

  const supplierQuality = data.supplierQuality;
  supplierQuality.datasets[0].backgroundColor = "#f87979";

  const purchaseOrder = data.purchaseOrder;
  purchaseOrder[0] = {
    label: purchaseOrder[0].label,
    data: purchaseOrder[0].data,
    backgroundColor: hexToRgba(brandSuccess, 10),
    borderColor: brandSuccess,
    pointHoverBackgroundColor: brandSuccess,
    borderWidth: 2,
  };
  purchaseOrder[1] = {
    label: purchaseOrder[1].label,
    data: purchaseOrder[1].data,
    backgroundColor: hexToRgba(brandInfo, 10),
    borderColor: brandInfo,
    pointHoverBackgroundColor: brandInfo,
    borderWidth: 2,
  };

  const progressBars = [];

  for (let i = 0; i < data.purchasesInTB.categories.length; i++) {
    progressBars.push(
      <ProgressBar
        key={`categories${i}`}
        data={data.purchasesInTB.categories[i]}
      />
    );
  }

  return (
    <>
      <CRow>
        <CCol sm="6" lg="6">
          <CCard>
            <CCardHeader>
              <h4 className="card-title mb-0">Number of Suppliers</h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>

            <CCardBody>
              <ChartBarMax datasets={numberSuppliers} />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="6" lg="6">
          <CCard>
            <CCardHeader>
              <h4 className="card-title mb-0">Suppliers</h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                type="doughnut"
                datasets={suppliers.datasets}
                labels={suppliers.labels}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="h-100">
        <CCol sm="6" lg="6" className="mb-4">
          <CCard className="h-100">
            <CCardHeader>
              <h4 className="card-title mb-0">Supplier Quality Rating</h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <ChartBarPercentage
                datasets={supplierQuality.datasets}
                labels={supplierQuality.labels}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="6" lg="6" className="mb-4">
          <CCard className="h-100">
            <CCardHeader>
              <h4 className="card-title mb-0">Purchases in Time and Budget</h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <h4 className="mb-0">Total</h4>
              <ProgressBar data={data.purchasesInTB.totalPurchases} />
              <h4>By category</h4>
              {progressBars}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard className="w-100">
            <CCardHeader>
              <h4 className="card-title mb-0">
                Purchase Order Cycle Time and Lead Time
              </h4>
              <div className="small text-muted">{2019}</div>
            </CCardHeader>
            <CCardBody>
              <LineChart datasets={purchaseOrder} callback={yLabel} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const Procurement = (year) => (
  <ResourceGetter
    func={() => getProcurementData(year)}
    componentToRender={RenderProcurement}
  />
);
export default Procurement;
