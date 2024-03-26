const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


const { getAccessToken, getOrderDetails,getShipmentDetails,getOrderHistorybyEmail,
  getOrderCancelReasons,cancelOrder,editShipmentAddress } = require('./src/controller');

const app = express();
app.use(bodyParser.json());
// Use cors middleware
app.use(cors());
// Use express-session middleware
app.use(session({
  secret: 'jjaakkslllritughhhnkddhser4566yhjui', // Change this to a strong, random string
  resave: false,
  saveUninitialized: true
}));

// Middleware to check if the request contains the access token
const validateAccessToken = (req, res, next) => {
  const authorizationHeader = req.headers['Authorization'];
  console.log("In validateAccessToken method::  "+ authorizationHeader);
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Access Token is required' });
  }

  const accessToken = authorizationHeader.split(' ')[1];
  req.accessToken = accessToken;

  console.log("req.accessToken:: "+req.accessToken);
  next();
};


// Route to get access token
app.get('/api/getToken', async (req, res) => {
  await getAccessToken(req, res);
});

// Route to get order details by Order number
app.get('/api/getOrderDetails/:orderNumber', async (req, res) => {
  const orderNumber = req.params.orderNumber;

 // validateAccessToken(req, res, next);

 const orderDetails = await getOrderDetails(orderNumber, req);
// Send the order details in the response with CORS headers
res.header('Access-Control-Allow-Origin', '*'); 
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  // Send the order details in the responseorderDetails
 res.send({ orderDetails });
});

// Route to get order history by email
app.get('/api/getOrderHistoryByEmail/:email', async (req, res) => {
  const email = req.params.email;
 // validateAccessToken(req, res, next);

 const orderHistory = await getOrderHistorybyEmail(email, req);
// Send the order details in the response with CORS headers
res.header('Access-Control-Allow-Origin', '*'); 
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  // Send the order details in the responseorderDetails
 res.send({orderHistory});
});


// Route to get shipment details
app.get('/api/getShipmentDetails/:orderNumber', async (req, res) => {
  const orderNumber = req.params.orderNumber;
 
 // validateAccessToken(req, res, next);

 const shipmentDetails = await getShipmentDetails(orderNumber, req);
// Send the order details in the response with CORS headers
res.header('Access-Control-Allow-Origin', '*'); 
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  // Send the shipment  details in the response
  res.send({ shipmentDetails });
});


// Route to get order cancel reasons
app.get('/api/getOrderCancelReasons', async (req, res) => {

  const orderCancelReasons = await getOrderCancelReasons(req);
 // Send the order details in the response with CORS headers
 res.header('Access-Control-Allow-Origin', '*'); 
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
   // Send the order cancel reasons in the response
  res.send({ orderCancelReasons });
 });

 
// Route to cancel order
app.put('/api/cancelOrder', async (req, res) => {

 // validateAccessToken(req, res, next);

 const cancelOrderResponse = await cancelOrder(req);
// Send the order details in the response with CORS headers
res.header('Access-Control-Allow-Origin', '*'); 
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  // Send the order  details in the response
 console.log("cancelOrderResponse returned:: "+cancelOrderResponse.status);
  res.send({ cancelOrderResponse });
});



// Route to edit Shipment address
app.put('/api/editShipmentAddress', async (req, res) => {

 // validateAccessToken(req, res, next);

 const editShipmentAddressResponse = await editShipmentAddress(req);
// Send the order details in the response with CORS headers
res.header('Access-Control-Allow-Origin', '*'); 
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  // Send the shipment  details in the response
 //console.log("editShipmentAddressResponse returned:: "+editShipmentAddressResponse.fulfillmentContact.address.addressType);
  res.send({ editShipmentAddressResponse });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
