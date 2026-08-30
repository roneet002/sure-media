'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Broker } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function CompareBrokersPage() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [broker1, setBroker1] = useState('');
  const [broker2, setBroker2] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/brokers`)
      .then((r) => r.json())
      .then(setBrokers);
  }, []);

  const b1 = brokers.find((b) => b.slug === broker1);
  const b2 = brokers.find((b) => b.slug === broker2);

  const rows = [
    { label: 'Brokerage', key: 'brokerage' as const },
    { label: 'Type', key: 'type' as const },
    { label: 'Account Opening', key: 'accountOpening' as const },
    { label: 'Rating', key: 'rating' as const },
    { label: 'Pros', key: 'pros' as const },
    { label: 'Cons', key: 'cons' as const },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Stock Brokers</h1>
      <p className="text-gray-500 mb-6">Side-by-side comparison of India&apos;s top brokers</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <select
          value={broker1}
          onChange={(e) => setBroker1(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-3 bg-white"
        >
          <option value="">Choose Broker 1</option>
          {brokers.map((b) => (
            <option key={b.slug} value={b.slug}>{b.name}</option>
          ))}
        </select>
        <select
          value={broker2}
          onChange={(e) => setBroker2(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-3 bg-white"
        >
          <option value="">Choose Broker 2</option>
          {brokers.map((b) => (
            <option key={b.slug} value={b.slug}>{b.name}</option>
          ))}
        </select>
      </div>

      {b1 && b2 ? (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a3a5c] text-white">
                <th className="px-4 py-3 text-left">Feature</th>
                <th className="px-4 py-3 text-left">
                  <Link href={`/brokers/${b1.slug}`} className="hover:underline">{b1.name}</Link>
                </th>
                <th className="px-4 py-3 text-left">
                  <Link href={`/brokers/${b2.slug}`} className="hover:underline">{b2.name}</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-600">{row.label}</td>
                  <td className="px-4 py-3">{String(b1[row.key] ?? '-')}</td>
                  <td className="px-4 py-3">{String(b2[row.key] ?? '-')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-100">
          Select two brokers above to compare
        </div>
      )}
    </div>
  );
}
