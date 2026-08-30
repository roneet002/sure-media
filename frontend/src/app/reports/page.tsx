import Link from 'next/link';
import { getReports } from '@/lib/api';

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
      <p className="text-gray-500 mb-6">IPO insights and stock broker analysis</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Link
            key={report.id}
            href={`/reports/${report.slug}`}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition"
          >
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{report.category}</span>
            <h3 className="font-semibold mt-2 text-gray-900">{report.title}</h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{report.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
