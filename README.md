# 📚 LireMonde

A book management web app — browse a catalogue, mark books to read, and manage the collection through an admin dashboard.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the local API server
npm start
```

The API will run at **http://localhost:3000**

### Open the App

Open `index.html` in your browser. That's it — no build step needed.

---

## 📁 Project Structure

```
liremonde/
├── index.html       # Main page — catalogue + reading list
├── style.css        # Shared styles
├── script.js        # Main page logic
├── admin.html       # Admin dashboard
├── admin.css        # Admin-specific styles
├── admin.js         # Admin logic (CRUD)
├── db.json          # Books database (json-server)
├── package.json     # Dependencies & start script
└── image/           # Book cover images
    ├── book01.jpg
    ├── book02.jpg
    └── ...
```

---

## ✨ Features

### Main Page (`index.html`)
- 4-column grid of book covers with hover overlay
- Filter books by genre (Classique, Science-fiction, Drame, Fantasy, Mystery)
- Live search by title or author
- Book detail modal with cover, description, author, and genre
- Add a book to your personal reading list ❤️
- Remove books from the reading list
- Hash-based navigation (`#alire`) for the reading list section

### Admin Page (`admin.html`)
- Table view of all books with cover thumbnails
- Add a new book via a form (title, author, genre dropdown, description, cover URL)
- Edit any existing book — form pre-fills automatically
- Delete a book with a confirmation prompt
- Form validates required fields before submitting

---

## 🛠 Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | HTML, CSS, Vanilla JavaScript     |
| API      | [json-server](https://github.com/typicode/json-server) |
| Database | `db.json` (local flat-file)       |
| Icons    | Font Awesome 6 (CDN)              |

---

## 🔌 API Endpoints

All requests go to `http://localhost:3000`

| Method   | Endpoint        | Description          |
|----------|-----------------|----------------------|
| `GET`    | `/books`        | Get all books        |
| `POST`   | `/books`        | Add a new book       |
| `PUT`    | `/books/:id`    | Update a book        |
| `DELETE` | `/books/:id`    | Delete a book        |

---

## 📖 Book Object

```json
{
  "id": "1",
  "titre": "The Bungalow Mystery",
  "auteur": "Carolyn Keene",
  "genre": "Mystery",
  "description": "A classic mystery story...",
  "couverture": "image/book01.jpg",
  "aLire": false
}
```

`aLire: true` means the book has been added to the reading list.

---

## ⚠️ Known Limitations

- The app requires `json-server` to be running locally — it does not work offline or without `npm start`.
- Book cover images must be placed in the `/image/` folder. External URLs also work.
- The admin page has no authentication — anyone with the URL can access it.

---

## 🔮 What's Next

- [ ] Responsive design for mobile (media queries)
- [ ] Password protection on the admin page
- [ ] Deploy online (Vercel + cloud database)

---

## 📄 License

This project is for educational purposes.

---

*© 2026 LireMonde*