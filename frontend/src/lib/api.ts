const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const fallbackIpos: import('./types').Ipo[] = [
  {
    id: 1,
    company: 'Deepa Jewellers',
    slug: 'deepa-jewellers-ipo',
    type: 'MAINBOARD',
    status: 'LIVE',
    openDate: '2026-09-01T00:00:00.000Z',
    closeDate: '2026-09-03T00:00:00.000Z',
    priceMin: 95,
    priceMax: 100,
    lotSize: 150,
    issueSize: '₹450 Cr',
    listingAt: 'BSE, NSE',
    gmp: 12,
    subscription: '2.5x',
    description: 'A leading jewellery retailer with strong brand recall and multi-city retail footprint.',
    sector: 'Jewellery',
  },
  {
    id: 2,
    company: 'Purple Style Labs',
    slug: 'purple-style-labs-ipo',
    type: 'MAINBOARD',
    status: 'LIVE',
    openDate: '2026-08-31T00:00:00.000Z',
    closeDate: '2026-09-02T00:00:00.000Z',
    priceMin: 210,
    priceMax: 220,
    lotSize: 68,
    issueSize: '₹1,200 Cr',
    listingAt: 'BSE, NSE',
    gmp: 25,
    subscription: '4.1x',
    description: 'Fashion retailer focused on premium and affordable segments in India.',
    sector: 'Fashion Retail',
  },
  {
    id: 3,
    company: 'Lumino Industries',
    slug: 'lumino-industries-ipo',
    type: 'MAINBOARD',
    status: 'UPCOMING',
    openDate: '2026-10-12T00:00:00.000Z',
    closeDate: '2026-10-15T00:00:00.000Z',
    priceMin: 180,
    priceMax: 190,
    lotSize: 78,
    issueSize: '₹850 Cr',
    listingAt: 'BSE, NSE',
    gmp: 8,
    subscription: '1.8x',
    description: 'Industrial manufacturing company serving automotive and electronics supply chains.',
    sector: 'Manufacturing',
  },
  {
    id: 4,
    company: 'Ashutosh Fibre',
    slug: 'ashutosh-fibre-ipo',
    type: 'SME',
    status: 'LIVE',
    openDate: '2026-08-31T00:00:00.000Z',
    closeDate: '2026-09-02T00:00:00.000Z',
    priceMin: 45,
    priceMax: 48,
    lotSize: 3000,
    issueSize: '₹25 Cr',
    listingAt: 'BSE SME',
    gmp: 5,
    subscription: '1.3x',
    description: 'Textile manufacturer with export and domestic supply capabilities.',
    sector: 'Textiles',
  },
];

const fallbackBrokers: import('./types').Broker[] = [
  {
    id: 1,
    name: 'Zerodha',
    slug: 'zerodha',
    type: 'DISCOUNT',
    brokerage: '₹20 / Trade',
    accountOpening: 'Free',
    rating: 4.8,
    features: JSON.stringify(['Kite App', 'Coin MF', 'Varsity Learning']),
    pros: 'Low brokerage, great platform, strong education resources.',
    cons: 'No direct advisory support for beginners.',
    website: 'https://zerodha.com',
    featured: true,
    popular: true,
  },
  {
    id: 2,
    name: 'Angel One',
    slug: 'angel-one',
    type: 'DISCOUNT',
    brokerage: '₹20 / Trade',
    accountOpening: 'Free',
    rating: 4.6,
    features: JSON.stringify(['Smart API', 'ARQ Advisory', 'Angel SpeedPro']),
    pros: 'Good mobile app and research tools.',
    cons: 'Peak-hour platform slowness is common.',
    website: 'https://angelone.in',
    featured: true,
    popular: true,
  },
  {
    id: 3,
    name: 'ICICI Direct',
    slug: 'icici-direct',
    type: 'FULL_SERVICE',
    brokerage: '0.55%',
    accountOpening: '₹975',
    rating: 4.2,
    features: JSON.stringify(['Research', '3-in-1 Account', 'Portfolio Advisory']),
    pros: 'Strong research and advisory ecosystem.',
    cons: 'Higher brokerage than discount brokers.',
    website: 'https://icicidirect.com',
    featured: false,
    popular: false,
  },
];

