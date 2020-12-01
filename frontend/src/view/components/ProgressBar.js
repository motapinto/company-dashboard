import React from "react";
import { CProgress } from "@coreui/react";
import { formatNumber } from "../pages/Procurement";

export default (attributes) => {
  return (
    <div className="progress-group mt-0">
      <div className="progress-group-header">
        <span className="title">{attributes.data.name}</span>
        <span className="ml-auto font-weight-bold">
          {formatNumber(attributes.data.value)}{" "}
          <span className="text-muted small">
            ({Math.round(attributes.data.percentile * 100)}
            %)
          </span>
        </span>
      </div>
      <div className="progress-group-bars">
        <CProgress
          className="progress-xs"
          color="success"
          value={Math.round(attributes.data.percentile * 100)}
        />
      </div>
    </div>
  );
};
