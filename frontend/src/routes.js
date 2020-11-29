import React from "react";

const Dashboard = React.lazy(() => import("./view/pages/Dashboard"));
const Sales = React.lazy(() => import("./view/pages/Sales"));
const Product = React.lazy(() => import("./view/pages/Product"));
const Procurement = React.lazy(() => import("./view/pages/Procurement"));
const Financial = React.lazy(() => import("./view/pages/Financial"));
const Inventory = React.lazy(() => import("./view/pages/Inventory"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/report", name: "Report", component: Sales, exact: true },
  { path: "/report/sales", name: "Sales", component: Sales },
  { path: "/report/procurement", name: "Procurement", component: Procurement },
  { path: "/report/financial", name: "Financial", component: Financial },
  { path: "/report/inventory", name: "Sales", component: Inventory },
  {
    path: "/theme/products/:id",
    exact: true,
    name: "Product",
    component: Product,
  },
];

export default routes;
