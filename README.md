<div align="center">
  
# 🎓 Skillora 
**A Next-Generation Full-Stack E-Learning Platform**

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[About The Project](#-about-the-project) • [Key Features](#-key-features) • [Folder Structure](#-folder-structure) • [API Reference](#-api-reference) • [Quick Start](#-quick-start)

</div>

---

## 📖 About The Project

**Skillora** is a comprehensive, production-ready e-learning platform designed to bridge the gap between eager learners and premium educational content. Inspired by platforms like Coursera and Udemy, Skillora provides a seamless, immersive environment where users can discover courses, manage their personalized learning paths, and prepare for career advancement.

### The Problem It Solves
Traditional learning platforms often suffer from bloated interfaces, slow load times, and convoluted checkout processes. Skillora tackles this by utilizing the **Next.js App Router** for lightning-fast frontend delivery and an **Express/MongoDB** backend tailored for efficient data retrieval. The result is a snappy, accessible, and user-centric learning hub.

---

## ✨ Key Features

- 🔐 **Stateless Authentication**: Fully secure JWT (JSON Web Token) authentication flow, complete with password hashing via `bcryptjs`.
- 📚 **Dynamic Course Catalog**: Browse a rich, database-driven catalog of courses. Data is structured to support categories, dynamic pricing, and ratings.
- 🔖 **Personalized Learner Profiles**: Users can bookmark courses for later or add them to their shopping cart. This data is securely persisted in MongoDB, meaning users can access their cart across multiple devices.
- 🌓 **Adaptive Theming**: A beautifully crafted UI featuring responsive design principles and native Light/Dark mode toggling.
- 🏗️ **Clean Monorepo Architecture**: A strict separation of concerns between the React Client and the Node.js API, making the codebase highly scalable and easy to maintain.

---

## 📂 Folder Structure

The project follows a standard monorepo pattern, physically separating the client side from the server logic:

```text
skillora/
├── backend/                      # Node.js + Express API
│   ├── middleware/               # Express middlewares (e.g., JWT Auth validation)
│   ├── models/                   # Mongoose Database Schemas (User.js, Course.js)
│   ├── routes/                   # API Endpoints (auth.js, courses.js, user.js)
│   ├── index.js                  # Main Express Server Entry Point
│   ├── seed.js                   # Script to populate MongoDB with initial course data
│   └── package.json              # Backend Dependencies
│
├── frontend/                     # Next.js Application (React 19)
│   ├── src/
│   │   ├── app/                  # Next.js App Router Pages
│   │   │   ├── about/            # About Page
│   │   │   ├── auth/             # Sign In / Sign Up Pages
│   │   │   ├── bookmarks/        # User's Bookmarked Courses
│   │   │   ├── Cart/             # User's Shopping Cart
│   │   │   ├── components/       # Reusable React UI Components (Header, CourseCard, etc.)
│   │   │   ├── courses/          # Course Discovery & Filtering
│   │   │   ├── globals.css       # Global CSS Variables & Tailwind Directives
│   │   │   ├── layout.js         # Root HTML Layout
│   │   │   └── page.js           # Landing Page
│   │   └── lib/                  # Utility functions (e.g., configured Axios instance)
│   ├── public/                   # Static assets (Images, Icons)
│   ├── tailwind.config.js        # Tailwind CSS Configuration
│   └── next.config.mjs           # Next.js Compiler Config
│
├── .gitignore                    # Root Git Ignore
└── README.md                     # Project Documentation
```

---

## 🔌 API Reference

The backend exposes a RESTful API running on `http://localhost:5000`.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Create a new user account | ❌ |
| `POST` | `/api/auth/login` | Authenticate user and receive JWT | ❌ |
| `GET` | `/api/auth/me` | Get the currently logged-in user's info | ✅ |
| `GET` | `/api/courses` | Fetch all courses (supports search/filter query params) | ❌ |
| `GET` | `/api/courses/:id` | Fetch a single course by its MongoDB ID | ❌ |
| `GET` | `/api/user/profile` | Get the user's full profile with populated cart & bookmarks | ✅ |
| `PUT` | `/api/user/bookmarks` | Toggle a course bookmark (add/remove) | ✅ |
| `PUT` | `/api/user/cart` | Add or remove a course from the cart | ✅ |

---

## ⚡ Quick Start

Follow these steps to get Skillora running on your local machine.

### 1. Database Setup
You must have a MongoDB Atlas cluster URI ready.

### 2. Configure & Start the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/skillora
JWT_SECRET=supersecretjwtkey_skillora
```

**Seed the database** with sample courses, then start the server:
```bash
node seed.js
npm run dev
```
> The API will be available at `http://localhost:5000`

### 3. Start the Frontend Application

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```
> The application will be running at `http://localhost:3000`

<div align="center">
  <i>Built with passion using modern web technologies.</i>
</div>
