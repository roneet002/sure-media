import BrokerCard from '@/components/BrokerCard';
import { getBrokers } from '@/lib/api';

interface Props {
  searchParams: Promise<{ type?: string }>;
}

export default async function BrokersPage({ searchParams }: Props) {
  const params = await searchParams;
  const type = params.type || undefined;
  const brokers = await getBrokers({ type });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Broker Reviews India</h1>
      <p className="text-gray-500 mb-6">Compare India&apos;s top stock brokers</p>

      <div className="flex gap-2 mb-6">
        {[
          { label: 'All Brokers', href: '/brokers' },
          { label: 'Discount', href: '/brokers?type=DISCOUNT' },
          { label: 'Full Service', href: '/brokers?type=FULL_SERVICE' },
        ].map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              (tab.href === '/brokers' && !type) || tab.href.includes(type || 'NONE')
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brokers.map((broker) => (
          <BrokerCard key={broker.id} broker={broker} />
        ))}
      </div>
    </div>
  );
}
