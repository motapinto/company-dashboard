import React from "react";
import ChartLineSimple from "../../charts/ChartLineSimple";
import { CWidgetDropdown } from "@coreui/react";

export default (attributes) => {
  const data = [78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56];

  return (
    <CWidgetDropdown
      color="dark"
      className="h-100"
      header="$ 50.000"
      text="Average Order Value (AOV)"
      footerSlot={
        <ChartLineSimple
          style={{ height: "70px" }}
          backgroundColor="primary"
          dataPoints={data}
          pointHoverBackgroundColor="danger"
          label="AOV"
          labels="months"
        />
      }
    ></CWidgetDropdown>
  );
};
