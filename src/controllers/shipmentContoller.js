const { getShipmentByOrderNumber , updateShippingAddressByOrderId } = require('../services/shipmentService');

const getShipmentDetails = async (req, res) =>{
    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new Error('In method getShipmentDetails:::Unauthorized: Access Token is required');
    }

    {
    const orderNumber = req.params.orderNumber;
    const shipmentDetails = await getShipmentByOrderNumber(orderNumber,accessToken);
      // Send the order details in the response with CORS headers
      res.header('Access-Control-Allow-Origin', '*'); 
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
        // Send the shipment  details in the response
      res.send({ shipmentDetails });
    }
}

const updateShippingAddress = async (req, res) => {

    const authorizationHeader = req.header('Authorization');
    const accessToken = authorizationHeader.split(' ')[1];
 
    if (!accessToken) {
        throw new Error('In method editShipmentAddress:::Unauthorized: Access Token is required');
    }

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

    const editShipmentAddressResponse = await updateShippingAddressByOrderId(requestBody,siteId,orderId,accessToken)
    // Send the order details in the response with CORS headers
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    // Send the shipment  details in the response
    res.send({ editShipmentAddressResponse });
}

module.exports= {updateShippingAddress , getShipmentDetails}