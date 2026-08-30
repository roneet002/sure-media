import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/stats', authMiddleware, async (_req, res) => {
  const [ipos, brokers, ncds, reports, alerts] = await Promise.all([
    prisma.ipo.count(),
    prisma.broker.count(),
    prisma.ncd.count(),
    prisma.report.count(),
    prisma.alert.count(),
  ]);
  res.json({ ipos, brokers, ncds, reports, alerts });
});

export default router;
