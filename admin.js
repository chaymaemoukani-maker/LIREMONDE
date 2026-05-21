const table = document.getElementById("booksTable");

const formContainer = document.getElementById("formContainer");

const showFormBtn = document.getElementById("showFormBtn");


// ======================
// SHOW / HIDE FORM
// ======================

showFormBtn.addEventListener("click", () => {

  formContainer.classList.toggle("hidden");

});


// ======================
// GET BOOKS
// ======================

async function getBooks() {

  const response = await fetch("http://localhost:3000/books");

  const books = await response.json();

  displayBooks(books);

}


// ======================
// DISPLAY BOOKS
// ======================

function displayBooks(books) {

  table.innerHTML = "";

  books.forEach(book => {

    table.innerHTML += `

      <tr>

        <td>${book.id}</td>

        <td>
          <img src="${book.couverture}">
        </td>

        <td>${book.titre}</td>
        

        <td>${book.auteur}</td>

        <td>${book.genre}</td>

        <td>

          <button onclick="deleteBook(${book.id})">
            Supprimer
          </button>

        </td>

      </tr>

    `;
  });

}


// ======================
// ADD BOOK
// ======================

async function addBook() {

  const titre = document.getElementById("titre").value;

  const auteur = document.getElementById("auteur").value;

  const genre = document.getElementById("genre").value;

  const description = document.getElementById("description").value;

  const couverture = document.getElementById("couverture").value;

  const newBook = {

    titre,
    auteur,
    genre,
    description,
    couverture,
    aLire:false

  };

  await fetch("http://localhost:3000/books", {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify(newBook)

  });

  getBooks();

}


// ======================
// DELETE BOOK
// ======================

async function deleteBook(id) {

  await fetch(`http://localhost:3000/books/${id}`, {

    method:"DELETE"

  });

  getBooks();

}


// ======================
// START
// ======================

getBooks();