const { getOrderByOrderNumber , getOrdersByCustomerEmail , getCancellationReasons , cancelOrderByOrderId } = require('../services/orderService')

const getOrderDetails =  async (req,res) =>{
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new Error('In method getOrderDetials:::Unauthorized: Access Token is required');
      }
    const orderNumber = req.params.orderNumber;     
    const orderDetails = await getOrderByOrderNumber(orderNumber, accessToken);

    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.send({ orderDetails });
}

const getOrdersByEmail = async (req,res) =>{
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new Error('In method getOrderDetials:::Unauthorized: Access Token is required');
    }

    const email = req.params.email;
    const orderHistory = await getOrdersByCustomerEmail(email,accessToken);

    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.send({orderHistory});
}

const getOrderCancellationReasons = async (req,res) =>{
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new Error('In method getOrderDetials:::Unauthorized: Access Token is required');
    }

    const orderCancellationReasons = await getCancellationReasons(accessToken);

    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.send({ orderCancellationReasons });
}

const cancelOrder = async (req, res) =>{
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new Error('In method getOrderDetials:::Unauthorized: Access Token is required');
    }
    const requestData = req.body;
    const cancellationDetails = {
        "reasonCode": requestData.reasonCode,
        "description": requestData.description,
        "moreInfo": requestData.moreInfo
      };
    const siteId = requestData.siteId;
    const orderId = requestData.orderId;
    const cancelOrderResponse = await cancelOrderByOrderId(siteId,orderId,accessToken,cancellationDetails);

    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.send({ cancelOrderResponse });

}

module.exports= { getOrderDetails , getOrdersByEmail , getOrderCancellationReasons , cancelOrder}