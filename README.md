This project serves as a API Proxy applciaiton to access Kibo exposed APIs.<br>
The tenant id, Client Id and Client secret in constants.js file should be replaced with the corresponding values for your application installed at Kibo end.

Steps to access the API's in swagger
1. Swagger URL for Test Env : https://kibo-api-proxy.azurewebsites.net/api-docs
2. Select the server as https://kibo-api-proxy.azurewebsites.net to access the test server environment hosted in Azure
3. Access the Authentication API and execute it for receiving the access token in the response.
4. Click on the Authorize button of the swagger and enter the token value and Authorize. Now you are good to access other API's
