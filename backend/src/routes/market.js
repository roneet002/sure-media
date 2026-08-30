import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function createCrudRoutes(model, slugField = 'company') {
  const r = Router();

  r.get('/', async (req, res) => {
    const items = await prisma[model].findMany({ orderBy: { createdAt: 'desc' } });
    res.json(items);
  });

  r.get('/:slug', async (req, res) => {
    const item = await prisma[model].findUnique({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  });

  r.post('/', authMiddleware, async (req, res) => {
    const data = { ...req.body, slug: req.body.slug || slugify(req.body[slugField]) };
    for (const key of ['issueDate', 'closeDate', 'recordDate', 'openDate']) {
      if (data[key]) data[key] = new Date(data[key]);
    }
    const item = await prisma[model].create({ data });
    res.status(201).json(item);
  });

  r.put('/:id', authMiddleware, async (req, res) => {
    const data = { ...req.body };
    delete data.id;
    for (const key of ['issueDate', 'closeDate', 'recordDate', 'openDate']) {
      if (data[key]) data[key] = new Date(data[key]);
    }
    const item = await prisma[model].update({ where: { id: parseInt(req.params.id) }, data });
    res.json(item);
  });

  r.delete('/:id', authMiddleware, async (req, res) => {
    await prisma[model].delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  });

  return r;
}

export const ncdRoutes = createCrudRoutes('ncd');
export const rightsRoutes = createCrudRoutes('rightsIssue');
export const buybackRoutes = createCrudRoutes('buyback');
