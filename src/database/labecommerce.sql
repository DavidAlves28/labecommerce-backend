-- Active: 1680739378314@@127.0.0.1@3306

-- criacao Tabela

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime'))
       
    );

SELECT * FROM users;

-- Popular tabela

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u001",
        "Fulano",
        "Fulano@gmail.com",
        "123456"
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

-- Popular tabela

INSERT INTO products
VALUES (
        'p001',
        'Controle PS5',
        420,
        'Eletrônicos',
        'novo'
    );

-- Tabela Purchase  refatoracao

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer_id TEXT NOT NULL,
        total_price REAL DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')),
        paid INTEGER DEFAULT(0) NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

INSERT INTO purchases (id,paid,buyer_id) VALUES ('c001',1,'u001');

SELECT * FROM purchases;

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

SELECT * FROM purchases_products;

INSERT INTO purchases_products VALUES ('u001','p001',2);

-- Todos os dados da compra

SELECT *
FROM purchases_products
    INNER JOIN products ON purchases_products.product_id = products.id
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
    INNER JOIN users ON purchases.buyer_id = users.id;

SELECT *
FROM purchases
    INNER JOIN purchases_products ON purchases_products.purchase_id = purchases.id;