const fallbackNcds: import('./types').Ncd[] = [
  {
    id: 1,
    company: 'HDFC Bank NCD',
    slug: 'hdfc-bank-ncd-2026',
    effectiveYield: 8.25,
    issueDate: '2026-07-15T00:00:00.000Z',
    closeDate: '2026-07-25T00:00:00.000Z',
    minInvestment: '₹10,000',
    rating: 'AAA',
    status: 'LIVE',
  },
  {
    id: 2,
    company: 'Tata Capital NCD',
    slug: 'tata-capital-ncd-2026',
    effectiveYield: 8.75,
    issueDate: '2026-08-01T00:00:00.000Z',
    closeDate: '2026-08-10T00:00:00.000Z',
    minInvestment: '₹10,000',
    rating: 'AA+',
    status: 'LIVE',
  },
];

const fallbackRightsIssues: import('./types').RightsIssue[] = [
  {
    id: 1,
    company: 'Info Edge',
    slug: 'info-edge-rights-issue',
    recordDate: '2026-08-12T00:00:00.000Z',
    issueDate: '2026-08-16T00:00:00.000Z',
    price: 125,
    ratio: '1:5',
    status: 'UPCOMING',
  },
  {
    id: 2,
    company: 'Ceat',
    slug: 'ceat-rights-issue',
    recordDate: '2026-08-20T00:00:00.000Z',
    issueDate: '2026-08-24T00:00:00.000Z',
    price: 180,
    ratio: '1:3',
    status: 'UPCOMING',
  },
];

const fallbackBuybacks: import('./types').Buyback[] = [
  {
    id: 1,
    company: 'Bharat Forge',
    slug: 'bharat-forge-buyback',
    issueDate: '2026-09-02T00:00:00.000Z',
    recordDate: '2026-08-28T00:00:00.000Z',
    buybackPrice: 185,
    size: '₹400 Cr',
    status: 'UPCOMING',
  },
  {
    id: 2,
    company: 'Tata Consultancy Services',
    slug: 'tcs-buyback',
    issueDate: '2026-09-10T00:00:00.000Z',
    recordDate: '2026-09-04T00:00:00.000Z',
    buybackPrice: 2450,
    size: '₹18,000 Cr',
    status: 'UPCOMING',
  },
];

const fallbackReports: import('./types').Report[] = [
  {
    id: 1,
    title: 'Mainboard IPO Performance Review Q2 2026',
    slug: 'mainboard-ipo-performance-q2-2026',
    category: 'IPO',
    summary: 'Analysis of mainboard IPO listing gains and subscription trends in Q2 2026.',
    content: 'This report covers the performance of 45 mainboard IPOs listed in Q2 2026 and highlights the most resilient sectors, investor behaviour, and market sentiment after listing.',
    published: true,
    createdAt: '2026-08-10T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Top Discount Brokers Comparison 2026',
    slug: 'top-discount-brokers-2026',
    category: 'BROKER',
    summary: 'Comprehensive comparison of India\'s leading discount brokers.',
    content: 'We compare Zerodha, Angel One, Upstox, and Kotak Neo on fees, platform, support, and value proposition to help investors choose the right brokerage.',
    published: true,
    createdAt: '2026-08-08T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'SME IPO Sector Analysis',
    slug: 'sme-ipo-sector-analysis-2026',
    category: 'IPO',
    summary: 'Sector-wise breakdown of SME IPO activity and merchant banker performance.',
    content: 'SME IPOs continue to attract strong participation from both retail and institutional investors, especially in technology, manufacturing, and industrial services sectors.',
    published: true,
    createdAt: '2026-08-01T00:00:00.000Z',
  },
];

const fallbackAlerts: import('./types').Alert[] = [
  {
    id: 1,
    title: 'IPO Calendar Update',
    message: 'Several new IPOs are expected to open this week across mainboard and SME segments.',
    category: 'IPO',
    alertDate: '2026-08-29T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Market Pulse',
    message: 'Benchmark indices remained stable as investors watched global cues and sector rotation.',
    category: 'MARKET',
    alertDate: '2026-08-28T00:00:00.000Z',
  },
];

