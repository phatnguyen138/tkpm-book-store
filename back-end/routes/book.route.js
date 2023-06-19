const bookRoute = require('express').Router();
const bookController = require('../controllers/book.controller');
const verifyToken = require('../middlewares/auth');

bookRoute
    .get('/', bookController.getBooks)

    .get('/genres', bookController.getGenres)
    .post('/genres', bookController.createGenre)
    .patch('/genres/:id', bookController.updateGenre)
    .delete('/genres/:id', bookController.removeGenre)

    .get('/authors', bookController.getAuthors)
    .post('/authors', bookController.createAuthor)
    .patch('/authors/:id', bookController.updateAuthor)
    .delete('/authors/:id', bookController.removeAuthor)

    .get('/:id', verifyToken, bookController.getBookById)
    // .post('/', bookController.signin)
    // .put('/', bookController.signin)
    .delete('/:id', bookController.removeBook);

module.exports = bookRoute;
