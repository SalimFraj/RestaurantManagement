# 🚀 Deployment Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)
- Groq API key
- (Optional) Cloudinary account for image uploads
- (Optional) Docker and Docker Compose

## Quick Start with Docker (Recommended)

### 1. Clone and Configure

```bash
# Navigate to project directory
cd "d:/College/Software_D/3 Term/Web Programming/final project/final project"

# Copy environment file
cp .env.docker.example .env

# Edit .env with your actual values
# - Set a strong JWT_SECRET
# - Add your GROQ_API_KEY
# - (Optional) Add CLOUDINARY_URL
```

### 2. Build and Run

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/v1/health

### 4. Seed the Database

```bash
# Run seed script inside backend container
docker-compose exec backend npm run seed
```

**Default Admin Credentials:**
- Email: `admin@smartrestaurant.com`
- Password: `admin123`

---

## Manual Deployment (Without Docker)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp env.example .env

# Edit .env with your configuration
# Ensure MongoDB is running locally or use MongoDB Atlas

# Create logs directory
mkdir logs

# Seed database
npm run seed

# Start development server
npm run dev

# Or start production server
npm start
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file (if needed)
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/smart-restaurant

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# AI Integration
GROQ_API_KEY=your-groq-api-key-from-console-groq-com

# Image Upload (optional)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## Production Deployment

### Option 1: Deploy to Cloud Platforms

#### Frontend (Vercel/Netlify)

**Vercel:**
```bash
cd frontend
npm install -g vercel
vercel
```

**Netlify:**
```bash
cd frontend
npm run build
# Upload dist/ folder to Netlify or use Netlify CLI
```

**Environment Variables:**
- `VITE_API_URL`: Your backend API URL

#### Backend (Railway/Render/Heroku)

**Railway:**
```bash
cd backend
# Connect your GitHub repo and deploy via Railway dashboard
```

**Render:**
```bash
# Create new Web Service on Render
# Connect repository and set build command: npm install
# Set start command: npm start
```

**Environment Variables:** Add all backend .env variables in the platform's settings

### Option 2: Deploy to VPS (DigitalOcean/AWS/Azure)

#### Using Docker Compose

```bash
# On your VPS
git clone <your-repo>
cd smart-restaurant-system

# Configure environment
cp .env.docker.example .env
nano .env  # Edit with your values

# Start services
docker-compose -f docker-compose.yml up -d

# Setup nginx reverse proxy (optional)
# Point domain to your VPS IP
```

#### Nginx Reverse Proxy Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

---

## Database Management

### Backup MongoDB

```bash
# Using Docker
docker-compose exec mongodb mongodump --out /backup

# Manual (local MongoDB)
mongodump --db smart-restaurant --out ./backup
```

### Restore MongoDB

```bash
# Using Docker
docker-compose exec mongodb mongorestore /backup

# Manual
mongorestore --db smart-restaurant ./backup/smart-restaurant
```

---

## Monitoring and Logs

### View Application Logs

```bash
# Docker
docker-compose logs -f backend
docker-compose logs -f frontend

# Manual
cd backend
tail -f logs/combined.log
tail -f logs/error.log
```

### Health Checks

```bash
# Backend health
curl http://localhost:5000/api/v1/health

# MongoDB connection
curl http://localhost:5000/api/v1/health | jq '.mongodb'
```

---

## Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
```bash
# Check MongoDB is running
docker-compose ps mongodb
# Or for local MongoDB
sudo systemctl status mongod
```

**2. Port Already in Use**
```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process or change PORT in .env
```

**3. CORS Errors**
- Ensure `FRONTEND_URL` in backend .env matches your frontend URL
- Check CORS configuration in `backend/src/server.js`

**4. WebSocket Connection Failed**
- Ensure Socket.IO is properly configured
- Check firewall settings allow WebSocket connections
- Verify reverse proxy supports WebSocket upgrade

**5. JWT Authentication Issues**
- Clear browser cookies
- Ensure `JWT_SECRET` is set and consistent
- Check token expiration settings

---

## Security Checklist

Before deploying to production:

- [ ] Change default `JWT_SECRET` to a strong random string
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS/SSL certificates
- [ ] Update CORS origins to production URLs only
- [ ] Set `NODE_ENV=production`
- [ ] Configure rate limiting appropriately
- [ ] Review and update security headers
- [ ] Implement database backup strategy
- [ ] Set up monitoring and error tracking
- [ ] Review and restrict database user permissions

---

## Performance Optimization

### Frontend
- Enable gzip compression (✓ configured in nginx.conf)
- Implement code splitting (✓ configured with Vite)
- Optimize images with CDN (Cloudinary)
- Enable service worker for PWA
- Use lazy loading for routes

### Backend
- Enable Redis caching for frequently accessed data
- Index database queries properly
- Implement API response caching
- Use compression middleware (✓ configured)
- Monitor and optimize slow queries

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (nginx, HAProxy)
- Deploy multiple backend instances
- Share sessions via Redis
- Use managed MongoDB cluster (MongoDB Atlas)

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Optimize database indexes
- Implement caching strategies
- Use CDN for static assets

---

## Support

For issues and questions:
1. Check logs for error messages
2. Review environment configuration
3. Consult API documentation at `/api/v1`
4. Check health endpoint for service status
