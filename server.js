const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.json());

// Temporary array to hold books
let books = [
  { id: 1, title: "1984", author: "George Orwell", year: 1949 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
];

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views"); // Views directory for EJS files

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// GET renders the books list on the home page
app.get("/", (req, res) => {
  res.render("index", { books: books }); // Pass books array to the view
});

// POST route to add a new book
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

// PUT - Update a book by ID
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

// DELETE - Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(bookIndex, 1);
  res.status(204).send(); // No content, successful deletion
});

// GET route to display details of a single book
app.get("/books/:id", (req, res) => {
  const { id } = req.params; // Get the book ID from the URL
  const book = books.find((b) => b.id === parseInt(id)); // Find the book by ID

  if (!book) {
    return res.status(404).send("Book not found");
  }

  // Render the book details page using the 'bookDetails' EJS template
  res.render("bookDetails", { book: book });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.message); // Log the error message
  res.status(500).json({ error: err.message }); // Send 500 status error
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
