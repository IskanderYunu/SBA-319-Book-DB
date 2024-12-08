let authors = [
  { id: 1, name: "George Orwell", birthYear: 1903 },
  { id: 2, name: "Harper Lee", birthYear: 1926 },
];

// Manages authors
const getAuthors = () => authors;

const addAuthor = (name, birthYear) => {
  const newAuthor = {
    id: authors.length + 1,
    name,
    birthYear,
  };
  authors.push(newAuthor);
  return newAuthor;
};

module.exports = { getAuthors, addAuthor };
