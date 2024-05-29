const axios = require('axios');
const { BASE_URL,ORDERS_URI,ORDER_CANCEL_REASONS_URI,ORDER_CANCEL_URI } = require('../helpers/constants');

const getOrderByOrderNumber =  async (orderNumber, accessToken) =>{
    const ordersApiUrl = `${BASE_URL}${ORDERS_URI}?filter=orderNumber eq "${orderNumber}"`;    

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
  
    const response = await axios.get(ordersApiUrl, { headers });
    return response.data.items;

}

const getOrdersByCustomerEmail = async (email,accessToken) =>{
    const ordersbyEmailApiUrl = `${BASE_URL}${ORDERS_URI}?filter=(email eq "${email}"  and status ne "Abandoned" and status ne "Cancelled"  and returnStatus ne "Closed" and status ne "Errored")&sortBy=submittedDate+desc&pageSize=10`; 
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
    };
    const response = await axios.get(ordersbyEmailApiUrl, { headers });
    return response.data.items;
}

const getCancellationReasons = async (accessToken) =>{
    const ordersCancelReasonsUrl = `${BASE_URL}${ORDER_CANCEL_REASONS_URI}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    const response = await axios.get(ordersCancelReasonsUrl, { headers });
    return response.data.items;
}

const cancelOrderByOrderId = async (siteId, orderId, accessToken , cancellationDetails) =>{
    const cancelOrderUrl = `${BASE_URL}${ORDER_CANCEL_URI}/${orderId}`;    
   
    const cancelOrderResponse = await axios.put(cancelOrderUrl, cancellationDetails , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'x-vol-site': `${siteId}`
        },
    });
  
    return cancelOrderResponse.data;
}

module.exports = { getOrderByOrderNumber , getCancellationReasons , getOrdersByCustomerEmail , cancelOrderByOrderId}