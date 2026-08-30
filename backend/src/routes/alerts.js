import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const { date } = req.query;
  const where = {};
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    where.alertDate = { gte: start, lt: end };
  }

  const alerts = await prisma.alert.findMany({
    where,
    orderBy: { alertDate: 'desc' },
    take: 50,
  });
  res.json(alerts);
});

router.post('/', authMiddleware, async (req, res) => {
  const data = { ...req.body };
  if (data.alertDate) data.alertDate = new Date(data.alertDate);
  const alert = await prisma.alert.create({ data });
  res.status(201).json(alert);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.alert.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ success: true });
});

export default router;
