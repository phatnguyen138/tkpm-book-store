# Book Store API

Configure the PostgreSQL database according to the format specified in the .env.example file.

Installation all dependency packages

```
yarn install
```

How to run it ?

```
yarn start
```

After that, the server will be running on port 3000. You can also access it through the browser using the following link: http://localhost:3000.

## Endpoints:

-   Base URL: http://localhost:3000/api/v1

### Users

-   Get all users: [GET] /users
-   Get profile user: [GET] /users/profile (**Authentication**)
-   Sign Up: [POST] /users/signup
-   Sign In: [POST] /users/signin
-   Update user: [PUT] /users/update/{user_id} (**Authentication and Authorization**)
-   Reset password: [PATCH] /users/reset (**Authentication**)
-   Authentication: [GET] /users/auth (**Authentication**)

### Books

-   Get books: [GET] /books
-   Get book by id: [GET] /books/{book_id}
-   Create book: [POST] /books (**Authentication and Authorization**)
-   Update book: [PUT] /books/{book_id} (**Authentication and Authorization**)
-   Delete book: [DELETE] /books/{book_id} (**Authentication and Authorization**)

**Genres**

-   Get genres: [GET] /books/genres
-   Get genre by id: [GET] /books/genres/{genre_id}
-   Create genre: [POST] /books/genres (**Authentication and Authorization**)
-   Update genre: [PUT] /books/genres/{genre_id} (**Authentication and Authorization**)
-   Delete genre: [DELETE] /books/genres/{genre_id} (**Authentication and Authorization**)

**Authors**

-   Get authors: [GET] /books/authors
-   Create author: [POST] /books/authors (**Authentication and Authorization**)
-   Update author: [PATCH] /books/authors/{author_id} (**Authentication and Authorization**)
-   Delete author: [DELETE] /books/authors/{author_id} (**Authentication and Authorization**)

### Orders

-   Get all orders: [GET] /orders
-   Get order by id: [GET] /orders/{order_id}
-   Create order: [POST] /orders (**Authentication and Authorization**)
-   Delete order: [DELETE] /orders/{order_id} (**Authentication and Authorization**)

**Items**

-   Get all items in order: [GET] /items (**Authentication and Authorization**)
-   Add item in order (create new order if order is not exist): [POST] /items (**Authentication and Authorization**)
-   Delete all items in order: [DELETE] /orders/{order_id}/items (**Authentication and Authorization**)

**Check out**

-   Check out order: [POST] /{order_id}/checkout (**Authentication and Authorization**)

### Report

**Inventory report**

-   Get all inventory report: [GET] /report/inventory
-   Get inventory report by id: [GET] /report/inventory/{inventory_id}
-   Create inventory report: [POST] /report/inventory
-   Update inventory report: [PUT] /report/inventory/{inventory_id}
-   Delete inventory report: [DELETE] /report/inventory/{inventory_id}

**Inventory report details**

-   Get all inventory report details: [GET] /report/inventory/{inventory_id}/details
-   Create inventory report detail: [POST] /report/inventory/{inventory_id}/details
-   Update inventory report detail: [PUT] /report/inventory/{inventory_id}/details/{book_id}
-   Delete inventory report detail: [DELETE] /report/inventory/{inventory_id}/details/{book_id}

See the API documentation for more details [here](https://documenter.getpostman.com/view/24674805/2s93si1prs#96b01024-447a-4b23-8ca1-a9617caa0a3a).
