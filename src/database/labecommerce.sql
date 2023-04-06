-- Active: 1680739378314@@127.0.0.1@3306
 -- criacao Tabela  

CREATE TABLE users ( 
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
SELECT * FROM users;
-- Popular tabela 
INSERT INTO users (id,email,password) VALUES
("u001","Fulano@gmail.com", "123456"),
("u002","Ciclano@gmail.com", "123456"),
("u003","fulana@gmail.com", "123456");

CREATE TABLE products ( 
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    category TEXT NOT NULL
);
-- Popular tabela
INSERT INTO products VALUES 
('p001','Controle PS5', 420, 'Eletrônicos'),
('p002','Monitor Gamer 24 Pol 144hz', 900, 'Eletrônicos'),
('p003','Cadeira ergonômica', 1420.99, 'Acessórios'),
('p004','Caderno Azul 500 folhas', 120, 'Acessórios'),
('p005','Camisa COD Warzone 2.0', 190.99, 'Roupas e Calçados');


-- Tabela Purchase  refatoracao
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL DEFAULT(0) NOT NULL,
    paid INTEGER  DEFAULT(0) NOT NULL,
    delivered_at  TEXT DEFAULT(DATETIME('now','localtime')) ,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id,paid,buyer_id)
VALUES
('pu001',1,'u001'),
('pu002',1,'u001'),
('pu003',1,'u002'),
('pu004',1,'u002'),
('pu005',1,'u001');

SELECT * FROM purchases;

CREATE TABLE purchases_products
(
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
SELECT * FROM purchases_products;

INSERT INTO purchases_products VALUES
('pu001','p003',2),
('pu002','p001',5),
('pu003','p004',1);



 -- Todos os dados da compra
SELECT * FROM purchases_products 
INNER JOIN products ON purchases_products.product_id = products.id
INNER JOIN purchases ON  purchases_products.purchase_id = purchases.id
INNER JOIN users ON  purchases.buyer_id = users.id; 


