//npm install mongoose!
//define schema!

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

// Middleware to parse incoming request bodies
app.use(express.json());

app.use(express.static("public"));

// Temporary array to hold books
let books = [
  { id: 1, title: "1984", author: "George Orwell", year: 1949 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
];

// Always EJS and view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

//Mongoose GET
const Book = require("./models/Book"); // Assuming you have a Mongoose model for books

app.get("/", async (req, res) => {
  try {
    const books = await Book.find(); // Retrieve all books from the MongoDB collection
    res.render("index", { books }); // Pass the books array to the view
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

//Mongoose POST
app.post("/books", async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ message: "Title, Author, and Year are required 🤓" });
  }
  try {
    const newBook = new Book({ title, author, year }); // Create a new Book document
    await newBook.save(); // Save the book to the MongoDB collection
    res.status(201).json(newBook); // Respond with the newly created book
  } catch (error) {
    res.status(500).json({ error: "Error adding book" });
  }
});

// PUT - Update a book by ID
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, year },
      { new: true } // Return the updated document
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the book" });
  }
});

// DELETE - Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id); // Replace with MongoDB model logic
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(204).send(); // No content, successful deletion
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book" });
  }
});

// GET route to display details of a single book - /books/id number
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
  console.error(err.message); // Logs error message
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
