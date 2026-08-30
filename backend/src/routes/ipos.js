import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

router.get('/', async (req, res) => {
  const { type, status, limit, search } = req.query;
  const where = {};
  if (type) where.type = type;
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { company: { contains: search, mode: 'insensitive' } },
      { sector: { contains: search, mode: 'insensitive' } },
    ];
  }

  const ipos = await prisma.ipo.findMany({
    where,
    orderBy: { openDate: 'desc' },
    take: limit ? parseInt(limit) : undefined,
  });
  res.json(ipos);
});

router.get('/:slug', async (req, res) => {
  const ipo = await prisma.ipo.findUnique({ where: { slug: req.params.slug } });
  if (!ipo) return res.status(404).json({ error: 'IPO not found' });
  res.json(ipo);
});

router.post('/', authMiddleware, async (req, res) => {
  const data = { ...req.body, slug: req.body.slug || slugify(req.body.company) };
  if (data.openDate) data.openDate = new Date(data.openDate);
  if (data.closeDate) data.closeDate = new Date(data.closeDate);
  const ipo = await prisma.ipo.create({ data });
  res.status(201).json(ipo);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const data = { ...req.body };
  if (data.openDate) data.openDate = new Date(data.openDate);
  if (data.closeDate) data.closeDate = new Date(data.closeDate);
  delete data.id;
  const ipo = await prisma.ipo.update({ where: { id: parseInt(req.params.id) }, data });
  res.json(ipo);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.ipo.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ success: true });
});

export default router;
