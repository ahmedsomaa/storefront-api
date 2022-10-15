# REQUIREMENTS.md

This file acts as documentation for the API endpoints and database schema.

## API Endpoints

### Users

- Index - `token required`

  - HTTP verb `GET`
  - Endpoint:- `/users`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Array of user objects`

    ```json
    {
      "data": [
        { "id": 1, "email": "mscott@dm.com", "first_name": "Michael", "last_name": "Scott" },
        { "id": 2, "email": "dshrute@dm.com", "first_name": "Dwight", "last_name": "Schrute" },
        { "id": 5, "email": "jhalpert@dm.com", "first_name": "Jim", "last_name": "Halpert" }
      ],
      "errors": null,
      "message": "OK"
    }
    ```

- Show - `token required`

  - HTTP verb `GET`
  - Endpoint:- `/users/:id` - id of the user to be retrieved
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `User object`

    ```json
    {
      "data": {
        "id": 1,
        "email": "mscott@dm.com",
        "first_name": "Michael",
        "last_name": "Scott"
      },
      "errors": null,
      "message": "OK"
    }
    ```

- Create

  - HTTP verb `POST`
  - Endpoint:- `/users`
  - Request Body

    ```json
    {
      "email": "phyllis.vance@dm.com",
      "first_name": "Phyllis",
      "last_name": "Vance",
      "password": "flonkerton"
    }
    ```

  - Response Body -- `User object with JWT Token`

    ```json
    {
      "data": {
        "user": {
          "id": 9,
          "email": "phyllis.vance@dm.com",
          "first_name": "Phyllis",
          "last_name": "Vance"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkIjp7ImlkIjo5LCJlbWFpbCI6InBoeWxsaXMudmFuY2VAZG0uY29tIiwiZmlyc3RfbmFtZSI6IlBoeWxsaXMiLCJsYXN0X25hbWUiOiJWYW5jZSJ9LCJpYXQiOjE2NjU4MTY5Mjd9.Nv5cDFcZctDHnr9Ek5R0GCnOzEBb6Smp5XslOD_nfxs"
      },
      "errors": null,
      "message": "OK"
    }
    ```

- Update - `token required`

  - HTTP verb `PUT`
  - Endpoint:- `/users`
  - Request Body

    ```json
    {
      "id": 8,
      "email": "phyllis.vance@dundermifflin.com",
      "first_name": "Phyllis",
      "last_name": "Vance",
      "password": "flonkerton"
    }
    ```

  - Response Body -- `User object`

    ```json
    {
      "data": {
        "id": 8,
        "email": "phyllis.vance@dundermifflin.com",
        "first_name": "Phyllis",
        "last_name": "Vance"
      },
      "errors": null,
      "message": "OK"
    }
    ```

- Delete - `token required`

  - HTTP verb `DELETE`
  - Endpoint:- `/users/:id` - id of the user to be deleted
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `User object`

    ```json
    {
      "data": {
        "id": 8,
        "email": "phyllis.vance@dundermifflin.com",
        "first_name": "Phyllis",
        "last_name": "Vance"
      },
      "errors": null,
      "message": "OK"
    }
    ```

- Authenticate

  - HTTP verb `POST`
  - Endpoint:- `/users/auth`
  - Request Body

    ```json
    {
      "email": "dshrute@dm.com",
      "password": "battlestar_galactica"
    }
    ```

  - Response Body -- `User Authentication object`

    ```json
    {
      "data": {
        "user": {
          "id": 2,
          "email": "dshrute@dm.com",
          "first_name": "Dwight",
          "last_name": "Schrute"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6ImRzaHJ1dGVAZG0uY29tIiwiZmlyc3RfbmFtZSI6IkR3aWdodCIsImxhc3RfbmFtZSI6IlNjaHJ1dGUifSwiaWF0IjoxNjY1NzczMzMxfQ.SjX0KzQQj24ySOwKAM3hwCVplO3_CNdVJ31eKWULKnw"
      },
      "errors": null,
      "message": "OK"
    }
    ```

### Products

- Index

  - HTTP verb `GET`
  - Endpoint:- `/products`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Array of product objects`

    ```json
    {
      "data": [
        { "id": 1, "name": "World's Best Boss Mug", "price": "13.99", "category": "Mugs" },
        {
          "id": 2,
          "name": "That's What She Said Wine Glass",
          "price": "14.95",
          "category": "Wine"
        },
        { "id": 3, "name": "Bonfire Candle", "price": "22.99", "category": "Candles" },
        { "id": 4, "name": "M&M'S", "price": "13.90", "category": "Snacks" },
        { "id": 5, "name": "Mini Cupcake", "price": "22.00", "category": "Cupcakes" },
        { "id": 6, "name": "Sticky Notes", "price": "11.99", "category": "Notes" },
        { "id": 7, "name": "Sabre Printer", "price": "936.51", "category": "Printers" },
        { "id": 8, "name": "Sabre Pyramid Tablet", "price": "200.00", "category": "Tablets" }
      ],
      "errors": null,
      "message": "OK"
    }
    ```

- Index By Category

  - HTTP verb `GET`
  - Endpoint:- `/products?category=` - add type of category for filteration
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Array of product objects filtered by Tablets category`

    ```json
    {
      "data": [{ "id": 8, "name": "Sabre Pyramid Tablet", "price": 200, "category": "Tablets" }],
      "errors": null,
      "message": "OK"
    }
    ```

- Show

  - HTTP verb `GET`
  - Endpoint:- `/products/:id` - id of the product to be retrieved
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Product object`

    ```json
    {
      "data": { "id": 1, "name": "World's Best Boss Mug", "price": "13.99", "category": "Mugs" },
      "errors": null,
      "message": "OK"
    }
    ```

- Create - `token required`

  - HTTP verb `POST`
  - Endpoint:- `/products`
  - Request Body

    ```json
    {
      "name": "iPhone 14",
      "price": 829,
      "category": "Phones"
    }
    ```

  - Response Body -- `Product object`

    ```json
    {
      "data": {
        "id": 11,
        "name": "iPhone 14",
        "price": 829,
        "category": "Phones"
      },
      "errors": null,
      "message": "OK"
    }
    ```

- Update - `token required`

  - HTTP verb `PUT`
  - Endpoint:- `/products`
  - Request Body

    ```json
    {
      "id": 11,
      "name": "iPhone 14",
      "price": 829,
      "category": "Phones"
    }
    ```

  - Response Body -- `User object`

    ```json
    {
      "data": {
        "id": 11,
        "name": "iPhone 14 Pro",
        "price": 999,
        "category": "Phones"
      },
      "errors": null,
      "message": "OK"
    }
    ```

- Delete - `token required`

  - HTTP verb `DELETE`
  - Endpoint:- `/products/:id` - id of the product to be deleted
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Product object`

    ```json
    {
      "data": { "id": 11, "name": "iPhone 14 Pro", "price": "999.00", "category": "Phones" },
      "errors": null,
      "message": "OK"
    }
    ```

- Popular 5

  - HTTP verb `GET`
  - Endpoint:- `/products/popular-5`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Array of most 5 popular product objects`

    ```json
    {
      "data": [
        {
          "id": 7,
          "name": "Sabre Printer",
          "price": 936.51,
          "category": "Printers",
          "total_orders": 30
        },
        {
          "id": 5,
          "name": "Mini Cupcake",
          "price": 22,
          "category": "Cupcakes",
          "total_orders": 20
        },
        {
          "id": 2,
          "name": "That's What She Said Wine Glass",
          "price": 14.95,
          "category": "Wine",
          "total_orders": 16
        },
        { "id": 4, "name": "M&M'S", "price": 13.9, "category": "Snacks", "total_orders": 10 },
        {
          "id": 3,
          "name": "Bonfire Candle",
          "price": 22.99,
          "category": "Candles",
          "total_orders": 5
        }
      ],
      "errors": null,
      "message": "OK"
    }
    ```

### Orders

- Index

  - HTTP verb `GET`
  - Endpoint:- `/orders`
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Array of order objects`

    ```json
    {
      "data": [
        {
          "id": 1,
          "user_id": 1,
          "status": "active",
          "products": [
            { "product_id": 1, "quantity": 1 },
            { "product_id": 5, "quantity": 20 },
            { "product_id": 8, "quantity": 1 },
            { "product_id": 1, "quantity": 2 }
          ]
        },
        {
          "id": 2,
          "user_id": 2,
          "status": "active",
          "products": [
            { "product_id": 6, "quantity": 2 },
            { "product_id": 2, "quantity": 16 }
          ]
        },
        {
          "id": 3,
          "user_id": 1,
          "status": "complete",
          "products": [
            { "product_id": 7, "quantity": 30 },
            { "product_id": 3, "quantity": 5 }
          ]
        },
        {
          "id": 4,
          "user_id": 2,
          "status": "complete",
          "products": [
            { "product_id": 8, "quantity": 3 },
            { "product_id": 4, "quantity": 10 }
          ]
        }
      ],
      "errors": null,
      "message": "OK"
    }
    ```

- Show

  - HTTP verb `GET`
  - Endpoint:- `/orders/:id` - id of the order to be retrieved
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Order object`

    ```json
    {
      "data": {
        "id": 1,
        "user_id": 1,
        "status": "active",
        "products": [
          { "product_id": 1, "quantity": 1 },
          { "product_id": 5, "quantity": 20 },
          { "product_id": 8, "quantity": 1 },
          { "product_id": 1, "quantity": 2 }
        ]
      },
      "errors": null,
      "message": "OK"
    }
    ```

- Create

  - HTTP verb `POST`
  - Endpoint:- `/orders`
  - Request Body

    ```json
    {
      "user_id": 2,
      "status": "active"
    }
    ```

  - Response Body -- `Order object`

    ```json
    { "data": { "id": 7, "status": "active", "user_id": 2 }, "errors": null, "message": "OK" }
    ```

- Update

  - HTTP verb `PUT`
  - Endpoint:- `/orders`
  - Request Body

    ```json
    {
      "id": 7,
      "user_id": 2,
      "status": "complete"
    }
    ```

  - Response Body -- `Order object`

    ```json
    { "data": { "id": 7, "status": "complete", "user_id": 2 }, "errors": null, "message": "OK" }
    ```

- Delete

  - HTTP verb `DELETE`
  - Endpoint:- `/orders/:id` - id of the order to be deleted
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Oder object`

    ```json
    { "data": { "id": 8, "status": "complete", "user_id": 2 }, "errors": null, "message": "OK" }
    ```

- Add Product to an Order

  - HTTP verb `POST`
  - Endpoint:- `/orders/add-product`
  - Request Body

    ```json
    {
      "order_id": 7,
      "product_id": 8,
      "quantity": 2
    }
    ```

  - Response Body -- `OrderProduct object`

    ```json
    {
      "data": { "id": 11, "order_id": 7, "product_id": 8, "quantity": 2 },
      "errors": null,
      "message": "OK"
    }
    ```

- Current User Order - `token-required`

  - HTTP verb `GET`
  - Endpoint:- `/orders/users/:userId/current` - id of the user to retrieve the current order for
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Order object`

    ```json
    {
      "data": {
        "id": 1,
        "user_id": 1,
        "status": "active",
        "products": [
          { "product_id": 1, "quantity": 1 },
          { "product_id": 5, "quantity": 20 },
          { "product_id": 8, "quantity": 1 },
          { "product_id": 1, "quantity": 2 }
        ]
      },
      "errors": null,
      "message": "OK"
    }
    ```

- All Complete Orders for User - `token-required`

  - HTTP verb `GET`
  - Endpoint:- `/orders/users/:userId/complete` - id of the user to retrieve the list of complete orders for
  - Request Body

    ```json
    N/A
    ```

  - Response Body -- `Array of completed Order object`

    ```json
    {
      "data": [
        {
          "id": 3,
          "user_id": 1,
          "status": "complete",
          "products": [
            { "product_id": 3, "quantity": 5 },
            { "product_id": 7, "quantity": 30 }
          ]
        }
      ],
      "errors": null,
      "message": "OK"
    }
    ```

## Database Schema

![Project Architecture](./images/schema.png)

### Users Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR NOT NULL
);
```

### Products Schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(15, 2) NOT NULL,
  category VARCHAR(50)
);
```

### Orders Schema

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_id INTEGER REFERENCES users(id) NOT NULL
);
```

### OrderProducts Schema

```sql
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  quantity INTEGER
);
```

## Data Shapes

### User

```ts
export type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
```

### Account

```ts
export type Account = {
  email: string;
  password: string;
};
```

### Product

```ts
export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
  total_orders?: number;
};
```

### Order

```ts
export type Order = {
  id?: number;
  user_id: number;
  status: 'active' | 'complete';
  products?: Array<OrderProduct>;
};
```

### OrderProduct

```ts
export type OrderProduct = {
  id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;
};
```
