import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBroker } from '@/lib/api';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BrokerDetailPage({ params }: Props) {
  const { slug } = await params;

  let broker;
  try {
    broker = await getBroker(slug);
  } catch {
    notFound();
  }

  const features = broker.features ? JSON.parse(broker.features) as string[] : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/brokers" className="text-orange-600 hover:underline text-sm mb-4 inline-block">
        ← Back to Brokers
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8e] px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{broker.name}</h1>
              <p className="text-orange-300 font-medium mt-1">{broker.brokerage}</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg px-4 py-2">
              <p className="text-2xl font-bold text-yellow-300">★ {broker.rating}</p>
              <p className="text-xs text-blue-200">Rating</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400">Type</p>
              <p className="font-medium">{broker.type === 'DISCOUNT' ? 'Discount Broker' : 'Full Service'}</p>
            </div>
            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400">Account Opening</p>
              <p className="font-medium">{broker.accountOpening || 'Free'}</p>
            </div>
            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400">Website</p>
              {broker.website ? (
                <a href={broker.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                  Visit →
                </a>
              ) : (
                <p className="font-medium">-</p>
              )}
            </div>
          </div>

          {features.length > 0 && (
            <div>
              <h2 className="font-semibold mb-2">Features</h2>
              <div className="flex flex-wrap gap-2">
                {features.map((f) => (
                  <span key={f} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{f}</span>
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {broker.pros && (
              <div className="border border-green-100 bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Pros</h3>
                <p className="text-sm text-green-700">{broker.pros}</p>
              </div>
            )}
            {broker.cons && (
              <div className="border border-red-100 bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Cons</h3>
                <p className="text-sm text-red-700">{broker.cons}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
