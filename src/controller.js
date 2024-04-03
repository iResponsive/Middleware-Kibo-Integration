// your-controller.js
const axios = require('axios');
const { BASE_URL, OAUTH_URI, ORDERS_URI,SHIPMENTS_URI,ORDER_CANCEL_REASONS_URI,ORDER_CANCEL_URI,SET_FULFILLMENTINFO_URI,
  KIBO_CLIENT_ID, KIBO_CLIENT_SECRET } = require('./constants');


  //temp function for swagger
  async function getAuthToken(req, res) {
    try {
      // Call OAuth URI and get access_token logic here
      const oAuthURL = `${BASE_URL}${OAUTH_URI}`;
      const requestBody = {
        grant_type: 'client_credentials',
        client_id: KIBO_CLIENT_ID,
        client_secret: KIBO_CLIENT_SECRET,
      };
  
      const response = await axios.post(oAuthURL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Extract access token from the response
    const accessToken = response.data.access_token;
    const htmlContent = 
    `<html>
      <head>
        <script>
          // Function to set the access token in Swagger UI
          function setAccessToken(token) {
            document.getElementById('accessToken').innerText = token;
          }
        </script>
      </head>
      <body>
        <h2>Access Token</h2>
        <div id="accessToken">${accessToken}</div>
      </body>
    </html>`;
    // Send the HTML content as the response
    res.send(htmlContent);
    } catch (error) {
      console.error('Error fetching access token:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  //get token method
async function getAccessToken(req, res) {
  try {
    // Call OAuth URI and get access_token logic here
    const oAuthURL = `${BASE_URL}${OAUTH_URI}`;
    const requestBody = {
      grant_type: 'client_credentials',
      client_id: KIBO_CLIENT_ID,
      client_secret: KIBO_CLIENT_SECRET,
    };

    const response = await axios.post(oAuthURL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Extract access token from the response
    const accessToken = response.data.access_token;
    req.session.accessToken = accessToken;
    // Send the access token in the response
    res.send({ accessToken });
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    res.status(500).send('Internal Server Error');
  }
}


//  function to get order details by Order Number
const getOrderDetails = async (orderNumber, req) => {
    const ordersApiUrl = `${BASE_URL}${ORDERS_URI}?filter=orderNumber eq "${orderNumber}"`;
    console.log("ordersApiUrl::  "+ordersApiUrl);
    
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new Error('In method getOrderDetials:::Unauthorized: Access Token is required');
      }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
  
    const response = await axios.get(ordersApiUrl, { headers });
    return response.data.items;
  };
  

  
//  function to get order history by Customer Email - latest 10 orders
const getOrderHistorybyEmail = async (email, req) => {
  const ordersbyEmailApiUrl = `${BASE_URL}${ORDERS_URI}?filter=(email eq "${email}"  and status ne "Abandoned" and status ne "Cancelled"  and returnStatus ne "Closed" and status ne "Errored")&sortBy=submittedDate+desc&pageSize=10`;
  console.log("ordersbyEmailApiUrl::  "+ordersbyEmailApiUrl);
  
  const authorizationHeader = req.header('Authorization');
  const accessToken = authorizationHeader.split(' ')[1];

  if (!accessToken) {
      throw new Error('In method getOrderHistorybyEmail:::Unauthorized: Access Token is required');
    }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };
  const response = await axios.get(ordersbyEmailApiUrl, { headers });
  return response.data.items;
};

  //  function to get shipment details
const getShipmentDetails = async (orderNumber, req) => {
    const shipmentsApiUrl = `${BASE_URL}${SHIPMENTS_URI}?filter=orderNumber==${orderNumber}`;
    console.log("shipmentsApiUrl::  "+shipmentsApiUrl);
  
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new Error('In method getShipmentDetails:::Unauthorized: Access Token is required');
      }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };
    const response = await axios.get(shipmentsApiUrl, { headers });
    return response.data._embedded.shipments;
  };

   //get order cancel reasons
const getOrderCancelReasons = async (req) => {
  const ordersCancelReasonsUrl = `${BASE_URL}${ORDER_CANCEL_REASONS_URI}`;
  console.log("ordersCancelReasonsUrl::  "+ordersCancelReasonsUrl);
  
  const authorizationHeader = req.header('Authorization');
  const accessToken = authorizationHeader.split(' ')[1];

  if (!accessToken) {
      throw new Error('In method ordersCancelReasonsUrl:::Unauthorized: Access Token is required');
    }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };
  const response = await axios.get(ordersCancelReasonsUrl, { headers });
  return response.data.items;
};



//  function to cancel Order using order id
const cancelOrder= async (req) => {
    
    const requestData = req.body;
    const requestBody = {
      "reasonCode": requestData.reasonCode,
      "description": requestData.description,
      "moreInfo": requestData.moreInfo
    };
    const siteId = requestData.siteId;
    const orderId = requestData.orderId;
    //console.log("siteId::"+siteId + " ::orderId::"+orderId);
    const cancelOrderUrl = `${BASE_URL}${ORDER_CANCEL_URI}/${orderId}`;
    //console.log("cancelOrderUrl::  "+cancelOrderUrl);
    
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];
    
      if (!accessToken) {
        throw new Error('In method cancelOrderUrl:::Unauthorized: Access Token is required');
      }
   
      const cancelOrderResponse = await axios.put(cancelOrderUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'x-vol-site': `${siteId}`
        },
      });
  
    return cancelOrderResponse.data;
  };


  //  function to edit shipment address of an order
const editShipmentAddress= async (req) => {
  
    const requestData = req.body;
    const requestBody = {
      "fulfillmentContact": {
        "id": requestData.id,
        "email": requestData.email,
        "firstName": requestData.firstName,
        "middleNameOrInitial": requestData.middleNameOrInitial,
        "lastNameOrSurname": requestData.lastNameOrSurname,
        "companyOrOrganization": requestData.companyOrOrganization,
        "phoneNumbers": {
          "home": requestData.phoneNumbers.home,
          "mobile": requestData.phoneNumbers.mobile,
          "work": requestData.phoneNumbers.work
        },
        "address": {
          "address1": requestData.address.address1,
          "address2": requestData.address.address2,
          "address3": requestData.address.address3,
          "address4": requestData.address.address4,
          "cityOrTown": requestData.address.cityOrTown,
          "stateOrProvince": requestData.address.stateOrProvince,
          "postalOrZipCode": requestData.address.postalOrZipCode,
          "countryCode": requestData.address.countryCode,
          "addressType": requestData.address.addressType,
          "isValidated": requestData.address.isValidated
        }
      },
      "isDestinationCommercial": requestData.isDestinationCommercial,
      "shippingMethodCode": requestData.shippingMethodCode,
      "shippingMethodName": requestData.shippingMethodName
    };
    const siteId = requestData.siteId;
    const orderId = requestData.orderId;
    //console.log("siteId::"+siteId + " ::orderId::"+orderId);
    const editShipmentAddressUrl = `${BASE_URL}${ORDERS_URI}/${orderId}${SET_FULFILLMENTINFO_URI}`;
    //console.log("editShipmentAddressUrl::  "+editShipmentAddressUrl);
    
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];
 
      if (!accessToken) {
        throw new Error('In method editShipmentAddress:::Unauthorized: Access Token is required');
      }
   
      const editShipmentAddressResponse = await axios.put(editShipmentAddressUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'x-vol-site': `${siteId}`
        },
      });
  
    return editShipmentAddressResponse.data;
  };
module.exports = {getAccessToken, getOrderDetails,getShipmentDetails , getOrderHistorybyEmail,
  getOrderCancelReasons,cancelOrder,editShipmentAddress};

