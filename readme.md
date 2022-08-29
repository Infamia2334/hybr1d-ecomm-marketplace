## REST API for an e-commerce marketplace.
__To run the APIs in your localhost:__
* Run __npm install__ to install all dependencies locally.
* Create a .env file to create your local environment - add __DATABASE_URL__, __SECRET_JWT__ variables with the mongo connection string and a random secret for JWT Authentication.
* Use POSTMAN or something similar to put requests to the endpoints given below to try out the API.
* Use Bearer Tokens in headers for the requests.


### Functionalities:
* Buyers and sellers can register and login to the system
* Sellers can build a catalog of items, with each item having a name and price
* Buyers can GET a list of sellers
* Buyers can GET a specific seller's catalog (list of items)
* Buyers can create an Order that contains a list of items from the seller's catalog
* Sellers can GET a list of all orders they've received

### APIs

#### Auth APIs
__POST /api/v1/auth/register__
* Register a user (accept username, password, type of user - buyer/seller)
POST /api/auth/login
* Let a previously registered user log in (e.g. retrieve authentication token)
#### APIs for buyers__
__GET /api/v1/buyer/list-of-sellers__
* Get a list of all sellers
__GET /api/v1/buyer/seller-catalog/:seller_id__
* Get the catalog of a seller by seller_id
__POST /api/v1/buyer/create-order/:seller_id__
* Send a list of items to create an order for seller with id = seller_id
#### APIs for sellers
__POST /api/v1/seller/create-catalog__
* Send a list of items to create a catalog for a seller
__GET /api/v1/seller/orders__
* Retrieve the list of orders received by a seller
 