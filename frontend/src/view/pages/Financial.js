import React from "react";
import { CRow, CCol } from "@coreui/react";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import VatPaidDeducted from "../components/VatPaidDeducted";
import ProfitMargin from "../components/ProfitMargin";
import BalanceSheet from "../components/BalanceSheet";
import ProfitAndLoss from "../components/ProfitAndLoss";
import GetFinancialData from "../../viewmodel/providers/getFinancialData";
import ResourceGetter from "../components/ResourceGetter";
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const RenderFinancial = (data) => {
  const profitMargin = [
    {
      label: "Gross Profit Margin",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
      data: data.profitMargin.grossProfit,
    },
    {
      label: "Net Profit Margin",
      backgroundColor: hexToRgba(brandSuccess, 10),
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
      data: data.profitMargin.netProfit,
    },
  ];

  return (
    <>
      <CRow>
        <CCol sm="12" md="12" lg="6" className="d-flex align-items-stretch">
          <VatPaidDeducted
            vatPaidDeducted={[
              {
                label: "Paid",
                backgroundColor: "#f87979",
                data: data.vatPaid,
              },
              {
                label: "Deducted",
                backgroundColor: "#4dbd74",
                data: data.vatDeducted,
              },
            ]}
            year={2019}
          />
        </CCol>
        <CCol md="12" lg="6" className="d-flex align-items-stretch">
          <ProfitMargin profitMargin={profitMargin} year={2019} />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="5" className="d-flex align-items-stretch">
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
        <CCol md="7" className="d-flex align-items-stretch">
          <ProfitAndLoss
            cost={[
              {
                label: "O",
                backgroundColor: "#f87979",
                data: data.cost,
              },
            ]}
            revenue={[
              {
                label: "R",
                backgroundColor: "#4dbd74",
                data: data.revenue,
              },
            ]}
            className="d-flex align-items-stretch"
            year={2019}
            ebitda={data.ebitda}
            ebitdaMargin={data.ebitdaMargin}
          />
        </CCol>
      </CRow>
    </>
  );
};

const Financial = (year) => (
  <ResourceGetter
    func={() => GetFinancialData(year)}
    componentToRender={RenderFinancial}
  />
);
export default Financial;
