import React from "react";
import {CCard, CCardBody, CDataTable, CCardHeader, CBadge} from "@coreui/react";
import {formatNumber} from "../pages/Procurement";

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
          scopedSlots={{
            amount: (item) => (
              <td className="align-content-end text-right pr-3">
                {"$ " + formatNumber(item.amount)}
              </td>
            ),
            quantity: (item) => (
              <td className="align-content-end text-right pr-3">
                {formatNumber(item.quantity)}
              </td>
            ),
          }}
        />
      </CCardBody>
    </CCard>
  );
}
