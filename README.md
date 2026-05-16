# 🛒 ShopSmart - Inventory Management System

![ShopSmart](https://img.shields.io/badge/ShopSmart-Inventory%20System-dcb490?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

---

## 📌 Project Title
**ShopSmart** — A Smart Inventory Management System

---

## 📋 Problem Description
Small retail shops and supermarkets in Sri Lanka face a major challenge in managing their inventory efficiently. Most shop owners rely on manual paper-based systems or basic spreadsheets to track their stock levels, suppliers, and product categories. This leads to:

- Difficulty tracking when items are running low
- No clear visibility of supplier information
- Inability to search or filter products quickly
- Risk of overstocking or stockouts

---

## 💡 Proposed Solution
ShopSmart is a full-stack web-based inventory management system that allows shop managers to:

- Add, update, and delete products with ease
- Organize products into categories
- Manage supplier information
- Get instant low stock alerts
- Secure login using JWT Authentication
- View a real-time dashboard with key statistics

---

## ✨ Features
- 🔐 JWT Authentication (Secure Login)
- 📦 Product Management (CRUD)
- 🗂️ Category Management (CRUD)
- 🚚 Supplier Management (CRUD)
- ⚠️ Low Stock Alerts
- 🏠 Dashboard with Statistics
- 📞 Contact Page
- 🎨 Aesthetic Earthy UI Design
- 📱 Responsive Layout

---

## 🛠️ Technologies Used

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| dotenv | Environment Variables |
| cors | Cross-Origin Requests |
| nodemon | Development Server |

### Frontend
| Technology | Purpose |
|---|---|
| React.js | Frontend Framework |
| Vite | Build Tool |
| React Router DOM | Client-side Routing |
| Axios | HTTP Requests |

---

## 📁 Project Structure
shopsmart/
│
├── index.js
├── .env
├── package.json
├── createAdmin.js
│
├── models/
│   ├── product.js
│   ├── category.js
│   ├── supplier.js
│   └── user.js
│
├── controllers/
│   ├── product.js
│   ├── category.js
│   ├── supplier.js
│   └── auth.js
│
├── routes/
│   ├── product.js
│   ├── category.js
│   ├── supplier.js
│   └── auth.js
│
├── middleware/
│   └── auth.js
│
└── frontend/
└── src/
├── App.jsx
├── main.jsx
├── index.css
├── utils/
│   └── axios.js
├── components/
│   └── Sidebar.jsx
└── pages/
├── Welcome.jsx
├── Dashboard.jsx
├── Products.jsx
├── Categories.jsx
├── Suppliers.jsx
├── LowStock.jsx
└── Contact.jsx

---

## 🔌 API Endpoints

### 🔐 Auth Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /api/auth/login | Login user | No |
| GET | /api/auth/me | Get current user | Yes |

### 📦 Product Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /api/products | Get all products | Yes |
| GET | /api/products/:id | Get single product | Yes |
| GET | /api/products/low-stock | Get low stock products | Yes |
| POST | /api/products | Create product | Yes |
| PUT | /api/products/:id | Update product | Yes |
| DELETE | /api/products/:id | Delete product | Yes |

### 🗂️ Category Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /api/categories | Get all categories | Yes |
| POST | /api/categories | Create category | Yes |
| PUT | /api/categories/:id | Update category | Yes |
| DELETE | /api/categories/:id | Delete category | Yes |

### 🚚 Supplier Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /api/suppliers | Get all suppliers | Yes |
| POST | /api/suppliers | Create supplier | Yes |
| PUT | /api/suppliers/:id | Update supplier | Yes |
| DELETE | /api/suppliers/:id | Delete supplier | Yes |

---

## ⚙️ Setup Instructions

### Prerequisites
Make sure you have these installed:
- Node.js (v18 or above)
- MongoDB (running locally)
- Git

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/JThiagarajah/shopsmart.git
cd shopsmart
```

### 2️⃣ Install Backend Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root folder:
```env
PORT=8000
MONGODB_URL=mongodb://localhost:27017/shopsmart
JWT_SECRET=shopsmart_super_secret_key_2024
```

### 4️⃣ Create Admin User
```bash
node createAdmin.js
```
This creates the default admin account:
- 📧 Email: joshua@shopsmart.com
- 🔑 Password: admin123

### 5️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```

---

## 🚀 How to Run the Project

### Start Backend
```bash
cd shopsmart
npm run dev
```
Backend runs on: http://localhost:8000

### Start Frontend
```bash
cd shopsmart/frontend
npm run dev
```
Frontend runs on: http://localhost:5173

---

## 🔐 Default Login Credentials
| Field | Value |
|---|---|
| Email | joshua@shopsmart.com |
| Password | admin123 |

---

## 👨‍💻 Developer
| Field | Details |
|---|---|
| Name | Joshua |
| Registration No | 2022ICT85 |
| Module | Web Services and Technology (IT2234) |
| Level | 2nd Year IT |

---

## 📄 License
This project is developed as part of the ICA-03 assignment for the module **Web Services and Technology (IT2234)**.

© 2024 ShopSmart — Developed by Joshua (2022ICT85)