import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIpo, formatDate, formatDateRange } from '@/lib/api';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function IpoDetailPage({ params }: Props) {
  const { slug } = await params;

  let ipo;
  try {
    ipo = await getIpo(slug);
  } catch {
    notFound();
  }

  const details = [
    { label: 'Type', value: ipo.type === 'MAINBOARD' ? 'Mainboard IPO' : 'SME IPO' },
    { label: 'Status', value: ipo.status },
    { label: 'Issue Dates', value: formatDateRange(ipo.openDate, ipo.closeDate) },
    { label: 'Price Band', value: ipo.priceMin && ipo.priceMax ? `₹${ipo.priceMin} - ₹${ipo.priceMax}` : '-' },
    { label: 'Lot Size', value: ipo.lotSize ? `${ipo.lotSize} shares` : '-' },
    { label: 'Issue Size', value: ipo.issueSize || '-' },
    { label: 'Sector', value: ipo.sector || '-' },
    { label: 'GMP', value: ipo.gmp != null ? `₹${ipo.gmp}` : '-' },
    { label: 'Subscription', value: ipo.subscription || '-' },
    { label: 'Listing At', value: ipo.listingAt || 'BSE, NSE' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/ipos" className="text-orange-600 hover:underline text-sm mb-4 inline-block">
        ← Back to IPOs
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8e] px-6 py-5">
          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded">{ipo.type}</span>
          <h1 className="text-2xl font-bold text-white mt-2">{ipo.company} IPO</h1>
          {ipo.sector && <p className="text-blue-200 mt-1">{ipo.sector}</p>}
        </div>

        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {details.map((d) => (
              <div key={d.label} className="border border-gray-100 rounded-lg p-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{d.label}</p>
                <p className="font-medium text-gray-900 mt-1">{d.value}</p>
              </div>
            ))}
          </div>

          {ipo.description && (
            <div className="mt-6">
              <h2 className="font-semibold text-gray-900 mb-2">About the Company</h2>
              <p className="text-gray-600 leading-relaxed">{ipo.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
