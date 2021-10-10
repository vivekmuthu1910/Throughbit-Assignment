# Prerequistes:

- node >= 14
- npm >= 6
- MongoDB >= 5

# Running:

- Create 2 collections in the mongodb admin DB namely users and coins.
- Download the project as zip file and extract or use git clone.
- Open the project folder in powershell
- Run `npm install`
- Create a .env file with the following env variables
  ```env
  TOKEN_SECRET=random_secret
  MONGO_URL=mongodb://root:password@localhost:27017/admin
  ```
- Run `npm start`

# Testing:

The following curl commands can be used to test the APIs.

- Ping
  ```sh
  curl --location --request GET 'http://localhost:3000/ping'
  ```
- Add
  ```sh
  curl --location --request GET 'http://localhost:3000/add/123/112'
  ```
- Creating an User

  ```sh
  curl --location --request POST 'http://localhost:3000/users/create' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "username": "any_username",
      "password": "strongpassword"
  }'
  ```

- Login
  ```sh
  curl --location --request POST 'http://localhost:3000/users/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "username": "any_username",
      "password": "strongpassword"
  }'
  ```
  Login api returns an `accessToken`. Which has to be sent in the header of the following requests for authorization like this. `authorization: Bearer ${accessToken}`
- Get all coins
  ```sh
  curl --location --request GET 'http://localhost:3000/config' \
  --header 'Authorization: Bearer ${accessToken}'
  ```
- Get a coin with name
  ```sh
  curl --location --request GET 'http://localhost:3000/config/${coinName}' \
  --header 'Authorization: Bearer ${accessToken}'
  ```
- Post a new coin
  ```sh
  curl --location --request POST 'http://localhost:3000/config/' \
  --header 'Authorization: Bearer ${accesToken}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "name": "shia",
    "fee": 10,
    "active": true,
    "isMarket": false
  }'
  ```
- Edit a coin
  ```sh
  curl --location --request POST 'http://localhost:3000/config/${coinName}' \
  --header 'Authorization: Bearer ${accessToken}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "fee": 8,
      "active": false,
      "isMarket": false
  }'
  ```
