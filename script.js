let currentBook = null;
const booksContainer = document.getElementById("booksContainer");

async function getBooks() {

  const response = await fetch("http://localhost:3000/books");

  const books = await response.json();

 const availableBooks = books.filter(book => book.aLire === false);

displayBooks(availableBooks);
}

