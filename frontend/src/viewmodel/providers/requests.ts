const axios = require('axios').default;

const jasminAPI = `${process.env.REACT_APP_URL}/api/${process.env.REACT_APP_TENANT}/${process.env.REACT_APP_ORGANIZATION}`;
const saftAPI = process.env.SAFT_API_URL || 'localhost:5000';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_TOKEN}`;

const refreshToken = async (): Promise<any> => {
  const formData = new FormData();
  formData.append('client_id', (process.env.REACT_APP_CLIENT_ID ?? '').toString())
  formData.append('client_secret', (process.env.REACT_APP_CLIENT_SECRET ?? '').toString())
  formData.append('grant_type', (process.env.REACT_APP_GRANT_TYPE ?? '').toString())

  const responseJson = await fetch(
    'https://identity.primaverabss.com/connect/token',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      credentials: 'same-origin',
      body: formData
  })

  console.log(responseJson)
  //axios.defaults.headers.common['Authorization'] = `${responseJson.data.token_type} ${responseJson.data.access_token}`;
}

export const getProductsRequest = async (year: number): Promise<any> => {
  try {
    return await axios.get(jasminAPI + '/salescore/salesitems')
  } catch (e) {
    /*await refreshToken();
    console.log(axios.defaults.headers.common)
    return await axios.get(url + '/salescore/salesitems');*/
  }
}

export const getOrdersRequest = async (year: number): Promise<any> => {
  try {
    return await axios.get(jasminAPI + '/sales/orders');
  } catch (error) {
    console.error('Could not getOrdersRequest!');
  }
};

export const getProductInfo = async (
  productKey: string,
  year: number
): Promise<any> => {
  try {
    return await axios.get(jasminAPI + '/salescore/salesitems/' + productKey);
  } catch (error) {
    console.error('Could not getProductInfo!');
  }
};

// SAF-T Requests
export const getHeader = async () => {
  try {
    return await axios.get(jasminAPI + '/Header');
  } catch (error) {
    console.error('Could not getHeader!');
  }
}

console.log(getHeader());