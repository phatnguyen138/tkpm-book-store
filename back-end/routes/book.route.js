const multer = require('multer');
const multerConfig = require('../configs/multer');
const bookRoute = require('express').Router();
const bookController = require('../controllers/book.controller');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../middlewares/auth');

const upload = multer(multerConfig);

bookRoute
    .get('/genres', bookController.getGenres)
    .post('/genres', bookController.createGenre)
    .patch('/genres/:id', bookController.updateGenre)
    .delete('/genres/:id', bookController.removeGenre)

    .get('/authors', bookController.getAuthors)
    .post('/authors', bookController.createAuthor)
    .patch('/authors/:id', bookController.updateAuthor)
    .delete('/authors/:id', bookController.removeAuthor)

    .get('/', bookController.getBooks)
    .get('/:id', bookController.getBookById)
    .post('/', upload.single('image'), bookController.createBook)
    .put('/:id', upload.single('image'), bookController.updateBook)
    .delete('/:id', bookController.removeBook);

module.exports = bookRoute;
