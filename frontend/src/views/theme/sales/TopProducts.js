import React from "react";
import {
  CRow,
  CCol,
  CBadge,
  CCard,
  CCardBody,
  CDataTable,
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

export default (attributes) => {
  let history = useHistory();
  const fields = ["name", "price", "totalSold", "status"];
  const productsData = [
    {
      id: 0,
      name: "Tesla Model S",
      price: "70.000 $",
      totalSold: "24.000",
      status: "Active",
    },
    {
      id: 1,
      name: "Tesla Model Y",
      price: "45.000 $",
      totalSold: "49.000",
      status: "Inactive",
    },
    {
      id: 2,
      name: "Tesla Model 3",
      price: "35.000 $",
      totalSold: "77.000",
      status: "Active",
    },
    {
      id: 3,
      name: "Tesla Model X",
      price: "120.000 $",
      totalSold: "34.500",
      status: "Banned",
    },
    {
      id: 4,
      name: "Tesla Roadster",
      price: "200.000 $",
      totalSold: "0",
      status: "Pending",
    },
    {
      id: 5,
      name: "Cybertruck",
      price: "39.900 $",
      totalSold: "0",
      status: "Pending",
    },
  ];

  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol>
            <h4 className="card-title mb-0">Top Products</h4>
            <div className="small text-muted">2019</div>
          </CCol>
        </CRow>
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
