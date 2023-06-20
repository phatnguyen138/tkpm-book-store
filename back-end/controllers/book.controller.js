const bookModel = require('../models/book.model');
const { Error } = require('../helpers/error.helper');

/* Genre Controller */

const getGenres = async (req, res) => {
    const books = await bookModel.findAllGenres();
    return res.status(200).json({
        success: true,
        data: books
    });
};

const createGenre = async (req, res, next) => {
    const genre_name = req.body.name;
    if (!genre_name) return next(new Error(400, 'Missing fields'));
    const genre = await bookModel.insertGenre(genre_name);
    return res.status(201).json({
        success: true,
        data: genre
    });
};

const updateGenre = async (req, res, next) => {
    const genre_name = req.body.name;
    const genre_id = req.params.id;
    if (!genre_name || !genre_id) return next(handle(400, 'Missing fields'));
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

const createAuthor = async (req, res, next) => {
    const author_name = req.body.name;
    if (!author_name) return next(new Error(400, 'Missing fields'));
    const author = await bookModel.insertAuthor(author_name);
    return res.status(201).json({
        success: true,
        data: author
    });
};

const updateAuthor = async (req, res, next) => {
    const author_name = req.body.name;
    const author_id = req.params.id;
    if (!author_name || !author_id)
        return next(new Error(400, 'Missing fields'));
    const author = await bookModel.updateAuthorById(author_name, author_id);
    return res.status(200).json({
        success: true,
        data: author
    });
};

const removeAuthor = async (req, res) => {
    const author_id = req.params.id;
    await bookModel.deleteAuthor(author_id);
    return res.status(200).json({
        success: true
    });
};

/* Book Controller */

const getBooks = async (req, res) => {
    const { title, author, genre, limit, offset } = req.query;
    let books = await bookModel.findAllBooks(limit, offset);
    if (author && genre && title) {
        books = books.filter((book) => {
            const author_name = book.authors.includes(author);
            const genre_name = book.genres.includes(genre);
            const book_title = book.title.includes(title);
            return author_name && genre_name && book_title;
        });
    } else if (title) {
        books = books.filter((book) => book.title.includes(title));
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
    const book = await bookModel.findBookById(book_id);
    return res.status(200).json({
        success: true,
        data: book
    });
};

const createBook = async (req, res, next) => {
    let { title, price, quantity, discount, genres, authors } = req.body;
    if (
        !title ||
        !req.file ||
        !price ||
        !quantity ||
        !discount ||
        !genres ||
        !authors
    )
        return next(new Error(400, 'Missing fields'));

    const staticURL = `http://localhost:3000/images/${req.file.filename}`;
    // insert book
    const book = await bookModel.insertBook(
        title,
        staticURL,
        price,
        quantity,
        discount
    );

    // check if authors exist
    array_authors = authors.split(',').map((author) => author.trim());
    const getAuthors = await bookModel.findAllAuthors();
    array_authors.forEach(async (author) => {
        const existAuthor = getAuthors.find(
            (author_db) => author_db.name === author
        );
        if (!existAuthor) {
            const newAuthor = await bookModel.insertAuthor(author);
            await bookModel.insertBookAuthor(book.book_id, newAuthor.author_id);
        } else {
            await bookModel.insertBookAuthor(
                book.book_id,
                existAuthor.author_id
            );
        }
    });

    // check if genres exist
    const getGenres = await bookModel.findAllGenres();
    array_genres = genres.split(',').map((genre) => genre.trim());
    array_genres.forEach(async (genre) => {
        const existGenre = getGenres.find(
            (genre_db) => genre_db.name === genre
        );
        if (!existGenre) {
            const newGenre = await bookModel.insertGenre(genre);
            await bookModel.insertBookGenre(book.book_id, newGenre.genre_id);
        } else {
            await bookModel.insertBookGenre(book.book_id, existGenre.genre_id);
        }
    });

    return res.status(201).json({
        success: true,
        data: {
            book_id: book.book_id,
            title,
            image: staticURL,
            price,
            quantity,
            discount,
            authors,
            genres
        }
    });
};

const updateBook = async (req, res, next) => {
    const { title, price, quantity, discount, authors, genres } = req.body;
    const image = req.file
        ? `http://localhost:3000/images${req.file.filename}`
        : undefined;
    const updatedBook = {
        title,
        image,
        price,
        quantity,
        discount,
        authors,
        genres
    };
    const book_id = req.params.id;
    let book = await bookModel.findBookById(book_id);

    if (
        !title &&
        !req.file &&
        !price &&
        !quantity &&
        !discount &&
        !authors &&
        !genres
    ) {
        return res.status(200).json({
            success: true,
            data: book
        });
    }
    for (let prop in updatedBook) {
        if (
            updatedBook.hasOwnProperty(prop) &&
            updatedBook[prop] !== undefined
        ) {
            book[prop] = updatedBook[prop];
        }
    }
    console.log('new book after updated', book);

    // delete relation book-author
    await bookModel.deleteBookAuthor(book.book_id);
    // check if authors exist
    array_authors = authors.split(',').map((author) => author.trim());
    const getAuthors = await bookModel.findAllAuthors();
    array_authors.forEach(async (author) => {
        const existAuthor = getAuthors.find(
            (author_db) => author_db.name === author
        );
        if (!existAuthor) {
            const newAuthor = await bookModel.insertAuthor(author);
            await bookModel.insertBookAuthor(book.book_id, newAuthor.author_id);
        } else {
            await bookModel.insertBookAuthor(
                book.book_id,
                existAuthor.author_id
            );
        }
    });

    // delete relation book-genre
    await bookModel.deleteBookGenre(book.book_id);
    // check if genres exist
    const getGenres = await bookModel.findAllGenres();
    array_genres = genres.split(',').map((genre) => genre.trim());
    array_genres.forEach(async (genre) => {
        const existGenre = getGenres.find(
            (genre_db) => genre_db.name === genre
        );
        if (!existGenre) {
            const newGenre = await bookModel.insertGenre(genre);
            await bookModel.insertBookGenre(book.book_id, newGenre.genre_id);
        } else {
            await bookModel.insertBookGenre(book.book_id, existGenre.genre_id);
        }
    });
    await bookModel.updateBookById(book_id);
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
    createAuthor,
    createBook,
    getAuthors,
    getBookById,
    getBooks,
    getGenres,
    removeBook,
    removeGenre,
    removeAuthor,
    updateGenre,
    updateAuthor,
    updateBook
};
