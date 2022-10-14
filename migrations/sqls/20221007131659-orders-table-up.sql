CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    user_id INTEGER REFERENCES users(id) NOT NULL
);