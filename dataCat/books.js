let books = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    category: "Dystopia",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    category: "Classic",
  },
];

// Manages books
const getBooks = () => books;

const addBook = (title, author, year, category) => {
  const newBook = {
    id: books.length + 1,
    title,
    author,
    year,
    category,
  };
  books.push(newBook);
  return newBook;
};

const updateBook = (id, title, author, year, category) => {
  const book = books.find((book) => book.id === id);
  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    book.year = year || book.year;
    book.category = category || book.category;
    return book;
  }
  return null;
};

const deleteBook = (id) => {
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getBooks, addBook, updateBook, deleteBook };
