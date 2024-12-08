let categories = [
  { id: 1, name: "Dystopia" },
  { id: 2, name: "Classic" },
];

// Manages categories
const getCategories = () => categories;

const addCategory = (name) => {
  const newCategory = {
    id: categories.length + 1,
    name,
  };
  categories.push(newCategory);
  return newCategory;
};

module.exports = { getCategories, addCategory };
