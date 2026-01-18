# 📚 Library Management System

A full-stack **Library Management System** built with a scalable backend and a modern React + TypeScript frontend.  
The application supports real-time inventory updates, transactional integrity, and clean separation of concerns.

---

## ✨ Key Highlights

- Full issue/return workflow with transactional consistency
- **Real-time book availability updates using WebSockets**
- Soft-delete strategy for safe member deactivation
- RESTful API design with service-layer architecture
- Strong typing and reusable UI components

---

## 🚀 Core Features

### 📖 Book & Inventory Management
- Add, update, and remove books
- Track total and available copies
- Prevent issuing when no copies are available
- Live UI updates on inventory changes

### 👤 Member Management
- Register and manage members
- Soft delete using `deleted_at` to preserve historical data

### 🔄 Issue & Return Workflow
- Issue books with due dates
- Return books with automatic inventory restoration
- Fine calculation logic for overdue returns

### ⚡ Real-Time Communication
- WebSockets broadcast inventory changes instantly
- All connected clients stay in sync during issue/return operations

---

## 🛠 Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **PostgreSQL**
- REST APIs
- WebSockets for real-time events

### Frontend
- **React**
- **TypeScript**
- Component-driven architecture
- Reusable layouts and tables

---

## 🗂 Project Structure

### Backend
```

BE/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── services/
│   ├── sql/
│   ├── app.js
│   └── index.js

```

### Frontend
```

FE/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Button/
│   │   ├── pages/
│   │   ├── layout.tsx
│   │   ├── adminLayout.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── booktable.tsx
│   │   └── membertable.tsx
│   ├── App.tsx
│   └── main.tsx

```

---

## 🧠 Engineering Focus

- Clear separation of routing, business logic, and data access
- Server-driven state updates via WebSockets
- Database-level consistency for issue/return operations
- Scalable foundation for role-based access and analytics

---

## 🔮 Planned Enhancements

- Authentication & role-based access control
- PDF receipt generation
- Advanced search and filtering
- Administrative analytics dashboard

---

## 📄 License

This project is built for learning, experimentation, and portfolio demonstration.

