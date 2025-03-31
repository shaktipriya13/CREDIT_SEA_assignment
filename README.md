# 🚀 Loan Manager - Role-Based Authentication System

## 📌 Overview

This project implements a **Role-Based Login System** for a **Loan Manager Application** , built using **TypeScript, Node.js, Express, and JWT Authentication** . It supports two user roles:

- **Verifier** : Can verify or reject loan applications.
- **Admin** : Can approve/reject applications and manage other admin users.

The system is fully integrated with a dashboard, displaying real-time statistics and ensuring secure authentication and authorization.

---

## 🏗️ Tech Stack

- **Backend** : Node.js, TypeScript, Express, JWT, bcrypt, MongoDB Atlas
- **Frontend** : React.js
- **Authentication** : JSON Web Tokens (JWT)
- **Hosting** : Vercel

---

## 🔑 Features

✅ **User Authentication** - Secure login system with password hashing and JWT-based authentication.
✅ **Role-Based Authorization** - Verifiers and Admins have different permissions.
✅ **Loan Application Management** - Users can verify, approve, and reject applications.
✅ **Dashboard Integration** - Displays real-time statistics on pending, verified, and rejected applications.
✅ **Admin Privileges** - Admins can add or remove other admins.
✅ **Secure API Endpoints** - Middleware ensures access control based on user roles.
✅ **Deployment-Ready** - Easily deployable on Heroku, AWS, or Vercel.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
 git clone https://github.com/shaktipriya13/CREDIT_SEA_assignment.git
 cd CREDITSEA-TASK
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Add required environment variables
npm run dev
```

### 3️⃣ Frontend Setup

```env
cd frontend
npm install
cp .env.example .env  # Add NEXT_PUBLIC_API_URL
npm run dev
```

### 4️⃣ Run the Server

```bash
 npm run dev
```

Server will run at `http://localhost:5000`

---

## 🔄 API Endpoints

### 🔹 Authentication

| Method | Endpoint          | Role | Description             |
| ------ | ----------------- | ---- | ----------------------- |
| POST   | `/api/auth/login` | Any  | User login              |
| GET    | `/api/auth/me`    | Any  | Get logged-in user data |

### 🔹 Loan Application Management

| Method | Endpoint                        | Role     | Description               |
| ------ | ------------------------------- | -------- | ------------------------- |
| GET    | `/api/applications`             | Any      | Get all applications      |
| PATCH  | `/api/applications/:id/verify`  | Verifier | Verify/Reject application |
| PATCH  | `/api/applications/:id/approve` | Admin    | Approve application       |

### 🔹 Admin Management

| Method | Endpoint         | Role  | Description     |
| ------ | ---------------- | ----- | --------------- |
| POST   | `/api/admin/add` | Admin | Add new admin   |
| DELETE | `/api/admin/:id` | Admin | Remove an admin |

---

## 🎥 Demo Video

📌 **[Watch Here](https://chatgpt.com/c/your-video-link.com)**

## 🌐 Live Project

🚀 **[Visit Live App](https://chatgpt.com/c/your-live-link.com)**

---

## 🤝 Contribution

Want to contribute? Follow these steps:

1. Fork the repository 🍴
2. Create a new branch (`feature/your-feature`) 🌱
3. Commit changes (`git commit -m 'Add feature'`) 🔥
4. Push to the branch (`git push origin feature/your-feature`) 🚀
5. Create a pull request 📌

---

## 📞 Contact

For any issues or suggestions, feel free to reach out:
📧 Email: shaktipriya34@gmail.com

---

💡 _Made with ❤️ by Shakti Priya_
