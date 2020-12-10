const axios = require("axios").default;

const jasminAPI = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
const saftAPI = process.env.SAFT_API_URL || "http://localhost:5000";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_TOKEN}`;

const refreshToken = async (): Promise<any> => {
  const formData = new FormData();
  formData.append(
    "client_id",
    (process.env.REACT_APP_CLIENT_ID ?? "").toString()
  );
  formData.append(
    "client_secret",
    (process.env.REACT_APP_CLIENT_SECRET ?? "").toString()
  );
  formData.append(
    "grant_type",
    (process.env.REACT_APP_GRANT_TYPE ?? "").toString()
  );

  const responseJson = await fetch(
    "https://identity.primaverabss.com/connect/token",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "same-origin",
      body: formData,
    }
  );

  //axios.defaults.headers.common['Authorization'] = `${responseJson.data.token_type} ${responseJson.data.access_token}`;
};

export const getProductsRequest = async (): Promise<any> => {
  try {
    return await axios.get(jasminAPI + "/salescore/salesitems");
  } catch (e) {
    /*await refreshToken();
    return await axios.get(url + '/salescore/salesitems');*/
  }
};

export const getOrdersRequest = async (): Promise<any> => {
  try {
    return await axios.get(jasminAPI + "/sales/orders");
  } catch (error) {
    console.error("Could not getOrdersRequest!");
  }
};

export const getProductInfo = async (
  productKey: string,
  
): Promise<any> => {
  try {
    return await axios.get(jasminAPI + "/salescore/salesitems/" + productKey);
  } catch (error) {
    console.error("Could not getProductInfo!");
  }
};

// SAF-T Requests
export const getHeader = async () => {
  try {
    return (await axios.get(saftAPI + "/header/fiscal-year")).data;
  } catch (error) {
    console.error("Could not getHeader!");
  }
};

export const getBalanceSheet = async () => {
  try {
    return await axios.get(saftAPI + "/balanceSheet");
  } catch (error) {
    console.error("Could not getBalanceSheet!");
  }
};

export const getGeneralLedgerEntries = async () => {
  try {
    return await axios.get(saftAPI + "/GeneralLedgerEntries");
  } catch (error) {
    console.error("Could not get GeneralLedgerEntries!");
  }
};

export const getGeneralLedgerAccounts = async () => {
  try {
    return await axios.get(saftAPI + "/GeneralLedgerAccounts");
  } catch (error) {
    console.error("Could not get GeneralLedgerAccounts!");
  }
};

export const getCustomers = async () => {
  try {
    return await axios.get(saftAPI + "/Customer");
  } catch (error) {
    console.error("Could not get Customers!");
  }
};

export const getSuppliers = async () => {
  try {
    return await axios.get(saftAPI + "/Supplier");
  } catch (error) {
    console.error("Could not get Suppliers!");
  }
};

export const getTaxTableEntries = async () => {
  try {
    return await axios.get(saftAPI + "/TaxTableEntry");
  } catch (error) {
    console.error("Could not get TaxTableEntries!");
  }
};

export const getSupplierSpending = async () => {
  try {
    return await axios.get(saftAPI + "/Supplier/spending");
  } catch (error) {
    console.error("Could not get Suppliers spending!");
  }
};

export const getSalesByRegion = async (): Promise<any> => {
  try {
    return await axios.get(saftAPI + "/sales/sales-by-region");
  } catch (error) {
    console.error("Could not get sales by region!");
    return [];
  }
};

export const getMonthlySales = async (): Promise<any> => {
  try {
    return await axios.get(saftAPI + "/sales/sales-summary");
  } catch (error) {
    console.error("Could not get sales summary!");
    return [];
  }
};

export const getAOV = async (): Promise<any> => {
  try {
    return await axios.get(saftAPI + "/sales/AOV");
  } catch (error) {
    console.error("Could not get aov!");
    return [];
  }
};

// getHeader();
