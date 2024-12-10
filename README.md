Book Tracker Application

The Book Tracker allows users to manage a collection of books. The app provides an intuitive interface for viewing a list of books, adding new ones, and editing or deleting entries. The project uses MongoDB as the database, Express.js for server-side logic, and EJS for rendering dynamic views. This lightweight application is designed to demonstrate RESTful API principles, incorporating robust CRUD functionality and a seamless connection between the client and database.

API Routes and CRUD Operations
GET /books: Retrieve a list of all books in the database (Read).
GET /books/:id: Retrieve details of a specific book by its ID (Read).
POST /books: Add a new book to the collection by providing title, author, and year in the request body (Create).
PUT /books/:id: Update the details of an existing book by its ID with fields such as title, author, or year (Update).
DELETE /books/:id: Remove a book from the collection using its ID (Delete).

This application is a good foundations for building RESTful APIs, interact with MongoDB, and integrate EJS templates for rendering data.

Enjoy :)
