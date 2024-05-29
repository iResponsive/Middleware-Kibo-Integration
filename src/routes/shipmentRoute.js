const express = require('express');
const router = express.Router();
const { getShipmentDetails , updateShippingAddress } = require('../controllers/shipmentContoller');

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
router.get('/getShipmentDetails/:orderNumber',getShipmentDetails)

/**
 * @swagger
 * /api/editShipmentAddress :
 *   put:
*     security:
 *      - bearerAuth: []
 *     tags:
 *      - Shipments
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
router.post('/editShipmentAddress',updateShippingAddress)

module.exports = router;
