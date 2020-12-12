import React from "react";
import { CWidgetDropdown } from "@coreui/react";
import ChartBarSimple from "../charts/ChartBarSimple";
import MoneyFormat from "../utils/MoneyFormat";
import ChartLineSimple from "../charts/ChartLineSimple";

export default ({ cogs }) => {
  return (
    <CWidgetDropdown
      color="dark"
      className="w-100"
      header={"$ " + MoneyFormat(cogs)}
      text="Cost of Goods Sold"
      footerSlot={
        <ChartBarSimple
          style={{ height: "70px" }}
          backgroundColor="danger"
          dataPoints={[78, 81, 80, 45, 34, 12, 40, 55, 67, 89, 76, 56]}
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
