# Railway Deployment Guide

## Step 1: Railway Account Setup

1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway to access your GitHub

---

## Step 2: Connect Your Repository

1. Open https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Select your repository: `roneet002/sure-media`
5. Click **"Deploy"**

Railway will automatically detect and start building!

---

## Step 3: Configure Environment Variables

After Railway starts building:

1. Go to your project dashboard
2. Click on the **deployment** (or service)
3. Go to **"Variables"** tab
4. Add these variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/sure_media
JWT_SECRET=your-super-secret-jwt-key-change-this-production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-railway-domain.up.railway.app/api
```

Or Railway can auto-generate PostgreSQL for you:
1. In project dashboard, click **"New"** 
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will auto-add `DATABASE_URL` variable

---

## Step 4: Database Setup

Railway will auto-create PostgreSQL. Just need to:

1. Go to **PostgreSQL plugin** in Railway
2. Copy the **Database URL**
3. Railway automatically adds it to environment variables
4. Database will be initialized on first deploy

---

## Step 5: Deploy Commands

Once configured, Railway will:

1. **Build:** `npm run install:all && npm run build --prefix frontend && npm run db:push --prefix backend`
2. **Start:** `npm run dev`
3. **Auto-redeploy** on every GitHub push to main

---

## Step 6: Get Your Domain

After successful deployment:

1. Go to **Deployment** tab
2. Find your **Public URL** (looks like: `sure-media-production.up.railway.app`)
3. Update `NEXT_PUBLIC_API_URL` if needed

---

## Troubleshooting

### Build Fails
- Check Railway logs: Dashboard → Logs tab
- Verify environment variables are set
- Check Node.js version compatibility (18+)

### Database Connection Error
- Ensure DATABASE_URL is set
- PostgreSQL plugin is deployed
- Run `npm run db:push --prefix backend` manually if needed

### API Not Responding
- Check backend logs
- Verify `NEXT_PUBLIC_API_URL` matches your Railway domain
- Confirm `JWT_SECRET` is set

---

## Manual Deploy (Optional)

If you want to deploy manually using Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

---

## Post-Deployment

1. **Test the app:** Visit your Railway URL
2. **Test admin login:** Use `admin@chittorgarh.com` / `admin123`
3. **Check API:** Visit `/api/ipos`
4. **Monitor logs:** Dashboard → Logs tab

---

## Auto-Deployment

Every time you push to GitHub:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Railway will automatically build and deploy! 🚀

---

## Cost

- **Free tier:** Allows deployments with limited resources
- **Paid:** $5/month per service for production usage
- PostgreSQL: Included in free tier or separate billing

Check pricing: https://railway.app/pricing
