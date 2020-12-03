import React from "react";
import BalanceSheet from "../components/BalanceSheet";
import TopProducts from "../components/TopProducts";
import { CRow, CCol } from "@coreui/react";
import SalesRegion from "../components/SalesRegion";
import SalesSummary from "../components/SalesSummary";
import OverviewKpis from "../components/OverviewKpis";
import ResourceGetter from "../components/ResourceGetter";
import GetDashboardData from "../../viewmodel/providers/getDashboardData";

const sales = [
  {
    label: "Montly Sales",
    backgroundColor: "#4dbd74",
    data: [
      2323323,
      2212122,
      2312312,
      1211221,
      4312232,
      1112312,
      7512321,
      5542565,
      9523534,
      4322423,
      3222423,
      4324322,
    ],
  },
];

const overviewKpis = {
  sgt: 2131231,
  snt: 2313223,
  gpm: 34.23,
  egr: 98.23,
  rgr: 22.12,
  npm: 50.22,
};

const regionSalesData = [40, 65, 42, 22, 15];
const regionLabels = ["America", "China", "Europe", "Australia", "Africa"];

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

const RenderDashboard = (data) => {
  return (
    <>
      <CRow>
        <CCol className="d-flex align-items-stretch">
          <OverviewKpis kpis={overviewKpis} year={2019} />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <SalesSummary datasets={sales} year={2019} />
        </CCol>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <SalesRegion
            datasets={regionSalesData}
            labels={regionLabels}
            year={2019}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <TopProducts
            productsData={productsData}
            year={2019}
          />
        </CCol>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <BalanceSheet
            balanceSheetAssets={[
              {
                label: "NCA",
                backgroundColor: "#4dbd74",
                data: data.balanceSheet.nca,
              },
              {
                label: "CA",
                backgroundColor: "#597D35",
                data: data.balanceSheet.ca,
              },
            ]}
            balanceSheetEquity={[
              {
                label: "CL",
                backgroundColor: "#680C07",
                data: data.balanceSheet.cl,
              },
              {
                label: "NCL",
                backgroundColor: "#900D09",
                data: data.balanceSheet.ncl,
              },
              {
                label: "E",
                backgroundColor: "#f87979",
                data: data.balanceSheet.e,
              },
            ]}
            year={2019}
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
