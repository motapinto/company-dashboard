import {AxiosResponse} from "axios";

const axios = require("axios").default;

const jasminAPI = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
const saftAPI = process.env.SAFT_API_URL || "http://localhost:5000";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common[
  "Authorization"
  ] = `Bearer ${process.env.REACT_APP_TOKEN}`;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.mode = "cors";
axios.credentials = "cross-site";

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

  const response = await axios.post(
    "https://identity.primaverabss.com/connect/token",
    {
      "client_id": (process.env.REACT_APP_CLIENT_ID ?? "").toString(),
      "client_secret": (process.env.REACT_APP_CLIENT_SECRET ?? "").toString(),
      "grant_type": (process.env.REACT_APP_GRANT_TYPE ?? "").toString()
    }
  );

  axios.defaults.headers.common['Authorization'] = `${response.data.token_type} ${response.data.access_token}`;
};

export const getProductsRequest = async (): Promise<any> => {
  try {
    return await axios.get(jasminAPI + "/salescore/salesitems");
  } catch (e) {
    await refreshToken();
    return await axios.get(jasminAPI + '/salescore/salesitems');
  }
};

export const getOrdersRequest = async (): Promise<any> => {
  try {
    return await axios.get(jasminAPI + "/sales/orders");
  } catch (error) {
    console.error("Could not getOrdersRequest!");
  }
};

export const getProductInfo = async (productKey: string): Promise<any> => {
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

export const getSupplierQualityRatings = async () => {
  try {
    return await axios.get(saftAPI + "/Supplier/quality");
  } catch (error) {
    console.error("Could not get Suppliers quality!");
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

export const getCOGS = async (): Promise<any> => {
  try {
    return await axios.get(saftAPI + "/GeneralAccounts/COGS");
  } catch (error) {
    console.error("Could not get COGS!");
    return [];
  }
};

export const getSGT = async (): Promise<any> => {
  try {
    return await axios.get(saftAPI + "/GeneralAccounts/GrossTotal");
  } catch (error) {
    console.error("Could not get COGS!");
    return [];
  }
};

export const getRevenueAndExpenses = async (): Promise<any> => {
  try {
    return await axios.get(saftAPI + "/revenueAndExpenses");
  } catch (error) {
    console.error("Could not get revenue and expenses!");
    return [];
  }
};

export const getProductStock = async (productId: string): Promise<AxiosResponse<any>|undefined> => {
  try {
    return await axios.get(jasminAPI + `/materialsCore/materialsItems/${productId}/extension`);
  } catch (error) {
    console.error("Could not get revenue and expenses!");
  }
}

export const getVat = async (): Promise<AxiosResponse<any>|undefined> => {
  try {
    return await axios.get(saftAPI + `/GeneralAccounts/Vat`);
  } catch (error) {
    console.error("Could not get revenue and expenses!");
  }
}
