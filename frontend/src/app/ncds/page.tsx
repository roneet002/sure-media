import Link from 'next/link';
import { getNcds, formatDate } from '@/lib/api';

export default async function NcdsPage() {
  const ncds = await getNcds();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">NCD Public Issues 2026</h1>
      <p className="text-gray-500 mb-6">Non-Convertible Debenture (Bond) issues</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600">
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Effective Yield</th>
              <th className="px-4 py-3 font-medium">Issue Date</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Min Investment</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Rating</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {ncds.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No NCD issues found</td></tr>
            ) : (
              ncds.map((ncd) => (
                <tr key={ncd.id} className="border-t border-gray-100 hover:bg-blue-50/50">
                  <td className="px-4 py-3 font-medium text-blue-700">{ncd.company}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">
                    {ncd.effectiveYield ? `${ncd.effectiveYield}%` : '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(ncd.issueDate)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{ncd.minInvestment || '-'}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {ncd.rating && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">{ncd.rating}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{ncd.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
