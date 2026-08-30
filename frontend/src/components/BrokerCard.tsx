import Link from 'next/link';
import type { Broker } from '@/lib/types';

interface Props {
  broker: Broker;
}

export default function BrokerCard({ broker }: Props) {
  return (
    <Link
      href={`/brokers/${broker.slug}`}
      className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-900">{broker.name}</h3>
        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-sm">
          <span>★</span>
          <span>{broker.rating}</span>
        </div>
      </div>
      <p className="text-orange-600 font-medium mb-2">{broker.brokerage}</p>
      <p className="text-sm text-gray-500 mb-3">
        {broker.type === 'DISCOUNT' ? 'Discount Broker' : 'Full Service Broker'}
      </p>
      {broker.accountOpening && (
        <p className="text-xs text-gray-400">Account Opening: {broker.accountOpening}</p>
      )}
      <div className="flex gap-2 mt-3">
        {broker.featured && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Featured</span>
        )}
        {broker.popular && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Popular</span>
        )}
      </div>
    </Link>
  );
}
