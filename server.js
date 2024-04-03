const express = require('express');
const { swaggerUi, specs } = require('./src/docs/swagger');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


const { getAccessToken, getOrderDetails,getShipmentDetails,getOrderHistorybyEmail,
  getOrderCancelReasons,cancelOrder,editShipmentAddress } = require('./src/controller');

const app = express();
// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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

// Route to get access token for swagger
app.get('/api/auth', async (req, res) => {
  await getAuthToken(req, res);
});

 /**
 * @swagger
 * /api/getToken:
 *   get:
 *     tags:
 *      - Authentication
 *     summary: Route to get access token from Kibo server
 *     description: This API calls the OAuth endpoint of Kibo and retrieves the access token. Use this access token for Authorization.
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Resource not found
 */
// Route to get access token
app.get('/api/getToken', async (req, res) => {
  await getAccessToken(req, res);
});

/**
 * @swagger
 * /api/getOrderDetails/{orderNumber} :
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Orders
 *     summary: Route to get order details by Order number
 *     description: This API calls the Orders endpoint of Kibo and retrieves the order details using the order number
 *     parameters:
 *      - in: path
 *        name: orderNumber
 *        schema:
 *          type: string
 *        required: true
 *        description: Order number to retrieve order details 
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Resource not found
 */
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


/**
 * @swagger
 * /api/getOrderHistoryByEmail/{email} :
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Orders
 *     summary: Route to get order history by customer email id
 *     description: This API calls the Orders endpoint of Kibo and retrieves the order history using the customer email
 *     parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: Customer email to retrieve order history 
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Resource not found
 */
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

/**
 * @swagger
 * /api/getShipmentDetails/{orderNumber} :
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Shipments
 *     summary: Route to get shipment details by Order number
 *     description: This API calls the Orders endpoint of Kibo and retrieves the shipment details using the order number
 *     parameters:
 *      - in: path
 *        name: orderNumber
 *        schema:
 *          type: string
 *        required: true
 *        description: Order number to retrieve shipment details of the order
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Resource not found
 */
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


/**
 * @swagger
 * /api/getOrderCancelReasons :
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Orders
 *     summary: Route to get the order cancel reasons
 *     description: This API calls the Orders endpoint of Kibo and retrieves the list of reasons for cancelling an order
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Resource not found
 */
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

 
/**
 * @swagger
 * /api/cancelOrder :
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Orders
 *     summary: Route to cancel the order
 *     description: This API calls the Orders endpoint of Kibo and for cancelling an order. Provide the reasonCode, description and moreInfo from the cancellation reason API response. Provide the orderId and siteId from the getOrderDetails API response for an order number
 *     requestBody:
 *        description: Order Cancel Reason details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 reasonCode:
 *                    type: string
 *                    description: The reasonCode for cancellation.
 *                 description:
 *                    type: string
 *                    description: The description for cancellation.
 *                 moreInfo:
 *                    type: string
 *                    description: The more informaiton for cancellation.
 *                 orderId:
 *                    type: string
 *                    description: The ID of the order.
 *                 siteId:
 *                    type: string
 *                    description: The ID of the site.
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Resource not found
 */
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


/**
 * @swagger
 * /api/editShipmentAddress :
 *   put:
*     security:
 *      - bearerAuth: []
 *     tags:
 *      - Orders
 *     summary: Route to edit shipment address
 *     description: This API calls the fulfillment endpoint of Kibo and for editing shipment address of an order. Fill the required address to be changed, Other details can be obtained from the fulfillmentInfo object of getOrderDetails API response 
 *     requestBody:
 *        description: Shipment address details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                    id:
 *                      type: string
 *                      description: The fulfillmentContact id
 *                    email:
 *                      type: string
 *                      description: The fulfillmentContact email
 *                    firstName:
 *                      type: string
 *                      description: The fulfillmentContact first name
 *                    middleNameOrInitial:
 *                      type: string
 *                      description: The fulfillmentContact middle name
 *                    lastNameOrSurname:
 *                      type: string
 *                      description: The fulfillmentContact last name
 *                    companyOrOrganization:
 *                      type: string
 *                      description: The company name
 *                    phoneNumbers:
 *                      type: object
 *                      properties:
 *                       home:
 *                        type: string
 *                        description: The fulfillmentContact home phone number
 *                       mobile:
 *                        type: string
 *                        description: The fulfillmentContact mobile number
 *                       work:
 *                        type: string
 *                        description: The fulfillmentContact work number
 *                    address:
 *                      type: object
 *                      properties:
 *                       address1:
 *                        type: string
 *                        description: The fulfillmentContact address line1
 *                       address2:
 *                        type: string
 *                        description: The fulfillmentContact address line2
 *                       address3:
 *                        type: string
 *                        description: The fulfillmentContact address line3
 *                       address4:
 *                        type: string
 *                        description: The fulfillmentContact address line3
 *                       cityOrTown:
 *                        type: string
 *                        description: The fulfillmentContact address city
 *                       stateOrProvince:
 *                        type: string
 *                        description: The fulfillmentContact address state
 *                       postalOrZipCode:
 *                        type: string
 *                        description: The fulfillmentContact address postal code
 *                       countryCode:
 *                        type: string
 *                        description: The fulfillmentContact address country
 *                       addressType:
 *                        type: string
 *                        description: The fulfillmentContact address type
 *                       isValidated:
 *                        type: boolean
 *                        description: The boolean flag for address validation (true/false)
 *                    isDestinationCommercial:
 *                      type: boolean
 *                      description: The boolean flag to identify if Destination address is commercial.
 *                    shippingMethodCode:
 *                      type: string
 *                      description: The shippingMethodCode.
 *                    shippingMethodName:
 *                      type: string
 *                      description: The shippingMethodName.
 *                    orderId:
 *                      type: string
 *                      description: The ID of the order.
 *                    siteId:
 *                      type: string
 *                      description: The ID of the site.
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Resource not found
 */
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
