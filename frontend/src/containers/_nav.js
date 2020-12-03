export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-chart-pie",
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Report"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sales Report",
    to: "/report/sales",
    icon: "cil-graph",
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Financial Report",
    to: "/report/financial",
    icon: "cilDollar",
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Procurement Report",
    to: "/report/procurement",
    icon: "cil-briefcase",
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Inventory Report",
    to: "/report/inventory",
    icon: "cil-clipboard",
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
];
