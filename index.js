const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.json());

// Temporary array to hold books (as we are not using a database)
let books = [
  { id: 1, title: "1984", author: "George Orwell", year: 1949 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
];

// GET /books - Fetch all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST /books - Add a new book
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ message: "Title, author, and year are required" });
  }
  const newBook = {
    id: books.length + 1,
    title,
    author,
    year,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT  Update a book by ID
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title || book.title;
  book.author = author || book.author;
  book.year = year || book.year;

  res.json(book);
});

// DELETE Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(bookIndex, 1);
  res.status(204).send(); // No content, successful deletion
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
