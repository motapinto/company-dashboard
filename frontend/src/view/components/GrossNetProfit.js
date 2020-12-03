import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import yLabel from "../utils/yLabel";
import LineChart from "../components/LineChart";

export default ({ dataset }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <h4 className="card-title mb-0">Gross Profit vs Net Profit</h4>
        <div className="small text-muted">{2019}</div>
      </CCardHeader>
      <CCardBody>
        <LineChart datasets={dataset} callback={yLabel} />
      </CCardBody>
    </CCard>
  );
};
