# Deployment Guide

This guide helps you deploy Sure Media to production.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Hosting platform account (Vercel, Railway, Render, or similar)

## Environment Variables

Before deploying, create a `.env.production` file with these variables:

```env
BACKEND_PORT=4000
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-secure-jwt-secret-here"
NODE_ENV=production
NEXT_PUBLIC_API_URL="https://your-api-domain.com/api"
```

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. **Push to GitHub**
```bash
git remote add origin https://github.com/yourusername/chittorgarh-clone.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy

3. **Configure Backend**
   - Deploy backend to Railway, Render, or Heroku separately
   - Update `NEXT_PUBLIC_API_URL` in Vercel environment variables

### Option 2: Railway

1. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Select "Deploy from GitHub"

2. **Set Environment Variables**
   - Add all variables from `.env.production`
   - Configure PostgreSQL or MongoDB

3. **Deploy**
   - Railway auto-deploys on git push

### Option 3: Render

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" > "Web Service"
   - Select your GitHub repository

2. **Configure Service**
   - Set Build Command: `npm run install:all && npm run build --prefix frontend && npm run db:push --prefix backend`
   - Set Start Command: `npm run dev`
   - Add environment variables

3. **Deploy**
   - Render auto-deploys on git push

### Option 4: Docker (Any Platform)

1. **Create Dockerfile**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm run install:all
COPY . .
RUN npm run build --prefix frontend
RUN npm run db:push --prefix backend
EXPOSE 4000 3000
CMD ["npm", "run", "dev"]
```

2. **Build and Push Image**
```bash
docker build -t chittorgarh-clone:latest .
docker tag chittorgarh-clone:latest your-registry/chittorgarh-clone:latest
docker push your-registry/chittorgarh-clone:latest
```

3. **Deploy to Cloud Run, ECS, or Kubernetes**

## Database Setup

### For Production

1. **Use PostgreSQL or MongoDB** instead of SQLite
2. **Update DATABASE_URL** in environment variables
3. **Run migrations**
```bash
npm run db:push --prefix backend
npm run db:seed --prefix backend
```

### Sample Railway PostgreSQL Connection

```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

## Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS only (enforce in headers)
- [ ] Set secure CORS origin in backend
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable database backups
- [ ] Set up monitoring and error tracking
- [ ] Configure rate limiting
- [ ] Use strong admin password

## Post-Deployment

1. **Test in Production**
```bash
curl https://your-domain.com/api/ipos
```

2. **Monitor Logs**
   - Check deployment logs for errors
   - Monitor application performance

3. **Update DNS** (if needed)
   - Point your domain to the deployment

## Troubleshooting

### Build Fails
- Check `npm run build --prefix frontend` locally
- Verify all environment variables are set
- Check Node.js version compatibility (use 18+)

### API Not Working
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Confirm backend is running and accessible

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check network access to database
- Ensure database credentials are correct

## Local Testing Before Deployment

```bash
# 1. Install dependencies
npm run install:all

# 2. Set up database
npm run db:push --prefix backend
npm run db:seed --prefix backend

# 3. Build for production
npm run build --prefix frontend

# 4. Test production build
NODE_ENV=production npm run dev
```

## Support

For issues or questions:
- Check GitHub Issues
- Review logs in your hosting platform dashboard
- Verify environment variables match your setup
