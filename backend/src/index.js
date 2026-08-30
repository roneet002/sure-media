import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import ipoRoutes from './routes/ipos.js';
import brokerRoutes from './routes/brokers.js';
import { ncdRoutes, rightsRoutes, buybackRoutes } from './routes/market.js';
import reportRoutes from './routes/reports.js';
import alertRoutes from './routes/alerts.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Sure Media API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/ipos', ipoRoutes);
app.use('/api/brokers', brokerRoutes);
app.use('/api/ncds', ncdRoutes);
app.use('/api/rights-issues', rightsRoutes);
app.use('/api/buybacks', buybackRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
