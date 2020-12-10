import React from "react";
import { CWidgetDropdown } from "@coreui/react";
import ChartBarSimple from "../charts/ChartBarSimple";
import MoneyFormat from "../utils/MoneyFormat";
import ChartLineSimple from "../charts/ChartLineSimple";

export default ({ dataset }) => {
  return (
    <CWidgetDropdown
      color="dark"
      className="w-100"
      header={"$ " + MoneyFormat(dataset.reduce((a, b) => a + b, 0))}
      text="Cost of Goods Sold"
      footerSlot={
        <ChartBarSimple
          style={{height: "70px"}}
          backgroundColor="danger"
          dataPoints={dataset}
          pointHoverBackgroundColor="danger"
          label="COGS"
          labels={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
        />
      }
    />
  );
};
