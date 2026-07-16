# 🌾 Three Sisters Farm Management Information System (TSFarmMIS)

A modern Farm Management Information System (MIS) built to streamline farm operations, staff management, inventory, production, finance, and reporting.

---

## 📖 Project Overview

Three Sisters FarmMIS is designed to help farm managers digitize daily operations by providing a centralized platform for managing:

- Farm records
- Staff
- Crop production
- Inventory
- Harvests
- Sales
- Expenses
- Reports

The system is being developed using modern web technologies following a scalable backend architecture.

---

## 🚀 Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- REST API

### Frontend (Planned)

- React
- TypeScript
- Tailwind CSS
- Axios

---

## ✅ Completed Modules

### Authentication

- User Registration
- User Login
- Password Hashing
- JWT Authentication
- Role-Based Authorization

### User Management

- View All Users
- View Single User
- Create User
- Update User
- Activate/Deactivate User

---

## 🚧 Upcoming Modules

- Farm Management
- Field / Plot Management
- Crop Management
- Planting
- Harvest Management
- Inventory Management
- Expense Management
- Sales Management
- Dashboard
- Reports

---

## 📂 Backend Structure

```
backend/
│
├── prisma/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── service/
│   ├── validators/
│   ├── lib/
│   ├── utils/
│   ├── types/
│   ├── app.ts
│   └── server.ts
│
├── package.json
└── tsconfig.json
```

---

## 🔐 User Roles

- ADMIN
- MANAGER
- SUPERVISOR
- ACCOUNTANT

---

## ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Generate Prisma client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate dev
```

Start development server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Users

| Method | Endpoint |
|---------|----------|
| GET | /api/users |
| GET | /api/users/:id |
| POST | /api/users |
| PUT | /api/users/:id |
| PATCH | /api/users/:id/status |

---

## 📈 Project Status

Current Version:

**v1.0 - Authentication & User Management Completed**

---

## 👨‍💻 Developer

Gladwell Chepkorir

Built with ❤️ using TypeScript, Express, Prisma and PostgreSQL.
