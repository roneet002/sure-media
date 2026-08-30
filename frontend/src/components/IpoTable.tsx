import Link from 'next/link';
import type { Ipo } from '@/lib/types';
import { formatDateRange } from '@/lib/api';

interface Props {
  ipos: Ipo[];
  title: string;
  moreLink?: string;
}

export default function IpoTable({ ipos, title, moreLink }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8e] px-5 py-3">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600">
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Issue Dates</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Price Band</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">GMP</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Sub.</th>
            </tr>
          </thead>
          <tbody>
            {ipos.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No records found
                </td>
              </tr>
            ) : (
              ipos.map((ipo) => (
                <tr key={ipo.id} className="border-t border-gray-100 hover:bg-blue-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/ipos/${ipo.slug}`} className="text-blue-700 hover:underline font-medium">
                      {ipo.company}
                    </Link>
                    {ipo.sector && (
                      <span className="block text-xs text-gray-400 mt-0.5">{ipo.sector}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDateRange(ipo.openDate, ipo.closeDate)}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">
                    {ipo.priceMin && ipo.priceMax ? `₹${ipo.priceMin} - ₹${ipo.priceMax}` : '-'}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {ipo.gmp != null ? (
                      <span className="text-green-600 font-medium">₹{ipo.gmp}</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {ipo.subscription || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {moreLink && (
        <div className="px-4 py-3 border-t border-gray-100">
          <Link href={moreLink} className="text-orange-600 hover:underline text-sm font-medium">
            View all →
          </Link>
        </div>
      )}
    </div>
  );
}
