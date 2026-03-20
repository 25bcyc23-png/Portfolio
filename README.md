# 🌐 Personal Portfolio Website

A full-stack personal portfolio website built with HTML, CSS, JavaScript, Node.js, and MySQL — featuring sections for Home, About, Projects, and Contact.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL

---

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
|__.gitignore
└── README.md
```

---

## 📄 Pages & Sections

- **Home** – Introduction and hero section
- **About** – Background, skills, and experience
- **Projects** – Showcase of work and personal projects
- **Contact** – Contact form with MySQL-backed message storage

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MySQL](https://www.mysql.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the database**

   Create a MySQL database and run the following:
   ```sql
   CREATE DATABASE portfolio_db;

   USE portfolio_db;

   CREATE TABLE contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100),
     message TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Configure environment variables**

   Edit the `.env` file inside the `backend/` folder:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=portfolio_db
   PORT=3000
   ```

5. **Start the backend server**
   ```bash
   node server.js
   ```

6. **Open the frontend**

   Open `frontend/index.html` in your browser, or serve it via the Node.js server at:
   ```
   http://localhost:3000
   ```

---

## 🚀 Features

- Responsive design for all screen sizes
- Smooth scrolling single-page navigation
- Dynamic project showcase
- Contact form with backend validation and MySQL storage

---

## 📬 Contact

Feel free to reach out via the contact form on the website or connect on [LinkedIn](https://linkedin.com/in/your-profile).

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
