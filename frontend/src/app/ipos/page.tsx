import IpoTable from '@/components/IpoTable';
import { getIpos } from '@/lib/api';

interface Props {
  searchParams: Promise<{ type?: string; status?: string }>;
}

export default async function IposPage({ searchParams }: Props) {
  const params = await searchParams;
  const type = params.type || undefined;
  const ipos = await getIpos({ type, status: params.status });

  const title = type === 'SME' ? 'SME IPOs' : type === 'MAINBOARD' ? 'Mainboard IPOs' : 'All IPOs';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 mb-6">Latest IPO listings and subscription details</p>

      <div className="flex gap-2 mb-6">
        {[
          { label: 'All', href: '/ipos' },
          { label: 'Mainboard', href: '/ipos?type=MAINBOARD' },
          { label: 'SME', href: '/ipos?type=SME' },
        ].map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              (tab.href === '/ipos' && !type) || tab.href.includes(type || 'NONE')
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <IpoTable ipos={ipos} title={`${title} — ${ipos.length} listings`} />
    </div>
  );
}
