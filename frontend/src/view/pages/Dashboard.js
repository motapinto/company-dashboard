import React from "react";
import BalanceSheet from "../components/BalanceSheet";
import TopProducts from "../components/TopProducts";
import { CRow, CCol } from "@coreui/react";
import SalesRegion from "../components/SalesRegion";
import SalesSummary from "../components/SalesSummary";
import OverviewKpis from "../components/OverviewKpis";
import ResourceGetter from "../components/ResourceGetter";
import GetDashboardData from "../../viewmodel/providers/getDashboardData";

const RenderDashboard = (data) => {
  data.sales.backgroundColor = "#4dbd74";
  return (
    <>
      <CRow>
        <CCol className="d-flex align-items-stretch">
          <OverviewKpis kpis={data.overviewKpis} year={data.year} />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <SalesSummary datasets={[data.sales]} year={data.year} />
        </CCol>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <SalesRegion
            datasets={data.regionSales.data}
            labels={data.regionSales.regions}
            year={data.year}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <TopProducts productsData={data.topProducts} year={data.year} />
        </CCol>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <BalanceSheet
            balanceSheetAssets={[
              {
                label: "NCA",
                backgroundColor: "#4dbd74",
                data: [data.balanceSheet.nca],
              },
              {
                label: "CA",
                backgroundColor: "#597D35",
                data: [data.balanceSheet.ca],
              },
            ]}
            balanceSheetLiabilitiesEquity={[
              {
                label: "CL",
                backgroundColor: "#680C07",
                data: [data.balanceSheet.cl],
              },
              {
                label: "NCL",
                backgroundColor: "#900D09",
                data: [data.balanceSheet.ncl],
              },
              {
                label: "E",
                backgroundColor: "#f87979",
                data: [data.balanceSheet.e],
              },
            ]}
            year={data.year}
          />
        </CCol>
      </CRow>
    </>
  );
};

const Dashboard = (year) => (
  <ResourceGetter
    func={() => GetDashboardData(year)}
    componentToRender={RenderDashboard}
  />
);

export default Dashboard;
