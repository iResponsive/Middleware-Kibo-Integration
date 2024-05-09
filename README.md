This project serves as a API Proxy application to access Kibo exposed APIs.<br> This is coded in NodeJS<br>
The tenant id, Client Id and Client secret in constants.js file should be replaced with the corresponding values for your application installed at Kibo end.

Steps to access the API's in swagger
1. Swagger URL  : http://localhost:3000/api-docs
2. Select the server as  http://localhost:3000 to access the local server environment 
3. Access the Authentication API and execute it for receiving the access token in the response.
4. Click on the Authorize button of the swagger and enter the token value and Authorize. Now you are good to access other API's

For Kibo exposed API's, please refer the Kibo documentation : https://api-docs.kibocommerce.com
