const express = require('express');
const { swaggerUi, specs } = require('./docs/swagger');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


const authRoute = require ('./routes/authRoute');
const shippingRoute = require('./routes/shipmentRoute');
const orderRoute = require('./routes/orderRoute');

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

app.use('/api',authRoute);
app.use('/api',shippingRoute);
app.use('/api',orderRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
