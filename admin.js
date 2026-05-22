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
}