DROP DATABASE IF EXISTS bamazon2_db;
CREATE  DATABASE bamazon2_db;
USE bamazon2_db;

CREATE TABLE products(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(20),
price INTEGER(30),
stock_quantity INTEGER(20)
);

USE bamazon2_db;
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
	('YEEZY 350 V2 ZEBRA', 'shoes', 225, 10),
    ('PW Derupt', 'shoes', 180, 40),
    ('Desert Boots', 'shoes', 120, 400),
    ('OFF-WHITE Presto', 'shoes', 1800, 2),
    ('Shitty Sketchers', 'shoes', 5, 1000),
    ('Vapor Max', 'shoes', 180, 100)
