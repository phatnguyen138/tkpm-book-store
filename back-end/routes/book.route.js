const multer = require('multer');
const multerConfig = require('../configs/multer');
const bookRoute = require('express').Router();
const bookController = require('../controllers/book.controller');
const { verifyToken } = require('../middlewares/auth');

const upload = multer(multerConfig);

bookRoute
    .get('/', bookController.getBooks)
    .post('/', upload.single('image'), bookController.createBook)
    .put('/:id', upload.single('image'), bookController.updateBook)

    .get('/genres', bookController.getGenres)
    .post('/genres', bookController.createGenre)
    .patch('/genres/:id', bookController.updateGenre)
    .delete('/genres/:id', bookController.removeGenre)

    .get('/authors', bookController.getAuthors)
    .post('/authors', bookController.createAuthor)
    .patch('/authors/:id', bookController.updateAuthor)
    .delete('/authors/:id', bookController.removeAuthor)

    .get('/:id', verifyToken, bookController.getBookById)
    // .put('/', bookController.signin)
    .delete('/:id', bookController.removeBook);

module.exports = bookRoute;
