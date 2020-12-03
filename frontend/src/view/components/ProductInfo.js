import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

export default ({ ProductInfo }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <h4 className="card-title mb-0">Product Information</h4>
        <div className="small text-muted">{2019}</div>
      </CCardHeader>
      <CCardBody>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: {ProductInfo.id}</li>
          <li class="list-group-item">Name: {ProductInfo.name}</li>
          <li class="list-group-item">Price: {ProductInfo.price}</li>
          <li class="list-group-item">Total Sold: {ProductInfo.totalSold}</li>
          <li class="list-group-item">Details: {ProductInfo.details}</li>
        </ul>
      </CCardBody>
    </CCard>
  );
};
