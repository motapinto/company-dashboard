import React from "react";
import { CRow, CCol } from "@coreui/react";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import VatPaidDeducted from "../components/VatPaidDeducted";
import ProfitMargin from "../components/ProfitMargin";
import BalanceSheet from "../components/BalanceSheet";
import ProfitAndLoss from "../components/ProfitAndLoss";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";

const profitMargin = [
  {
    label: "Gross Profit Margin",
    backgroundColor: hexToRgba(brandInfo, 10),
    borderColor: brandInfo,
    pointHoverBackgroundColor: brandInfo,
    borderWidth: 2,
    data: [98, 166, 159, 122, 109, 91, 139, 99, 140, 193, 79, 160],
  },
  {
    label: "Net Profit Margin",
    backgroundColor: hexToRgba(brandSuccess, 10),
    borderColor: brandSuccess,
    pointHoverBackgroundColor: brandSuccess,
    borderWidth: 2,
    data: [86, 82, 92, 81, 86, 88, 80, 92, 88, 84, 46, 65],
  },
];

const vatPaidDeducted = [
  {
    label: "Paid",
    backgroundColor: "#f87979",
    data: [32, 22, 22, 23, 6, 133, 1, 44, 11, 8, 21, 65],
  },
  {
    label: "Deducted",
    backgroundColor: "#4dbd74",
    data: [3, 4, 24, 24, 22, 33, 22, 1, 21, 65, 31, 44],
  },
];

const balanceSheetAssets = [
  {
    label: "NCA",
    backgroundColor: "#4dbd74",
    data: [8223232],
  },
  {
    label: "CA",
    backgroundColor: "#597D35",
    data: [4343433],
  },
];

const balanceSheetEquity = [
  {
    label: "CL",
    backgroundColor: "#680C07",
    data: [3123121],
  },
  {
    label: "NCL",
    backgroundColor: "#900D09",
    data: [2323323],
  },
  {
    label: "E",
    backgroundColor: "#f87979",
    data: [2323323],
  },
];

const profitAndLossRevenue = [
  {
    label: "R",
    backgroundColor: "#4dbd74",
    data: [2312323],
  },
];

const profitAndLossCost = [
  {
    label: "O",
    backgroundColor: "#f87979",
    data: [3123121],
  },
];

const ebitda = 985445;
const ebitdaMargin = 10.45;

const Financial = () => {
  return (
    <>
      <CRow className="mb-4">
        <CCol sm="12" md="12" lg="6">
          <VatPaidDeducted vatPaidDeducted={vatPaidDeducted} year={2019} />
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
            balanceSheetAssets={balanceSheetAssets}
            balanceSheetEquity={balanceSheetEquity}
            year={2019}
          />
        </CCol>
        <CCol md="7">
          <ProfitAndLoss
            profitAndLossCost={profitAndLossCost}
            profitAndLossRevenue={profitAndLossRevenue}
            year={2019}
            ebitda={ebitda}
            ebitdaMargin={ebitdaMargin}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Financial;
