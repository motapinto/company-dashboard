import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import {formatNumber} from "../pages/Procurement";

export default ({ ProductInfo }) => {
  return (
    <CCard className="w-100">
      <CCardHeader>
        <h4 className="card-title mb-0">Product Information</h4>
        <div className="small text-muted">{2019}</div>
      </CCardHeader>
      <CCardBody>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Product Key: {ProductInfo.productKey}
          </li>
          <li className="list-group-item">Name: {ProductInfo.name}</li>
          <li className="list-group-item">Price: $ {formatNumber(ProductInfo.price)}</li>
          <li className="list-group-item">Details: {ProductInfo.details}</li>
        </ul>
      </CCardBody>
    </CCard>
  );
};
