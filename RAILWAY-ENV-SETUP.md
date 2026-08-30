# Railway Setup - IMPORTANT

## After Railway Deployment, Set Environment Variables:

1. Go to Railway Dashboard: https://railway.app/dashboard
2. Select your `sure-media` project
3. Click on your deployment (service)
4. Go to **"Variables"** tab
5. Add these environment variables:

### Required Variables:

```env
DATABASE_URL=file:./data/prod.db
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-railway-domain.up.railway.app/api
BACKEND_PORT=4000
```

### Important Notes:

- **DATABASE_URL**: Must start with `file:./` for SQLite
- **JWT_SECRET**: Change to a random strong string
- **NODE_ENV**: Must be `production`
- **NEXT_PUBLIC_API_URL**: Replace with your actual Railway public URL

## Getting Your Railway URL:

1. Go to Deployments tab
2. Find "Public URL" (looks like: `sure-media-production.up.railway.app`)
3. Update `NEXT_PUBLIC_API_URL` with: `https://sure-media-production.up.railway.app/api`

## After Setting Variables:

1. Go back to **Deployments** tab
2. Click on latest deployment
3. Click **Redeploy** button
4. Wait for build (5-10 minutes)
5. App will be live! 🚀

## Troubleshooting:

### "DATABASE_URL not found" error
- Make sure DATABASE_URL is set in Variables tab
- Redeploy after adding variables

### Database not seeding
- Check logs for errors
- DATABASE_URL must be set before startup

### API not responding
- Verify NEXT_PUBLIC_API_URL matches your Railway domain
- Check backend logs for errors
