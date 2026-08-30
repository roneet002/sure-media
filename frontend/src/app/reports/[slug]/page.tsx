import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReport } from '@/lib/api';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ReportDetailPage({ params }: Props) {
  const { slug } = await params;

  let report;
  try {
    report = await getReport(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/reports" className="text-orange-600 hover:underline text-sm mb-4 inline-block">
        ← Back to Reports
      </Link>

      <article className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#2d5a8e] px-6 py-6">
          <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">{report.category}</span>
          <h1 className="mt-3 text-3xl font-bold text-white">{report.title}</h1>
        </div>

        <div className="p-6">
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{report.summary || report.content}</p>

          {report.content && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
              <div className="text-gray-700 leading-8 whitespace-pre-line">{report.content}</div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
