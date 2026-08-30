import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

router.get('/', async (req, res) => {
  const { category, search } = req.query;
  const where = { published: true };
  if (category) where.category = category;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } },
    ];
  }

  const reports = await prisma.report.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  res.json(reports);
});

router.get('/admin/all', authMiddleware, async (req, res) => {
  const reports = await prisma.report.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(reports);
});

router.get('/:slug', async (req, res) => {
  const report = await prisma.report.findUnique({ where: { slug: req.params.slug } });
  if (!report) return res.status(404).json({ error: 'Report not found' });
  res.json(report);
});

router.post('/', authMiddleware, async (req, res) => {
  const data = { ...req.body, slug: req.body.slug || slugify(req.body.title) };
  const report = await prisma.report.create({ data });
  res.status(201).json(report);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  const report = await prisma.report.update({ where: { id: parseInt(req.params.id) }, data });
  res.json(report);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await prisma.report.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ success: true });
});

export default router;