function resolveFallback(path: string) {
  const [route, query] = path.split('?');
  const slug = route.split('/').filter(Boolean).at(-1);

  if (route === '/ipos') {
    const params = new URLSearchParams(query || '');
    let items = [...fallbackIpos];
    const type = params.get('type');
    if (type) items = items.filter((item) => item.type === type);
    const status = params.get('status');
    if (status) items = items.filter((item) => item.status === status);
    const limit = Number(params.get('limit') || '0');
    return limit > 0 ? items.slice(0, limit) : items;
  }

  if (route.startsWith('/ipos/')) {
    return fallbackIpos.find((item) => item.slug === slug) ?? null;
  }

  if (route === '/brokers') {
    const params = new URLSearchParams(query || '');
    let items = [...fallbackBrokers];
    const type = params.get('type');
    if (type) items = items.filter((item) => item.type === type);
    if (params.get('featured') === 'true') items = items.filter((item) => item.featured);
    if (params.get('popular') === 'true') items = items.filter((item) => item.popular);
    return items;
  }

  if (route.startsWith('/brokers/')) {
    return fallbackBrokers.find((item) => item.slug === slug) ?? null;
  }

  if (route === '/ncds') return fallbackNcds;
  if (route === '/rights-issues') return fallbackRightsIssues;
  if (route === '/buybacks') return fallbackBuybacks;
  if (route === '/reports') {
    const category = new URLSearchParams(query || '').get('category');
    return category ? fallbackReports.filter((item) => item.category === category) : fallbackReports;
  }
  if (route.startsWith('/reports/')) {
    return fallbackReports.find((item) => item.slug === slug) ?? null;
  }
  if (route === '/alerts') return fallbackAlerts;

  return null;
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      signal: AbortSignal.timeout(8000),
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (error) {
    const fallback = resolveFallback(path);
    if (fallback !== null) {
      return fallback as T;
    }

    throw error;
  }
}

export async function getIpos(params?: { type?: string; status?: string; limit?: number }) {
  const search = new URLSearchParams();
  if (params?.type) search.set('type', params.type);
  if (params?.status) search.set('status', params.status);
  if (params?.limit) search.set('limit', String(params.limit));
  const q = search.toString();
  return fetchApi<import('./types').Ipo[]>(`/ipos${q ? `?${q}` : ''}`);
}

export async function getIpo(slug: string) {
  return fetchApi<import('./types').Ipo>(`/ipos/${slug}`);
}

export async function getBrokers(params?: { type?: string; featured?: boolean; popular?: boolean }) {
  const search = new URLSearchParams();
  if (params?.type) search.set('type', params.type);
  if (params?.featured) search.set('featured', 'true');
  if (params?.popular) search.set('popular', 'true');
  const q = search.toString();
  return fetchApi<import('./types').Broker[]>(`/brokers${q ? `?${q}` : ''}`);
}

export async function getBroker(slug: string) {
  return fetchApi<import('./types').Broker>(`/brokers/${slug}`);
}

export async function getNcds() {
  return fetchApi<import('./types').Ncd[]>('/ncds');
}

export async function getRightsIssues() {
  return fetchApi<import('./types').RightsIssue[]>('/rights-issues');
}

export async function getBuybacks() {
  return fetchApi<import('./types').Buyback[]>('/buybacks');
}

export async function getReports(category?: string) {
  const q = category ? `?category=${category}` : '';
  return fetchApi<import('./types').Report[]>(`/reports${q}`);
}

export async function getReport(slug: string) {
  return fetchApi<import('./types').Report>(`/reports/${slug}`);
}

export async function getAlerts() {
  return fetchApi<import('./types').Alert[]>('/alerts');
}

export function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export async function adminLogin(email: string, password: string) {
  return adminFetch<{ token: string; admin: import('./types').AdminUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getDashboardStats() {
  return adminFetch<import('./types').DashboardStats>('/dashboard/stats');
}

export function formatDate(date: string | null) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateRange(open: string | null, close: string | null) {
  if (!open || !close) return '-';
  const o = new Date(open);
  const c = new Date(close);
  const fmt = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  return `${fmt(o)} - ${fmt(c)} ${o.getFullYear()}`;
}
