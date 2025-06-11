# Property Listings Backend API
## 📦 Live Link
-
## ✅ Features

- **User Authentication** (JWT)
- **CRUD for Property Listings** (with ownership restrictions)
- **Advanced Filtering** with over 10+ attributes
- **Redis Caching** for optimized performance
- **Favorites System** (Add/Remove/List)
- **Property Recommendations** to users
- **CSV Import** for bulk property uploads
- **Deployment-ready** (Render)

## 🏗️ Tech Stack

- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB + Mongoose
- **Cache:** Redis
- **Authentication:** JWT
- **Deployment:** Render


## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ayushman2694/property-management.git
cd property-listings-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your Secret>
REDIS_URL=redis://localhost:6379
```

### 4️⃣ Import CSV Data (Optional)

```bash
npx ts-node src/utils/importData.ts /path/to/file.csv
```

### 5️⃣ Start Development Server

```bash
npm run dev
```



## 🗂️ API Reference

### 🔐 Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login existing user |

### 🏠 Property Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/properties/` | Create Property *(Auth required)* |
| GET | `/api/properties/` | Get All Properties *(Cached)* |
| GET | `/api/properties/search?...` | Advanced Filtering by query params |
| PUT | `/api/properties/:id` | Update Property *(Only Owner)* |
| DELETE | `/api/properties/:id` | Delete Property *(Only Owner)* |

### ⭐ Favorites Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/favorites/:id` | Add to Favorites *(Auth)* |
| GET | `/api/favorites/` | List Favorites *(Auth)* |
| DELETE | `/api/favorites/:id` | Remove from Favorites *(Auth)* |

### 📩 Recommendations Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recommendations/:id` | Recommend Property to user *(Auth)* |
| GET | `/api/recommendations/` | Get Received Recommendations *(Auth)* |


