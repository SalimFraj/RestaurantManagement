# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm run install:all
```

### Step 2: Set Up Environment
1. Copy `backend/env.example` to `backend/.env`
2. Fill in your credentials:
   - `MONGODB_URI` - Your MongoDB connection string
   - `GROQ_API_KEY` - Get from https://console.groq.com/
   - `JWT_SECRET` - Any random string (keep it secret!)

### Step 3: Seed Database
```bash
cd backend
npm run seed
```

This creates:
- Admin user: `admin@smartrestaurant.com` / `admin123`
- 20+ sample menu items

### Step 4: Start Servers
From root directory:
```bash
npm run dev
```

Or separately:
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

### Step 5: Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Step 6: Login
- **Admin:** admin@smartrestaurant.com / admin123
- **Customer:** Register a new account or use admin credentials

## ✅ You're Ready!

The application is now running with:
- ✅ Full menu with 20+ items
- ✅ Admin dashboard
- ✅ AI chatbot
- ✅ All features enabled

## 🐛 Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB is running: `mongod` or use MongoDB Atlas

**Groq API errors?**
- Verify your API key is correct
- Check your API quota at https://console.groq.com/

**Port already in use?**
- Change ports in `.env` (backend) and `vite.config.js` (frontend)

