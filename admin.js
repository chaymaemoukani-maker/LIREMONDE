const table        = document.getElementById("booksTable");
const formContainer = document.getElementById("formContainer");
const showFormBtn  = document.getElementById("showFormBtn");
const formTitle    = document.getElementById("formTitle");
const submitBtn    = document.getElementById("submitBtn");

let editingId = null;


// ======================
// HELPERS
// ======================

function showTableError(msg) {
  console.error(msg);
  table.innerHTML = `
    <tr>
      <td colspan="6" style="color:red; padding:20px; text-align:center;">
        ⚠️ ${msg}
      </td>
    </tr>
  `;
}


// ======================
// SHOW / HIDE FORM
// ======================

showFormBtn.addEventListener("click", () => {
  editingId = null;
  formTitle.textContent  = "Ajouter un nouveau livre";
  submitBtn.textContent  = "Ajouter";
  clearForm();
  formContainer.classList.remove("hidden");
});

function cancelForm() {
  editingId = null;
  formContainer.classList.add("hidden");
  clearForm();
}

function clearForm() {
  document.getElementById("titre").value       = "";
  document.getElementById("auteur").value      = "";
  document.getElementById("genre").value       = "";
  document.getElementById("description").value = "";
  document.getElementById("couverture").value  = "";
}


// ======================
// GET BOOKS
// ======================

async function getBooks() {
  try {
    const response = await fetch("http://localhost:3000/books");
    if (!response.ok) throw new Error("Erreur serveur : " + response.status);
    const books = await response.json();
    displayBooks(books);
  } catch (err) {
    showTableError("Impossible de charger les livres. Vérifiez que le serveur est lancé.");
  }
}


// ======================
// DISPLAY BOOKS
// ======================

function displayBooks(books) {
  table.innerHTML = "";

  if (books.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="6" style="padding:20px;text-align:center;color:#888;">
          Aucun livre enregistré.
        </td>
      </tr>
    `;
    return;
  }

  books.forEach(book => {
    table.innerHTML += `
      <tr>
        <td>${book.id}</td>
        <td><img src="${book.couverture}" alt="${book.titre}"></td>
        <td>${book.titre}</td>
        <td>${book.auteur}</td>
        <td>${book.genre}</td>
        <td>
          <div class="action-btns">
            <button class="btn-edit"   onclick="editBook('${book.id}')"   title="Modifier">✏️</button>
            <button class="btn-delete" onclick="deleteBook('${book.id}')" title="Supprimer">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  });
}


// ======================
// ADD OR UPDATE BOOK
// ======================

async function submitForm() {
  const titre       = document.getElementById("titre").value.trim();
  const auteur      = document.getElementById("auteur").value.trim();
  const genre       = document.getElementById("genre").value;
  const description = document.getElementById("description").value.trim();
  const couverture  = document.getElementById("couverture").value.trim();

  if (!titre || !auteur || !genre) {
    alert("Veuillez remplir au moins le titre, l'auteur et le genre.");
    return;
  }

  const bookData = { titre, auteur, genre, description, couverture, aLire: false };

  try {
    if (editingId !== null) {
      const res = await fetch(`http://localhost:3000/books/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bookData, id: editingId })
      });
      if (!res.ok) throw new Error("Erreur lors de la modification.");
      editingId = null;
    } else {
      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData)
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout.");
    }

    clearForm();
    formContainer.classList.add("hidden");
    getBooks();
  } catch (err) {
    alert("Une erreur est survenue : " + err.message);
  }
}


// ======================
// EDIT BOOK
// ======================

async function editBook(id) {
  try {
    const response = await fetch(`http://localhost:3000/books/${id}`);
    if (!response.ok) throw new Error("Livre introuvable.");
    const book = await response.json();

    document.getElementById("titre").value       = book.titre;
    document.getElementById("auteur").value      = book.auteur;
    document.getElementById("genre").value       = book.genre;
    document.getElementById("description").value = book.description;
    document.getElementById("couverture").value  = book.couverture;

    editingId             = id;
    formTitle.textContent = "Modifier le livre";
    submitBtn.textContent = "Enregistrer";
    formContainer.classList.remove("hidden");
    formContainer.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    alert("Impossible de charger ce livre : " + err.message);
  }
}


// ======================
// DELETE BOOK
// ======================

async function deleteBook(id) {
  if (!confirm("Supprimer ce livre ?")) return;

  try {
    const res = await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression.");
    getBooks();
  } catch (err) {
    alert("Impossible de supprimer ce livre : " + err.message);
  }
}


// ======================
// START
// ======================

getBooks();