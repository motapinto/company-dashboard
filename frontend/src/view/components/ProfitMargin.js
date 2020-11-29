import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import LineChart from "./LineChart";
import MoneyFormat from "../utils/MoneyFormat";

const yLabel = (value, _index, _values) => {
  return `$ ` + MoneyFormat(value);
};

export default ({ profitMargin, year, heightValue }) => {
  return (
    <CCard style={{ height: heightValue }}>
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
