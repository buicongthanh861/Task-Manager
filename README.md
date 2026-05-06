# Task Manager — ReactJS + NodeJS + PostgreSQL

## Stack
- **Frontend**: React 18, Vite, Axios, React Router
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **Auth**: JWT + bcrypt
- **CI/CD**: GitHub Actions

---

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env    # điền thông tin DB + JWT
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint           | Auth | Description   |
|--------|--------------------|------|---------------|
| POST   | /api/auth/register | No   | Đăng ký       |
| POST   | /api/auth/login    | No   | Đăng nhập     |
| GET    | /api/auth/me       | Yes  | User hiện tại |
| GET    | /api/tasks         | Yes  | Danh sách task |
| POST   | /api/tasks         | Yes  | Tạo task      |
| PUT    | /api/tasks/:id     | Yes  | Sửa task      |
| DELETE | /api/tasks/:id     | Yes  | Xoá task      |
| GET    | /health            | No   | Health check  |

---

## Project Structure

```
taskmanager/
├── .github/workflows/ci-cd.yml
├── frontend/
│   ├── src/
│   │   ├── components/     # TaskCard, TaskModal
│   │   ├── pages/          # Login, Register, Dashboard
│   │   ├── hooks/          # useAuth
│   │   ├── services/       # api.js (Axios)
│   │   └── test/
│   ├── vite.config.js
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/    # authController, taskController
    │   ├── routes/         # auth.js, tasks.js
    │   ├── middleware/     # auth.js (JWT)
    │   └── db/             # models.js, config.js
    ├── __tests__/
    └── package.json
```
