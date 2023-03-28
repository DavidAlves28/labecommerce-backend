 -- criacao Tabela  

CREATE TABLE users ( 
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

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

INSERT INTO products (id,name,price,category)
VALUES 
('p001','Controle PS5', 420, 'Eletrônicos'),
('p002','Monitor Gamer 24 Pol 144hz', 900, 'Eletrônicos'),
('p003','Cadeira ergonômica', 1420.99, 'Acessórios'),
('p004','Caderno Azul 500 folhas', 120, 'Acessórios'),
('p005','Camisa COD Warzone 2.0', 190.99, 'Roupas e Calçados');