const express = require('express');
const router = express.Router();
const { getOrderCancellationReasons , getOrderDetails , getOrdersByEmail ,cancelOrder } = require('../controllers/orderController');

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
router.get('/getOrderDetails/:orderNumber',getOrderDetails);


/**
 * @swagger
 * /api/getOrderHistoryByEmail/{email} :
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Orders
 *     summary: Route to get order history by customer email id
 *     description: This API calls the Orders endpoint of Kibo and retrieves the order history using the customer email. The business logic returns only the top 10 valid orders of the user
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
router.get('/getOrderHistoryByEmail/:email',getOrdersByEmail)

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
router.get('/getOrderCancelReasons',getOrderCancellationReasons);


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
router.put('/cancelOrder', cancelOrder);

module.exports = router;
