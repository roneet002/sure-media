import Link from 'next/link';
import { getBuybacks, formatDate } from '@/lib/api';

export default async function BuybacksPage() {
  const buybacks = await getBuybacks();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Buybacks</h1>
      <p className="text-gray-500 mb-6">Upcoming buyback offers and key dates</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-600">
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Buyback Price</th>
              <th className="px-4 py-3 font-medium">Issue Date</th>
              <th className="px-4 py-3 font-medium">Record Date</th>
              <th className="px-4 py-3 font-medium">Size</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {buybacks.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 hover:bg-blue-50/50">
                <td className="px-4 py-3 font-medium text-blue-700">{item.company}</td>
                <td className="px-4 py-3 text-gray-600">{item.buybackPrice != null ? `₹${item.buybackPrice}` : '-'}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(item.issueDate)}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(item.recordDate)}</td>
                <td className="px-4 py-3 text-gray-600">{item.size || '-'}</td>
                <td className="px-4 py-3">
                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-orange-600 hover:underline text-sm">← Back to home</Link>
      </div>
    </div>
  );
}
