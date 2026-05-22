const table        = document.getElementById("booksTable");
const formContainer = document.getElementById("formContainer");
const showFormBtn  = document.getElementById("showFormBtn");
const formTitle    = document.getElementById("formTitle");
const submitBtn    = document.getElementById("submitBtn");

let editingId = null;

// HELPERS

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


// SHOW / HIDE FORM

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

// GET BOOKS

async function getBooks() {
  try {
    const response = await fetch("http://localhost:3000/books");
    if (!response.ok) throw new Error("Erreur serveur : " + response.status);
    const books = await response.json();
    displayBooks(books);
  } catch (err) {
    showTableError("Impossible de charger les livres. Vérifiez que le serveur est lancé.");
  }
}// DISPLAY BOOKS

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
