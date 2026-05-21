let currentBook = null;
const booksContainer = document.getElementById("booksContainer");

async function getBooks() {

  const response = await fetch("http://localhost:3000/books");

  const books = await response.json();

 const availableBooks = books.filter(book => book.aLire === false);

displayBooks(availableBooks);
}

function displayBooks(books) {

  booksContainer.innerHTML = "";

  books.forEach(book => {

    booksContainer.innerHTML += `

      <div class="card">

        <div class="img-container">

          <img src="${book.couverture}" alt="${book.titre}">

          <div class="overlay">

            <h3>${book.titre}</h3>

            <button class="read-btn" data-id="${book.id}">
              Lire
            </button>

          </div>

        </div>

      </div>

    `;
  });

  