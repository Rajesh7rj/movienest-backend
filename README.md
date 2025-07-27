# 🎬 MovieNest Backend – A Movie Management API

This is a full-featured backend API built using **NestJS + TypeORM + SQLite**, designed to manage a movie database. It supports movie creation, updates with image upload, deletion, and pagination — and is deployable to platforms like **Render** for free.

---

## 🚀 Features

- 🎥 Create movies with title, publishing year, and image upload
- ✏️ Update movies with new details and image
- ❌ Delete movies by ID
- 🔍 Get a movie by ID
- 📄 Paginated list of all movies
- 📦 File upload using Multer
- 🔌 Ready for deployment on Render

---

## 📦 Tech Stack

- [NestJS](https://nestjs.com/) – Node.js framework
- [TypeORM](https://typeorm.io/) – ORM for database
- [SQLite](https://www.sqlite.org/index.html) – Lightweight database
- [Multer](https://github.com/expressjs/multer) – For image/file upload
- [Render](https://render.com/) – Free deployment

---

## 🛠️ Running Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run start:dev
```
App runs at: http://localhost:3000

---

🌍 API Endpoints
| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| POST   | `/movies/create_movie`     | Create a new movie       |
| PUT    | `/movies/update-movie/:id` | Update an existing movie |
| DELETE | `/movies/delete-movie/:id` | Delete a movie by ID     |
| GET    | `/movies/get-movie-by-id/:id`              | Get a movie by ID        |
| GET    | `/movies/get-movies?page=1&limit=10`  | Get paginated movie list |


🧾 License
MIT License. Free for personal or commercial use.
