const db = require('../configs/db');

/* Genre Model */

const findAllGenres = async () => {
    const genres = await db.any('SELECT * FROM genres ORDER BY genre_id ASC');
    return genres;
};

const insertGenre = async (genre_name) => {
    const genre = await db.one(
        'INSERT INTO genres (name) VALUES ($1) RETURNING *',
        genre_name
    );
    return genre;
};

const updateGenreById = async (genre_name, id) => {
    const updateQuery = `UPDATE genres SET name = $1 WHERE genre_id = ${id} RETURNING *`;
    const genre = await db.one(updateQuery, genre_name);
    return genre;
};

const deleteGenre = async (id) => {
    const res = await db.none('DELETE FROM genres where genre_id = $1', id);
    return res;
};

/* Author Model */

const findAllAuthors = async () => {
    const authors = await db.any(
        'SELECT * FROM authors ORDER BY author_id ASC'
    );
    return authors;
};

const insertAuthor = async (author_name) => {
    const author = await db.one(
        'INSERT INTO authors (name) VALUES ($1) RETURNING *',
        author_name
    );
    return author;
};

const updateAuthorById = async (author_name, id) => {
    const updateQuery = `UPDATE authors SET name = $1 WHERE author_id = ${id} RETURNING *`;
    const author = await db.one(updateQuery, author_name);
    return author;
};

const deleteAuthor = async (id) => {
    const res = await db.none('DELETE FROM authors where author_id = $1', id);
    return res;
};

/* Book Model */

const findAllBooks = async (limit = 'ALL', offset = 0) => {
    const books =
        await db.any(`SELECT b.book_id, b.title, b.image, b.price, b.quantity, b.discount, STRING_AGG(DISTINCT a.name, ', ') AS authors, STRING_AGG(DISTINCT g.name, ', ') AS genres
                      FROM books AS b LEFT JOIN books_authors AS ba ON b.book_id = ba.book_id 
                                      LEFT JOIN authors AS a ON ba.author_id = a.author_id 
                                      LEFT JOIN books_genres AS bg ON b.book_id = bg.book_id
                                      LEFT JOIN genres AS g ON bg.genre_id = g.genre_id
                      WHERE b.book_id IN (SELECT b.book_id FROM books AS b LEFT JOIN books_authors AS ba ON b.book_id = ba.book_id GROUP BY b.book_id)
                        AND b.book_id IN (SELECT b.book_id FROM books AS b LEFT JOIN books_genres AS bg ON b.book_id = bg.book_id GROUP BY b.book_id)
                      GROUP BY b.book_id, b.title, b.image, b.price
                      ORDER BY b.book_id ASC LIMIT ${limit} OFFSET ${offset}`);
    return books;
};

const findBookById = async (id) => {
    const book = await db.oneOrNone(
        `SELECT b.book_id, b.title, b.image, b.price, b.quantity, b.discount, STRING_AGG(DISTINCT a.name, ', ') AS authors, STRING_AGG(DISTINCT g.name, ', ') AS genres
        FROM books AS b LEFT JOIN books_authors AS ba ON b.book_id = ba.book_id 
                        LEFT JOIN authors AS a ON ba.author_id = a.author_id 
                        LEFT JOIN books_genres AS bg ON b.book_id = bg.book_id
                        LEFT JOIN genres AS g ON bg.genre_id = g.genre_id
        WHERE b.book_id IN (SELECT b.book_id FROM books AS b LEFT JOIN books_authors AS ba ON b.book_id = ba.book_id GROUP BY b.book_id)
          AND b.book_id IN (SELECT b.book_id FROM books AS b LEFT JOIN books_genres AS bg ON b.book_id = bg.book_id GROUP BY b.book_id)
          AND b.book_id = $1
        GROUP BY b.book_id, b.title, b.image, b.price`,
        id
    );
    return book;
};

const deleteBook = async (id) => {
    const removeBA = `DELETE FROM books_authors where book_id = ${id}`;
    const removeBG = `DELETE FROM books_genres where book_id = ${id}`;
    const removeBook = `DELETE FROM books where book_id = ${id}`;
    const res = db.tx(async (t) => {
        await t.none(removeBA);
        await t.none(removeBG);
        await t.none(removeBook);
    });
    return res;
};

const insertBook = async (title, image, price, quantity, discount) => {
    const book = await db.one(
        'INSERT INTO books (title, image, price, quantity, discount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, image, price, quantity, discount]
    );
    return book;
};

const insertBookAuthor = async (book_id, author_id) => {
    const books_authors = await db.one(
        'INSERT INTO books_authors (book_id, author_id) VALUES ($1, $2) RETURNING *',
        [book_id, author_id]
    );
    return books_authors;
};

const deleteBookAuthor = async (book_id) => {
    const books_authors = await db.none(
        'DELETE FROM books_authors where book_id = $1',
        book_id
    );
    return books_authors;
};

const insertBookGenre = async (book_id, genre_id) => {
    const books_genres = await db.one(
        'INSERT INTO books_genres (book_id, genre_id) VALUES ($1, $2) RETURNING *',
        [book_id, genre_id]
    );
    return books_genres;
};

const deleteBookGenre = async (book_id) => {
    const books_genres = await db.one(
        'DELETE FROM books_genres where book_id = $1',
        book_id
    );
    return books_genres;
};

const updateBookById = async (title, image, price, quantity, discount, id) => {
    const updateQuery = `UPDATE books SET title = $1, image = $2, price = $3, quantity = $4, discount = $5 WHERE book_id = ${id} RETURNING *`;
    const book = await db.one(
        updateQuery,
        title,
        image,
        price,
        quantity,
        discount
    );
    return book;
};

module.exports = {
    deleteAuthor,
    deleteBook,
    deleteGenre,
    findAllAuthors,
    findAllBooks,
    findAllGenres,
    findBookById,
    insertAuthor,
    insertBook,
    insertBookAuthor,
    insertBookGenre,
    insertGenre,
    updateAuthorById,
    updateGenreById,
    updateBookById,
    deleteBookAuthor,
    deleteBookGenre
};
