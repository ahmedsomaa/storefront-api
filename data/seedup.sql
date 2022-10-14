-- populate some users
INSERT INTO users (email, first_name, last_name, password) VALUES
('mscott@dm.com', 'Michael', 'Scott', '$2b$10$4820a1wGshzteFKG55V0q.Adh2IrmLOQaduO9kAs5FCRjsI2j8txW'),
('dshrute@dm.com', 'Dwight', 'Schrute', '$2b$10$zADYIOx2Tfg/uUJTRTRL5.pVV.pjG9dceeyLyHK0Kx4sVY1blsxAO');

-- populate some products
INSERT INTO products (name, price, category) VALUES
('World''s Best Boss Mug', 13.99, 'Mugs'),
('That''s What She Said Wine Glass', 14.95, 'Wine'),
('Bonfire Candle', 22.99, 'Candles'),
('M&M''S', 13.90, 'Snacks'),
('Mini Cupcake', 22, 'Cupcakes'),
('Sticky Notes', 11.99, 'Notes'),
('Sabre Printer', 936.51, 'Printers'),
('Sabre Pyramid Tablet', 200, 'Tablets');

-- populate some orders
INSERT INTO orders (user_id, status) VALUES
(1, 'active'), (2, 'active'), (1, 'complete'), (2, 'complete');

-- populate some order products
INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 1, 1),
(2, 2, 16), 
(3, 3, 5), 
(4, 4, 10), 
(1, 5, 20), 
(2, 6, 2), 
(3, 7, 30), 
(4, 8, 3);
