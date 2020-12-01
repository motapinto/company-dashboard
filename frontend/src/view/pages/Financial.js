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
      data: data.gpm,
    },
    {
      label: "Net Profit Margin",
      backgroundColor: hexToRgba(brandSuccess, 10),
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
      data: data.npm,
    },
  ];

  return (
    <>
      <CRow className="mb-4">
        <CCol sm="12" md="12" lg="6">
          <VatPaidDeducted vatPaidDeducted={[
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
          year={2019} />
        </CCol>
        <CCol md="12" lg="6" className="mt-4 mt-md-4 mt-lg-0">
          <ProfitMargin
            profitMargin={profitMargin}
            year={2019}
            heightValue="100%"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="5">
          <BalanceSheet
            balanceSheetAssets={[
              {
                label: "NCA",
                backgroundColor: "#4dbd74",
                data: data.nca,
              },
              {
                label: "CA",
                backgroundColor: "#597D35",
                data: data.ca,
              }]
            }
            balanceSheetEquity={[
              {
                label: "CL",
                backgroundColor: "#680C07",
                data: data.cl,
              },
              {
                label: "NCL",
                backgroundColor: "#900D09",
                data: data.ncl,
              },
              {
                label: "E",
                backgroundColor: "#f87979",
                data: data.e,
              }]
            }
            year={2019}
          />
        </CCol>
        <CCol md="7">
          <ProfitAndLoss
            profitAndLossCost={[{
              label: "O",
              backgroundColor: "#f87979",
              data: data.cost,
            }]}
            profitAndLossRevenue={[{
              label: "R",
              backgroundColor: "#4dbd74",
              data: data.revenue,
            }]}
            year={2019}
            ebitda={data.ebidta}
            ebitdaMargin={data.ebitdaMargin}
          />
        </CCol>
      </CRow>
    </>
  );
};

const Financial =  (year) => <ResourceGetter func={() => GetFinancialData(year)} componentToRender={RenderFinancial}/>;
export default Financial;
