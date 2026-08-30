# SURE Media - SQLite Deployment Guide

## Railway Deployment with SQLite

This guide covers deploying SURE Media to Railway using SQLite (no paid databases needed).

### Prerequisites

- GitHub account with `roneet002/sure-media` repository
- Railway account (free tier available at https://railway.app)
- No credit card required for free tier

---

## Deployment Steps

### Step 1: Connect Railway to GitHub

1. Go to https://railway.app
2. Click **"Login with GitHub"** (or create account)
3. Authorize Railway to access your GitHub

### Step 2: Create New Project

1. Dashboard → Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select repository: `roneet002/sure-media`
4. Click **"Deploy Now"**

Railway will automatically:
- ✅ Build the project
- ✅ Create SQLite database
- ✅ Run migrations
- ✅ Seed initial data
- ✅ Start the application

### Step 3: Configure Environment Variables

After deployment starts:

1. Go to **"Variables"** tab in Railway
2. Set these variables:

```env
DATABASE_URL=file:./data/prod.db
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-railway-domain.up.railway.app/api
```

Replace `your-railway-domain` with your actual Railway domain (shown in Deployments tab).

### Step 4: Wait for Deployment

Build takes ~5-10 minutes:
- Building dependencies ⏳
- Building frontend ⏳
- Running migrations ⏳
- Seeding database ⏳
- Starting server ✅

Check **Logs** tab to monitor progress.

### Step 5: Access Your App

1. Go to **Deployments** tab
2. Find **"Public URL"** (looks like: `sure-media-production.up.railway.app`)
3. Visit the URL - your app is live! 🎉

---

## Connect Netlify Frontend to Railway Backend

### Update Netlify Environment Variables

1. Go to Netlify dashboard → `sure-media` project
2. Site settings → **"Build & deploy"** → **"Environment"**
3. Add variable:

```
NEXT_PUBLIC_API_URL=https://your-railway-domain.up.railway.app/api
```

4. Click **Redeploy site**

Now your Netlify frontend will connect to Railway backend! ✅

---

## Admin Credentials

After deployment:

**Email:** `admin@chittorgarh.com`  
**Password:** `admin123`

Use these to login to the admin panel at `/admin`

---

## SQLite Database

- **Location:** `backend/data/prod.db`
- **Auto-created:** On first deploy
- **Auto-seeded:** With demo data
- **Backup:** Railway keeps deployment snapshots

To access database locally:
```bash
npm run db:studio --prefix backend
```

---

## Troubleshooting

### Build Fails

1. Check **Logs** tab for errors
2. Verify environment variables are set correctly
3. Common issues:
   - Missing `JWT_SECRET`
   - Wrong `NODE_ENV` (should be `production`)
   - Port conflicts

### App Not Starting

- Check backend logs: `npm run dev --prefix backend`
- Verify database file permissions
- Check API endpoint: `/api/ipos`

### Netlify Shows "Cannot Connect to API"

1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Make sure Railway URL matches (no typos)
3. Check CORS settings in backend

### Database Not Seeding

Run manually after deployment:
```bash
npm run db:push --prefix backend
npm run db:seed --prefix backend
```

---

## File Structure

```
sure-media/
├── backend/
│   ├── data/
│   │   └── prod.db          # SQLite database (auto-created)
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.js          # Seed data
│   └── src/
├── frontend/
│   └── src/
├── .railway.env             # Railway environment variables
├── railway.json             # Railway configuration
└── Procfile                 # Process file
```

---

## Cost

- **Free tier:** $5 credit/month (usually enough for demo)
- **Paid:** Only charged if usage exceeds free tier
- **SQLite:** No additional cost (file-based database)

Check usage at: https://railway.app/account/billing

---

## Auto-Deployment

Every time you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Railway automatically rebuilds and redeploys! 🚀

---

## Production Tips

1. **Change JWT_SECRET:** Use a strong random string
2. **Change admin password:** Update in admin panel
3. **Enable HTTPS:** Railway handles this automatically
4. **Monitor logs:** Check Railway logs for issues
5. **Backup database:** Download `prod.db` periodically

---

## Next Steps

After successful deployment:

1. ✅ Test all features on live app
2. ✅ Update homepage content
3. ✅ Add real data (integrate with NSE/BSE APIs)
4. ✅ Set up custom domain (if needed)
5. ✅ Configure email notifications (optional)

---

## Support

- Railway Docs: https://docs.railway.app
- Discord: https://railway.app/support
- Email: support@railway.app

---

**Happy Deploying! 🚀**
