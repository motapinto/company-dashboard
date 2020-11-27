import React from "react";
import {
  CRow,
  CCol,
  CBadge,
  CCard,
  CCardBody,
  CDataTable,
  CCardHeader,
} from "@coreui/react";

import { useHistory } from "react-router-dom";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

export default ({ fields, productsData, year }) => {
  let history = useHistory();
  return (
    <CCard className="w-100">
      <CCardHeader>
        <CRow>
          <CCol>
            <h4 className="card-title mb-0">Top Products</h4>
            <div className="small text-muted">{year}</div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={productsData}
          fields={fields}
          itemsPerPage={5}
          hover
          bordered
          pagination
          options={{
            aspectRatio: false,
          }}
          clickableRows
          onRowClick={(row) => history.push(`/theme/products/${row.id}`)}
          scopedSlots={{
            status: (item) => (
              <td>
                <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
              </td>
            ),
          }}
        />
      </CCardBody>
    </CCard>
  );
};
