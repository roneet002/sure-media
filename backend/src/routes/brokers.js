import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

router.get('/', async (req, res) => {
  const { type, featured, popular, search } = req.query;
  const where = {};
  if (type) where.type = type;
  if (featured === 'true') where.featured = true;
  if (popular === 'true') where.popular = true;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const brokers = await prisma.broker.findMany({
    where,
    orderBy: { rating: 'desc' },
  });
  res.json(brokers);
});

router.get('/:slug', async (req, res) => {
  const broker = await prisma.broker.findUnique({ where: { slug: req.params.slug } });
  if (!broker) return res.status(404).json({ error: 'Broker not found' });
  res.json(broker);
});

router.post('/', authMiddleware, async (req, res) => {
  const data = { ...req.body, slug: req.body.slug || slugify(req.body.name) };
  const broker = await prisma.broker.create({ data });
  res.status(201).json(broker);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  const broker = await prisma.broker.update({ where: { id: parseInt(req.params.id) }, data });
  res.json(broker);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.broker.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ success: true });
});

export default router;
