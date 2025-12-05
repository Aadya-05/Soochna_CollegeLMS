# College Management Web Application

Complete full-stack CRUD web application with dedicated dashboards for Faculty, Admin, and Students. Built with **Node.js + Express**, **PostgreSQL**, **JWT authentication**, and a **Vite + React + Tailwind** frontend.

HOSTED ON: https://soochna.onrender.com/

## Project Structure

```
college-chatbot/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── db.js
│   ├── schema.sql
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── env.example
```

## Getting Started

1. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**

   Copy `env.example` to `.env` (inside `backend/` or project root) and fill in your Postgres credentials and JWT secret.

3. **Prepare the database**

   ```bash
   psql "<your connection string>" -f schema.sql
   ```

4. **Run the backend**

   ```bash
   npm run dev
   # or
   npm start
   ```

5. **Install & run the frontend**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

   The frontend connects to `http://localhost:5000/api` by default. Update `API_BASE_URL` in `src/services/api.js` if needed.

## Features

- Secure signup/login with bcrypt + JWT
- Role-based access control (faculty/admin routes guarded)
- Faculty dashboard: Events, Attendance, Marks, ABA
- Admin dashboard: Fees, Staff, Circulars
- Student dashboard: event & circular feed
- Vite + React SPA with Tailwind styling and React Router
- Fully documented Postgres schema for all required tables

## Testing Suggestions

- Create sample users for each role using the signup form.
- Verify login flows redirect to their respective dashboards.
- Use browser dev tools to monitor API calls/responses.
- Inspect PostgreSQL tables to confirm CRUD operations.

