const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Proxy Application',
      version: '1.0.0',
      description: 'The APIs here serves as a proxy to access the Kibo exposed endpoints ',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your API base URL
        description: 'Development server',
      },
      {
        url: 'https://kibo-api-proxy.azurewebsites.net', // Your API base URL
        description: 'Test server',
      },
      {
        url: 'https://iron-lodge-422607-g2.uc.r.appspot.com', // Your API base URL
        description: 'GCP server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],

  },
  apis: ['./server.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
