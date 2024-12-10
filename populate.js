const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose
  .connect("mongodb://localhost:27017/booktracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const seedBooks = async () => {
  const books = [
    { title: "1984", author: "George Orwell", year: 1949 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { title: "Moby Dick", author: "Herman Melville", year: 1851 },
    {
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      year: 1979,
    },
  ];

  await Book.deleteMany(); // Clear the collection
  await Book.insertMany(books); // Insert sample books
  console.log("Database seeded with sample books");
  mongoose.connection.close();
};

seedBooks();
