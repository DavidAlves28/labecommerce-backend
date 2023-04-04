-- Active: 1680568695456@@127.0.0.1@3306
 -- criacao Tabela  

CREATE TABLE users ( 
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
SELECT * FROM users;
-- Popular tabela 
INSERT INTO users (id,email,password)
VALUES
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
INSERT INTO products (id,name,price,category)
VALUES 
('p001','Controle PS5', 420, 'Eletrônicos'),
('p002','Monitor Gamer 24 Pol 144hz', 900, 'Eletrônicos'),
('p003','Cadeira ergonômica', 1420.99, 'Acessórios'),
('p004','Caderno Azul 500 folhas', 120, 'Acessórios'),
('p005','Camisa COD Warzone 2.0', 190.99, 'Roupas e Calçados');

 -- retornar todos os  usuários ADD
 SELECT * FROM users 
 ORDER BY email ASC;

-- retorna todos os produtos , ordenados pelo preco crescente  1 
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- retorna todos os produtos , com valores entre 100 e 300  
SELECT * FROM products
WHERE price >=100 AND price <=300
ORDER BY price ASC;

-- buscar produto pelo nome
SELECT * FROM products 
WHERE name LIKE "%monitor%";

-- insirir novo usuario na lista users
INSERT INTO users (id,email,password)
VALUES 
('u004','novoUSer@gmail.com','123123');

-- inserir novo produto a lista de products
INSERT INTO products (id,name,price,category)
VALUES 
('p006','Caneca COD Warzone 2.0', 99.50 , 'Acessórios');

-- buscar produto pelo id 
SELECT * FROM products
WHERE id = 'p002';

-- deletar user pelo seu id 
DELETE  FROM users
WHERE id = 'u003';

-- deletar produto pelo id 
DELETE FROM products
WHERE id = 'p002';

-- editar user pelo id 
UPDATE users
SET email = 'novoemail@gmail.com'
WHERE id= 'u001';

-- editar produto pelo seu id 
UPDATE products 
SET price = 1199.50
WHERE id='p003';


-- Tabela Purchase
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT ,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);
DROP TABLE purchases;
INSERT INTO purchases (id,total_price,paid,delivered_at,buyer_id)
VALUES
('pu001',350,0,NULL,'u001'),
('pu002',100,0,NULL,'u001'),
('pu003',120,0,NULL,'u002'),
('pu004',280,0,NULL,'u002'),
('pu005',400,0,NULL,'u001');

SELECT *FROM purchases;
UPDATE purchases
SET 
delivered_at =  DATETIME('now','localtime');

-- SELECT users.email , purchases.buyer_id , purchases.total_price FROM users
SELECT * FROM users
INNER JOIN purchases
ON users.id = purchases.buyer_id
WHERE users.id = 'u002';