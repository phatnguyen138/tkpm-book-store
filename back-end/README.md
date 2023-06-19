# Book Store API

How to run it ?

```
yarn start
```

After that, the server will be running on port 3000. You can also access it through the browser using the following link: http://localhost:3000.

## Endpoints:

-   Base URL: http://localhost:3000/api/v1

### Users

-   Sign Up: [POST] /users/signup
-   Sign In: [POST] /users/signin
-   Authentication: [GET] /users/auth

### Books

-   Get books: [GET] /books
-   Get book by id: [GET] /books/:id
-   Delete book: [DELETE] /books/:id

**Genres**

-   Get genres: [GET] /books/genres
-   Create genre: [POST] /books/genres
-   Update genre: [PATCH] /books/genres/:id
-   Delete genre: [DELETE] /books/genres/:id

**Authors**

-   Get authors: [GET] /books/authors
-   Create author: [POST] /books/authors
-   Update author: [PATCH] /books/authors/:id
-   Delete author: [DELETE] /books/authors/:id

See details in here: ([API Documentation](https://documenter.getpostman.com/view/24674805/2s93si1prs#96b01024-447a-4b23-8ca1-a9617caa0a3a))
