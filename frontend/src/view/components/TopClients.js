import React from "react";
import { CCard, CCardBody, CDataTable, CCardHeader } from "@coreui/react";

export default ({ clientsData, fields }) => {
  return (
    <CCard className="w-100 ">
      <CCardHeader>
        <h4 className="card-title mb-0">Top Clients</h4>
        <div className="small text-muted">{2019}</div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={clientsData}
          fields={fields}
          itemsPerPage={5}
          hover
          bordered
          pagination
        />
      </CCardBody>
    </CCard>
  );
};
