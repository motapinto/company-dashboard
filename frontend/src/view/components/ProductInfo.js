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
          <li class="list-group-item">ID: {ProductInfo[0].id}</li>
          <li class="list-group-item">Name: {ProductInfo[0].name}</li>
          <li class="list-group-item">Supplier: {ProductInfo[0].supplier}</li>
          <li class="list-group-item">Cost: {ProductInfo[0].cost}</li>
          <li class="list-group-item">Profit: {ProductInfo[0].profit}</li>
          <li class="list-group-item">Details: {ProductInfo[0].details}</li>
        </ul>
      </CCardBody>
    </CCard>
  );
};
