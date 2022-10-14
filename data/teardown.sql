-- teardown seed order_products
DELETE FROM order_products;
ALTER SEQUENCE order_products_id_seq RESTART WITH 1;

-- teardown seed orders
DELETE FROM orders;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;

-- teardown seed products
DELETE FROM products;
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- teardown seed users
DELETE FROM users;
ALTER SEQUENCE users_id_seq RESTART WITH 1;