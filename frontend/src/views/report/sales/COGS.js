import React from "react";
import ChartBarSimple from "../../charts/ChartBarSimple";
import { CWidgetDropdown } from "@coreui/react";

export default (attributes) => {
  const data = [24, 37, 48, 52, 63, 51, 43, 31, 47, 78, 52, 61];

  return (
    <CWidgetDropdown
      color="dark"
      className="h-100"
      header="$ 20B"
      text="Cost of Goods Sold"
      footerSlot={
        <ChartBarSimple
          style={{ height: "70px" }}
          backgroundColor="primary"
          dataPoints={data}
          pointHoverBackgroundColor="danger"
          label="COGS"
          labels="months"
        />
      }
    ></CWidgetDropdown>
  );
};
