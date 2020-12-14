import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import LineChart from "./LineChart";
import yLabel from "../utils/yLabel";
import {formatNumber} from "../pages/Procurement";

export default ({ profitMargin, year }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <h4 id="traffic" className="card-title mb-0">
          Profit Margin
        </h4>
        <div className="small text-muted">{year}</div>
      </CCardHeader>
      <CCardBody>
        <LineChart
          datasets={profitMargin}
          callback={yLabel}
          tooltipCallback={
            function (tooltipItem, data) {
              let label =
                data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }

              label += "$ " + formatNumber(tooltipItem.yLabel);
              return label;
            }
          }
        />
      </CCardBody>
    </CCard>
  );
};
