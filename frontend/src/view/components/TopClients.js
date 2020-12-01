import React from "react";
import { CCard, CCardBody, CDataTable } from "@coreui/react";

export default ({ clientsData, fields }) => {
  return (
    <CCard className="w-100 h-100">
      <CCardBody>
        <h3 class="card-title mb-1">Top Clients</h3>
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
