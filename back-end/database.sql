-- Database: BookStore

-- DROP DATABASE IF EXISTS "BookStore";

-- CREATE DATABASE "BookStore";

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

CREATE TABLE users (
    customer_id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    phone VARCHAR(100)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount REAL NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
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

CREATE TABLE administrators (
    admin_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- GENERATE SAMPLE DATA
-- Insert 10 records into the genres table
INSERT INTO genres (name)
VALUES
    ('Fiction'),
    ('Mystery'),
    ('Romance'),
    ('Science Fiction'),
    ('Biography'),
    ('Fantasy'),
    ('Thriller'),
    ('Historical Fiction'),
    ('Self-Help'),
    ('Poetry');

-- Insert 10 records into the authors table
INSERT INTO authors (name)
VALUES
    ('John Smith'),
    ('Jane Doe'),
    ('Michael Johnson'),
    ('Emily Davis'),
    ('Robert Wilson'),
    ('Sarah Thompson'),
    ('David Brown'),
    ('Jennifer Lee'),
    ('Christopher Martin'),
    ('Lisa Anderson');

-- Insert 10 records into the books table
INSERT INTO books (title, image, price, quantity, discount)
VALUES
    ('Book 1', 'image1.jpg', 19.99, 10, 0.1),
    ('Book 2', 'image2.jpg', 14.99, 15, 0),
    ('Book 3', 'image3.jpg', 12.99, 8, 0),
    ('Book 4', 'image4.jpg', 16.99, 5, 0),
    ('Book 5', 'image5.jpg', 11.99, 12, 0),
    ('Book 6', 'image6.jpg', 22.99, 20, 0),
    ('Book 7', 'image7.jpg', 18.99, 7, 0),
    ('Book 8', 'image8.jpg', 21.99, 4, 0.2),
    ('Book 9', 'image9.jpg', 15.99, 9, 0),
    ('Book 10', 'image10.jpg', 29.99, 11, 0);

-- Insert records into the books_authors table
INSERT INTO books_authors (book_id, author_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3),
    (4, 4),
    (4, 5),
    (5, 6),
    (6, 7),
    (6, 8),
    (7, 9),
    (8, 10),
    (8, 1),
    (9, 3),
    (10, 5);

-- Insert records into the books_genres table
INSERT INTO books_genres (book_id, genre_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (3, 3),
    (4, 4),
    (4, 5),
    (5, 6),
    (6, 7),
    (6, 8),
    (7, 9),
    (8, 10),
    (8, 1),
    (9, 3),
    (10, 5);
