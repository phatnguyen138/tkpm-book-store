-- Database: BookStore

-- DROP DATABASE IF EXISTS "BookStore";

CREATE DATABASE "BookStore";

-- Create the tables
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
	image VARCHAR(100),
    author VARCHAR(100) NOT NULL,
	genres VARCHAR(100)
    price NUMERIC(8, 2) NOT NULL,
);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    address VARCHAR(200),
	phone VARCHAR(100)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);/

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL,
    item_price NUMERIC(8, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id)
);
