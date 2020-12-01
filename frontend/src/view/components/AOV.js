import React from "react";
import { CWidgetDropdown } from "@coreui/react";
import ChartLineSimple from "../charts/ChartLineSimple";
import MoneyFormat from "../utils/MoneyFormat";

export default ({ dataset }) => {
  return (
    <CWidgetDropdown
      color="dark"
      className="w-100"
      header={"$ " + MoneyFormat(dataset.reduce((a, b) => a + b, 0))}
      text="Average Order Value (AOV)"
      footerSlot={
        <ChartLineSimple
          style={{ height: "70px" }}
          backgroundColor="danger"
          dataPoints={dataset}
          pointHoverBackgroundColor="danger"
          label="AOV"
          labels="months"
        />
      }
    ></CWidgetDropdown>
  );
};
