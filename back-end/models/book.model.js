const db = require('../configs/db');

/* Genre Model */

const findAllGenres = async () => {
    const genres = await db.any('SELECT * FROM genres');
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

const findAllAuthors = async () => {
    const authors = await db.any('SELECT * FROM authors');
    return authors;
};

const findAllBooks = async () => {
    const books =
        await db.any(`SELECT b.book_id, b.title, b.image, b.price, STRING_AGG(DISTINCT a.name, ', ') AS authors, STRING_AGG(DISTINCT g.name, ', ') AS genres
                    FROM books AS b 
                    JOIN books_authors AS ba ON b.book_id = ba.book_id 
                    JOIN authors AS a ON ba.author_id = a.author_id 
                    JOIN books_genres AS bg ON b.book_id = bg.book_id
                    JOIN genres AS g ON bg.genre_id = g.genre_id
                    WHERE b.book_id IN (
                            SELECT b.book_id FROM books AS b
                            JOIN books_authors AS ba ON b.book_id = ba.book_id
                            GROUP BY b.book_id
                        )
                        AND b.book_id IN (
                            SELECT b.book_id FROM books AS b
                            JOIN books_genres AS bg ON b.book_id = bg.book_id
                            GROUP BY b.book_id
                        )
                    GROUP BY
                        b.book_id, b.title, b.image, b.price`);
    return books;
};

const findBookById = async (id) => {
    const book = await db.oneOrNone(
        'SELECT * FROM books WHERE book_id = $1',
        id
    );
    return book;
};

const create = async (email, password, fullname, address) => {
    const user = await db.none(
        'INSERT INTO customers (email, password, fullname, address) VALUES ($1, $2, $3, $4)',
        [email, password, fullname, address]
    );
    return user;
};

module.exports = {
    create,
    deleteBook,
    insertGenre,
    deleteGenre,
    updateGenreById,
    findAllAuthors,
    findAllBooks,
    findAllGenres,
    findBookById
};