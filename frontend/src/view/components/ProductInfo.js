import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

export default ({ ProductInfo }) => {
  return (
    <CCard className="w-100 h-100">
      <CCardHeader className="text-center">
        <h3 class="card-title">Product Information</h3>
      </CCardHeader>
      <CCardBody>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: {ProductInfo.id}</li>
          <li class="list-group-item">Name: {ProductInfo.name}</li>
          <li class="list-group-item">Supplier: {ProductInfo.supplier}</li>
          <li class="list-group-item">Cost: {ProductInfo.cost}</li>
          <li class="list-group-item">Profit: {ProductInfo.profit}</li>
          <li class="list-group-item">Details: {ProductInfo.details}</li>
        </ul>
      </CCardBody>
    </CCard>
  );
};
