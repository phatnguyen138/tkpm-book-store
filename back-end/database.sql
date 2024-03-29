-- Database: BookStore

-- DROP DATABASE IF EXISTS "BookStore";

-- CREATE DATABASE "BookStore";

-- Create the tables
CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(500)
);

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    price REAL NOT NULL,
    quantity INT NOT NULL,
    discount REAL DEFAULT 0
);

CREATE TABLE books_authors (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id),
    FOREIGN KEY (author_id) REFERENCES authors (author_id)
);

CREATE TABLE books_genres (
    book_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id),
    FOREIGN KEY (genre_id) REFERENCES genres (genre_id)
);

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(500),
    address VARCHAR(200),
    phone VARCHAR(100),
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount REAL NOT NULL,
    payment_status INT DEFAULT 0,
    payment_provider VARCHAR(200) DEFAULT 'direct',
    address_shipping VARCHAR(500),
    phone_shipping VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL,
    item_price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id)
);

CREATE TABLE debt_reports (
    debt_id SERIAL PRIMARY KEY,
    report_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(500)
);

CREATE TABLE debt_report_details (
    debt_id INT NOT NULL,
    user_id INT NOT NULL,
    initial_debt_amount REAL,
    final_debt_amount REAL,
    FOREIGN KEY (debt_id) REFERENCES debt_reports (debt_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE inventory_reports (
    inventory_id SERIAL PRIMARY KEY,
    report_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(500)
);

CREATE TABLE inventory_report_details (
    inventory_id INT NOT NULL,
    book_id INT NOT NULL,
    initial_inventory_amount REAL,
    final_inventory_amount REAL,
    FOREIGN KEY (inventory_id) REFERENCES inventory_reports (inventory_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id)
);

CREATE TABLE regulation (
    rule_id SERIAL PRIMARY KEY,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    minimum_inventory_quantity INT NOT NULL,
    minimum_order_quantity INT NOT NULL,
    maximum_debt REAL NOT NULL
);

ALTER DATABASE "BookStore" SET "TimeZone" TO 'Asia/Ho_Chi_Minh';

-- GENERATE SAMPLE DATA
-- Insert data into tables
INSERT INTO roles (name)
VALUES 
    ('Administrator'),
	('Staff'),
	('Customer');

-- Insert data into tables
INSERT INTO genres (name, image)
VALUES
    ('Fiction', 'http://localhost:3000/covers/fiction.jpg'),
    ('Mystery', 'http://localhost:3000/covers/mystery.jpg'),
    ('Science Fiction', 'http://localhost:3000/covers/sci-fi.jpg'),
    ('Romance', 'http://localhost:3000/covers/romance.jpg'),
    ('Thriller', 'http://localhost:3000/covers/thriller.jpg'),
    ('Fantasy', 'http://localhost:3000/covers/fantasy.jpg'),
    ('Biography', 'http://localhost:3000/covers/biography.jpg'),
    ('History', 'http://localhost:3000/covers/history.jpg' ),
    ('Self-Help', 'http://localhost:3000/covers/self-help.jpg'),
    ('Horror', 'http://localhost:3000/covers/horror.jpg');

INSERT INTO authors (name)
VALUES
    ('John Smith'),
    ('Emily Johnson'),
    ('Michael Davis'),
    ('Sarah Thompson'),
    ('David Wilson'),
    ('Emma Brown'),
    ('Matthew Clark'),
    ('Olivia Lee'),
    ('James Miller'),
    ('Sophia Anderson');

INSERT INTO books (title, image, price, quantity, discount)
VALUES
    ('The Great Gatsby', 'http://localhost:3000/images/greatgatsby.jpg', 12.99, 50, 0),
    ('Pride and Prejudice', 'http://localhost:3000/images/prideprejudice.jpg', 9.99, 25, 0),
    ('To Kill a Mockingbird', 'http://localhost:3000/images/tokillamockingbird.jpg', 11.99, 40, 0),
    ('1984', 'http://localhost:3000/images/1984.jpg', 14.99, 30, 0),
    ('The Catcher in the Rye', 'http://localhost:3000/images/catcherintherye.jpg', 10.99, 20, 0),
    ('The Lord of the Rings', 'http://localhost:3000/images/lordoftherings.jpg', 19.99, 15, 0),
    ('Harry Potter and the Sorcerer''s Stone', 'http://localhost:3000/images/harrypotter1.jpg', 8.99, 35, 0),
    ('The Da Vinci Code', 'http://localhost:3000/images/davincicode.jpg', 13.99, 10, 0),
    ('The Chronicles of Narnia', 'http://localhost:3000/images/narnia.jpg', 16.99, 45, 0),
    ('Gone Girl', 'http://localhost:3000/images/gonegirl.jpg', 17.99, 50, 0);

-- Insert authors for books
INSERT INTO books_authors (book_id, author_id)
VALUES
    (1, 1),
    (2, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 6),
    (6, 1),
    (7, 7),
    (7, 8),
    (8, 9),
    (9, 10),
    (10, 4);

-- Insert genres for books
INSERT INTO books_genres (book_id, genre_id)
VALUES
    (1, 1),
    (2, 4),
    (3, 1),
    (4, 3),
    (5, 1),
    (5, 5),
    (6, 6),
    (7, 2),
    (8, 7),
    (8, 8),
    (9, 6),
    (10, 5),
    (10, 9);