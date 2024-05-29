const { generateAuthenticationToken } = require('../services/authService');

const getAccessToken = async (req, res) =>{
    try{
        const accessToken = await generateAuthenticationToken();
        req.session.accessToken = accessToken;
        res.send({ accessToken });
    }
    catch (error) {
        console.error('Error fetching access token:', error.message);
        res.status(500).send('Internal Server Error');
    }
} 

module.exports = { getAccessToken }