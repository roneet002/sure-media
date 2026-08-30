import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@chittorgarh.com' },
    update: {},
    create: {
      email: 'admin@chittorgarh.com',
      password,
      name: 'Admin',
    },
  });

  const ipos = [
    {
      company: 'Deepa Jewellers',
      slug: 'deepa-jewellers-ipo',
      type: 'MAINBOARD',
      status: 'LIVE',
      openDate: new Date('2026-09-01'),
      closeDate: new Date('2026-09-03'),
      priceMin: 95,
      priceMax: 100,
      lotSize: 150,
      issueSize: '₹450 Cr',
      sector: 'Jewellery',
      gmp: 12,
      subscription: '2.5x',
    },
    {
      company: 'Purple Style Labs',
      slug: 'purple-style-labs-ipo',
      type: 'MAINBOARD',
      status: 'LIVE',
      openDate: new Date('2026-08-31'),
      closeDate: new Date('2026-09-02'),
      priceMin: 210,
      priceMax: 220,
      lotSize: 68,
      issueSize: '₹1,200 Cr',
      sector: 'Fashion Retail',
      gmp: 25,
      subscription: '4.1x',
    },
    {
      company: 'Lumino Industries',
      slug: 'lumino-industries-ipo',
      type: 'MAINBOARD',
      status: 'LIVE',
      openDate: new Date('2026-08-27'),
      closeDate: new Date('2026-08-31'),
      priceMin: 180,
      priceMax: 190,
      lotSize: 78,
      issueSize: '₹850 Cr',
      sector: 'Manufacturing',
      gmp: 8,
      subscription: '1.8x',
    },
    {
      company: 'Ashutosh Fibre',
      slug: 'ashutosh-fibre-ipo',
      type: 'SME',
      status: 'LIVE',
      openDate: new Date('2026-08-31'),
      closeDate: new Date('2026-09-02'),
      priceMin: 45,
      priceMax: 48,
      lotSize: 3000,
      issueSize: '₹25 Cr',
      sector: 'Textiles',
      gmp: 5,
    },
    {
      company: 'Shanti Inorganics',
      slug: 'shanti-inorganics-ipo',
      type: 'SME',
      status: 'LIVE',
      openDate: new Date('2026-08-31'),
      closeDate: new Date('2026-09-02'),
      priceMin: 72,
      priceMax: 76,
      lotSize: 1600,
      issueSize: '₹42 Cr',
      sector: 'Chemicals',
      gmp: 10,
    },
    {
      company: 'Kwick Forensic Solutions',
      slug: 'kwick-forensic-solutions-ipo',
      type: 'SME',
      status: 'LIVE',
      openDate: new Date('2026-08-27'),
      closeDate: new Date('2026-08-31'),
      priceMin: 55,
      priceMax: 58,
      lotSize: 2000,
      issueSize: '₹18 Cr',
      sector: 'Services',
    },
  ];

  for (const ipo of ipos) {
    await prisma.ipo.upsert({
      where: { slug: ipo.slug },
      update: ipo,
      create: ipo,
    });
  }

  const brokers = [
    {
      name: 'Zerodha',
      slug: 'zerodha',
      type: 'DISCOUNT',
      brokerage: '₹20 / Trade',
      accountOpening: 'Free',
      rating: 4.8,
      featured: true,
      popular: true,
      website: 'https://zerodha.com',
      pros: 'Low brokerage, Kite platform, largest user base',
      cons: 'No research reports, limited customer support',
      features: JSON.stringify(['Kite App', 'Coin MF', 'Varsity Learning']),
    },
    {
      name: 'Angel One',
      slug: 'angel-one',
      type: 'DISCOUNT',
      brokerage: '₹20 / Trade',
      accountOpening: 'Free',
      rating: 4.6,
      featured: true,
      popular: true,
      website: 'https://angelone.in',
      pros: 'Smart API, ARQ advisory, good mobile app',
      cons: 'Platform can be slow during peak hours',
      features: JSON.stringify(['Smart API', 'ARQ Advisory', 'Angel SpeedPro']),
    },
    {
      name: 'Upstox',
      slug: 'upstox',
      type: 'DISCOUNT',
      brokerage: '₹20 / Trade',
      accountOpening: 'Free',
      rating: 4.5,
      featured: false,
      popular: true,
      website: 'https://upstox.com',
      pros: 'Fast onboarding, Pro Web platform',
      cons: 'Limited fundamental research',
      features: JSON.stringify(['Pro Web', 'Upstox MF', 'Margin Trading']),
    },
    {
      name: 'Kotak Neo',
      slug: 'kotak-neo',
      type: 'DISCOUNT',
      brokerage: '₹10 / Trade',
      accountOpening: 'Free',
      rating: 4.4,
      featured: true,
      popular: false,
      website: 'https://kotaksecurities.com',
      pros: 'Lowest brokerage among top brokers, bank backing',
      cons: 'Platform UI needs improvement',
      features: JSON.stringify(['Neo App', 'Research Reports', 'Bank Integration']),
    },
    {
      name: 'ProStocks',
      slug: 'prostocks',
      type: 'DISCOUNT',
      brokerage: '₹899 Unlimited',
      accountOpening: 'Free',
      rating: 4.3,
      featured: false,
      popular: true,
      website: 'https://prostocks.com',
      pros: 'Unlimited monthly plan for active traders',
      cons: 'Smaller brand, fewer features',
      features: JSON.stringify(['Unlimited Plan', 'Star Platform']),
    },
    {
      name: 'ICICI Direct',
      slug: 'icici-direct',
      type: 'FULL_SERVICE',
      brokerage: '0.55%',
      accountOpening: '₹975',
      rating: 4.2,
      featured: false,
      popular: false,
      website: 'https://icicidirect.com',
      pros: 'Full research, 3-in-1 account, advisory',
      cons: 'High brokerage charges',
      features: JSON.stringify(['Research', '3-in-1 Account', 'Portfolio Advisory']),
    },
  ];

  for (const broker of brokers) {
    await prisma.broker.upsert({
      where: { slug: broker.slug },
      update: broker,
      create: broker,
    });
  }

  const ncds = [
    {
      company: 'HDFC Bank NCD',
      slug: 'hdfc-bank-ncd-2026',
      effectiveYield: 8.25,
      issueDate: new Date('2026-07-15'),
      closeDate: new Date('2026-07-25'),
      minInvestment: '₹10,000',
      rating: 'AAA',
      status: 'LIVE',
    },
    {
      company: 'Tata Capital NCD',
      slug: 'tata-capital-ncd-2026',
      effectiveYield: 8.75,
      issueDate: new Date('2026-08-01'),
      closeDate: new Date('2026-08-10'),
      minInvestment: '₹10,000',
      rating: 'AA+',
      status: 'LIVE',
    },
  ];

  for (const ncd of ncds) {
    await prisma.ncd.upsert({
      where: { slug: ncd.slug },
      update: ncd,
      create: ncd,
    });
  }

  const reports = [
    {
      title: 'Mainboard IPO Performance Review Q2 2026',
      slug: 'mainboard-ipo-performance-q2-2026',
      category: 'IPO',
      summary: 'Analysis of mainboard IPO listing gains and subscription trends in Q2 2026.',
      content: 'This report covers the performance of 45 mainboard IPOs listed in Q2 2026...',
    },
    {
      title: 'Top Discount Brokers Comparison 2026',
      slug: 'top-discount-brokers-2026',
      category: 'BROKER',
      summary: 'Comprehensive comparison of India\'s leading discount brokers.',
      content: 'We compare Zerodha, Angel One, Upstox, and Kotak Neo on fees, platform, and features...',
    },
    {
      title: 'SME IPO Sector Analysis',
      slug: 'sme-ipo-sector-analysis-2026',
      category: 'IPO',
      summary: 'Sector-wise breakdown of SME IPO activity and merchant banker performance.',
      content: 'SME IPOs continue to see strong interest from retail investors...',
    },
  ];

  for (const report of reports) {
    await prisma.report.upsert({
      where: { slug: report.slug },
      update: report,
      create: report,
    });
  }

  const alerts = [
    {
      title: 'Deepa Jewellers IPO Opens Today',
      message: 'Mainboard IPO Deepa Jewellers opens for subscription. Price band ₹95-100.',
      category: 'IPO',
      alertDate: new Date('2026-08-26'),
    },
    {
      title: 'Purple Style Labs GMP at ₹25',
      message: 'Grey market premium for Purple Style Labs IPO currently at ₹25 per share.',
      category: 'IPO',
      alertDate: new Date('2026-08-26'),
    },
    {
      title: 'Market Update',
      message: 'Nifty 50 gains 0.5% in early trade. IT and banking stocks lead the rally.',
      category: 'MARKET',
      alertDate: new Date('2026-08-26'),
    },
  ];

  for (const alert of alerts) {
    await prisma.alert.create({ data: alert });
  }

  console.log('Seed completed successfully');
  console.log('Admin login: admin@chittorgarh.com / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
