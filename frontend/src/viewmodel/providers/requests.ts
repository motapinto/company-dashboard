const axios = require("axios").default;

const url = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

const refreshToken = async (): Promise<any> => {
  const formData = new FormData();
  formData.append("client_id", (process.env.REACT_APP_CLIENT_ID ?? "").toString())
  formData.append("client_secret", (process.env.REACT_APP_CLIENT_SECRET ?? "").toString())
  formData.append("grant_type", (process.env.REACT_APP_GRANT_TYPE ?? "").toString())

  const responseJson = await fetch(
    "https://identity.primaverabss.com/connect/token",
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      credentials: 'same-origin',
      body: formData
  })

  console.log(responseJson)
  //axios.defaults.headers.common["Authorization"] = `${responseJson.data.token_type} ${responseJson.data.access_token}`;
}

export const getProductsRequest = async (year: number): Promise<any> => {
  try {
    return await axios.get(url + "/salescore/salesitems")
  } catch (e) {
    await refreshToken();
    console.log(axios.defaults.headers.common)
    return await axios.get(url + "/salescore/salesitems");
  }
}

export const getOrdersRequest = async (year: number): Promise<any> => {
  return await axios.get(url + "/sales/orders");
};

export const getProductInfo = async (
  productKey: string,
  year: number
): Promise<any> => {
  return await axios.get(url + "/salescore/salesitems/" + productKey);
};
