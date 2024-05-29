const express = require('express');
const router = express.Router();
const { getAccessToken } = require('../controllers/authController');

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
router.get('/getToken',getAccessToken);
router.get('/api/auth',getAccessToken);

module.exports = router;


