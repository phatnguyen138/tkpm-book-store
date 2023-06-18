const bookModel = require('../models/book.model');

/* Genre Controller */

const getGenres = async (req, res) => {
    const books = await bookModel.findAllGenres();
    return res.status(200).json({
        success: true,
        data: books
    });
};

const createGenre = async (req, res) => {
    const genre_name = req.body.name;
    const genre = await bookModel.insertGenre(genre_name);
    return res.status(201).json({
        success: true,
        data: genre
    });
};

const updateGenre = async (req, res) => {
    const genre_name = req.body.name;
    const genre_id = req.params.id;
    const genre = await bookModel.updateGenreById(genre_name, genre_id);
    return res.status(200).json({
        success: true,
        data: genre
    });
};

const removeGenre = async (req, res) => {
    const genre_id = req.params.id;
    await bookModel.deleteGenre(genre_id);
    return res.status(200).json({
        success: true
    });
};

/* Author Controller */

const getAuthors = async (req, res) => {
    const books = await bookModel.findAllAuthors();
    return res.status(200).json({
        success: true,
        data: books
    });
};

/* Book Controller */

const getBooks = async (req, res) => {
    const { author, genre } = req.query;
    let books = await bookModel.findAllBooks();
    if (author && genre) {
        books = books.filter((book) => {
            const author_name = book.authors.includes(author);
            const genre_name = book.genres.includes(genre);
            return author_name && genre_name;
        });
    } else if (author) {
        books = books.filter((book) => book.authors.includes(author));
    } else if (genre) {
        books = books.filter((book) => book.genres.includes(genre));
    }
    return res.status(200).json({
        success: true,
        data: books
    });
};

const getBookById = async (req, res) => {
    const book_id = req.params.id;
    console.log('book id', book_id);
    const book = await bookModel.findBookById(book_id);
    return res.status(200).json({
        success: true,
        data: book
    });
};

const removeBook = async (req, res) => {
    const book_id = req.params.id;
    await bookModel.deleteBook(book_id);
    return res.status(200).json({
        success: true
    });
};

module.exports = {
    createGenre,
    getAuthors,
    getBookById,
    getBooks,
    getGenres,
    removeBook,
    removeGenre,
    updateGenre
};
