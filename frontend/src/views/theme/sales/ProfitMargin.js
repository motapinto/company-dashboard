import React from "react";
import LineChart from "../../charts/LineChart.js";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import { CRow, CCol, CCard, CCardBody } from "@coreui/react";

const ProfitMarginChart = (attributes) => {
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

  const yLabel = (value, _index, _values) => {
    return `$ ${value}K`;
  };

  // render
  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="8">
            <h4 id="traffic" className="card-title mb-0">
              Profit Margin
            </h4>
            <div className="small text-muted">2019</div>
          </CCol>
        </CRow>
        <LineChart datasets={profitMargin} callback={yLabel} />
      </CCardBody>
    </CCard>
  );
};

export default ProfitMarginChart;
