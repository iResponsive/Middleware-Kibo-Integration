const axios = require('axios');
const { BASE_URL, OAUTH_URI, KIBO_CLIENT_ID, KIBO_CLIENT_SECRET } = require('../helpers/constants');

const  generateAuthenticationToken =  async () =>{
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
    
    return response.data.access_token;
}

module.exports = { generateAuthenticationToken }