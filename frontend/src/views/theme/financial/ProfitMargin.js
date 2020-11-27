import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import LineChart from "../../charts/LineChart.js";

const yLabel = (value, _index, _values) => {
  return `$ ${value}K`;
};

export default ({ profitMargin, year }) => {
  return (
    <CCard style={{ height: "100%" }}>
      <CCardHeader>
        <h4 id="traffic" className="card-title mb-0">
          Profit Margin
        </h4>
        <div className="small text-muted">{year}</div>
      </CCardHeader>
      <CCardBody>
        <LineChart datasets={profitMargin} callback={yLabel} />
      </CCardBody>
    </CCard>
  );
};
