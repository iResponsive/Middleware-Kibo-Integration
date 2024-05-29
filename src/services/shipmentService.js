const axios = require('axios');
const { BASE_URL, ORDERS_URI,SHIPMENTS_URI,SET_FULFILLMENTINFO_URI } = require('../helpers/constants');


const updateShippingAddressByOrderId = async (UpdatedShippingAddress, siteId , orderId , accessToken) => {
    const editShipmentAddressUrl = `${BASE_URL}${ORDERS_URI}/${orderId}${SET_FULFILLMENTINFO_URI}`;
    const editShipmentAddressResponse = await axios.put(editShipmentAddressUrl, UpdatedShippingAddress, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'x-vol-site': `${siteId}`
        },
      });
  
    return editShipmentAddressResponse.data;
}

const getShipmentByOrderNumber = async(orderNumber , accessToken) => {
    const shipmentsApiUrl = `${BASE_URL}${SHIPMENTS_URI}?filter=orderNumber==${orderNumber}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    const response = await axios.get(shipmentsApiUrl, { headers });
    return response.data._embedded.shipments;
}

module.exports = { updateShippingAddressByOrderId , getShipmentByOrderNumber }