const multer = require('multer');
const multerConfig = require('../configs/multer');
const bookRoute = require('express').Router();
const bookController = require('../controllers/book.controller');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndAdminStaff
} = require('../middlewares/auth');

const upload = multer(multerConfig);

bookRoute
    .get('/genres/:id', bookController.getGenreById)
    .get('/genres', bookController.getGenres)
    .post('/genres', verifyTokenAndAdminStaff, bookController.createGenre)
    .put(
        '/genres/:id',
        verifyTokenAndAdminStaff,
        upload.single('image'),
        bookController.updateGenre
    )
    .delete('/genres/:id', verifyTokenAndAdminStaff, bookController.removeGenre)

    .get('/authors', bookController.getAuthors)
    .post('/authors', bookController.createAuthor)
    .patch(
        '/authors/:id',
        verifyTokenAndAdminStaff,
        bookController.updateAuthor
    )
    .delete(
        '/authors/:id',
        verifyTokenAndAdminStaff,
        bookController.removeAuthor
    )

    .get('/', bookController.getBooks)
    .get('/:id', bookController.getBookById)
    .post(
        '/',
        verifyTokenAndAdminStaff,
        upload.single('image'),
        bookController.createBook
    )
    .put(
        '/:id',
        verifyTokenAndAdminStaff,
        upload.single('image'),
        bookController.updateBook
    )
    .delete('/:id', verifyTokenAndAdminStaff, bookController.removeBook);

module.exports = bookRoute;
