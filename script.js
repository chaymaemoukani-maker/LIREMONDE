let currentBook = null;
let allBooks    = [];

const booksContainer = document.getElementById("booksContainer");
const aLireSection  = document.getElementById("alire");
const booksSection  = document.getElementById("booksContainer");
const categories    = document.querySelector(".categories");
const searchInput   = document.getElementById("search");


// ======================
// HELPERS
// ======================

function showError(msg) {
  console.error(msg);
  booksContainer.innerHTML = `
    <p style="color:red; padding:20px; grid-column:1/-1;">
      ⚠️ ${msg}
    </p>
  `;
}


// ======================
// GET & DISPLAY BOOKS
// ======================

async function getBooks() {
  try {
    const response = await fetch("http://localhost:3000/books");
    if (!response.ok) throw new Error("Erreur serveur : " + response.status);
    const books = await response.json();
    allBooks    = books.filter(b => b.aLire === false);
    displayBooks(allBooks);
  } catch (err) {
    showError("Impossible de charger les livres. Vérifiez que le serveur est lancé.");
  }
}

function displayBooks(books) {
  booksContainer.innerHTML = "";

  if (books.length === 0) {
    booksContainer.innerHTML = `
      <p style="color:var(--color-text-secondary, #888); padding:20px; grid-column:1/-1;">
        Aucun livre trouvé.
      </p>
    `;
    return;
  }

  books.forEach(book => {
    booksContainer.innerHTML += `
      <div class="card">
        <div class="img-container">
          <img src="${book.couverture}" alt="${book.titre}">
          <div class="overlay">
            <h3>${book.titre}</h3>
            <button class="read-btn" data-id="${book.id}">Lire</button>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelectorAll(".read-btn").forEach(button => {
    button.addEventListener("click", () => {
      const book = books.find(b => b.id == button.dataset.id);
      openModal(book);
    });
  });
}


// ======================
// MODAL
// ======================

function openModal(book) {
  currentBook = book;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modalImg").src            = book.couverture;
  document.getElementById("modalTitle").textContent  = book.titre;
  document.getElementById("modalAuthor").textContent = "By " + book.auteur;
  document.getElementById("modalGenre").textContent  = book.genre;
  document.getElementById("modalDesc").textContent   = book.description;
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}


// ======================
// CATEGORIES FILTER
// ======================

document.querySelectorAll(".categories button").forEach(button => {
  button.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:3000/books");
      if (!response.ok) throw new Error("Erreur serveur : " + response.status);
      const books    = await response.json();
      const available = books.filter(b => b.aLire === false);

      document.querySelectorAll(".categories button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      const category = button.textContent.trim();
      displayBooks(category === "Tous" ? available : available.filter(b => b.genre === category));
    } catch (err) {
      showError("Impossible de filtrer les livres.");
    }
  });
});


// ======================
// SEARCH
// ======================

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    displayBooks(allBooks);
    return;
  }

  const results = allBooks.filter(b =>
    b.titre.toLowerCase().includes(query) ||
    b.auteur.toLowerCase().includes(query)
  );

  displayBooks(results);
});


// ======================
// ADD TO READ
// ======================

async function addToRead() {
  if (!currentBook) return;

  try {
    const res = await fetch(`http://localhost:3000/books/${currentBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...currentBook, aLire: true })
    });
    if (!res.ok) throw new Error("Erreur serveur : " + res.status);

    closeModal();
    getBooks();
    displayALire();
  } catch (err) {
    alert("Impossible d'ajouter le livre à la liste. Réessayez.");
  }
}

