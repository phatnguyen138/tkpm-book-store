-- Database: BookStore

-- DROP DATABASE IF EXISTS "BookStore";

CREATE DATABASE "BookStore";

-- Create the tables
CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image VARCHAR(100),
    price NUMERIC(8, 2) NOT NULL
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

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL,
    item_price NUMERIC(8, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id)
);

CREATE TABLE administrators (
    admin_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- GENERATE SAMPLE DATA
-- Inserting records into the genres table
INSERT INTO genres (name)
VALUES ('Science Fiction'),
       ('Mystery'),
       ('Romance'),
       ('Fantasy'),
       ('Thriller'),
       ('Biography'),
       ('History'),
       ('Self-Help'),
       ('Cooking'),
       ('Business');

-- Inserting records into the authors table
INSERT INTO authors (name)
VALUES ('Stephen King'),
       ('J.K. Rowling'),
       ('Agatha Christie'),
       ('Jane Austen'),
       ('Dan Brown'),
       ('Michelle Obama'),
       ('Yuval Noah Harari'),
       ('Dale Carnegie'),
       ('Jamie Oliver'),
       ('Elon Musk');

-- Inserting records into the books table
INSERT INTO books (title, image, price)
VALUES ('The Shining', 'shining.jpg', 12.99),
       ('Harry Potter and the Philosopher''s Stone', 'harry_potter.jpg', 9.99),
       ('Murder on the Orient Express', 'orient_express.jpg', 14.99),
       ('Pride and Prejudice', 'pride_prejudice.jpg', 10.99),
       ('The Da Vinci Code', 'da_vinci_code.jpg', 11.99),
       ('Becoming', 'becoming.jpg', 13.99),
       ('Sapiens: A Brief History of Humankind', 'sapiens.jpg', 15.99),
       ('How to Win Friends and Influence People', 'win_friends.jpg', 8.99),
       ('Jamie''s 30-Minute Meals', '30_minute_meals.jpg', 16.99),
       ('Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future', 'elon_musk.jpg', 17.99);

-- Inserting records into the books_authors table
INSERT INTO books_authors (book_id, author_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8),
       (9, 9),
       (10, 10),
       (10, 5),
       (10, 7);

-- Inserting records into the books_genres table
INSERT INTO books_genres (book_id, genre_id)
VALUES (1, 2),
       (2, 1),
       (3, 2),
       (4, 3),
       (5, 4),
       (6, 6),
       (7, 7),
       (8, 8),
       (9, 9),
       (10, 10),
       (10, 4);
