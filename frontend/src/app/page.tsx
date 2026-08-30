import Link from 'next/link';
import IpoTable from '@/components/IpoTable';
import BrokerCard from '@/components/BrokerCard';
import AlertsPanel from '@/components/AlertsPanel';
import { getIpos, getBrokers, getAlerts, getReports, getRightsIssues, getBuybacks } from '@/lib/api';

export default async function HomePage() {
  const [mainboardIpos, smeIpos, featuredBrokers, popularBrokers, alerts, reports, rightsIssues, buybacks] =
    await Promise.all([
      getIpos({ type: 'MAINBOARD', limit: 8 }),
      getIpos({ type: 'SME', limit: 6 }),
      getBrokers({ featured: true }),
      getBrokers({ popular: true }),
      getAlerts(),
      getReports(),
      getRightsIssues(),
      getBuybacks(),
    ]);

  const marketStats = [
    { label: 'Mainboard IPOs', value: `${mainboardIpos.length}+` },
    { label: 'SME IPOs', value: `${smeIpos.length}+` },
    { label: 'Top Brokers', value: `${featuredBrokers.length + popularBrokers.length}` },
    { label: 'Active Alerts', value: `${alerts.length}` },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#102b46] via-[#1c3f66] to-[#103864] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-8 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-100">
                Market Intelligence
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
                IPOs, NCDs, Rights Issues, Buyback & Stock Brokers
              </h1>
              <p className="mt-4 max-w-2xl text-blue-100 text-lg">
                Discover actionable insights, compare brokers, and track the most relevant market moves in one place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link href="/ipos" className="bg-orange-500 hover:bg-orange-600 px-6 py-2.5 rounded-lg font-medium transition shadow-lg shadow-orange-500/20">
                  Browse IPOs
                </Link>
                <Link href="/brokers" className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-lg font-medium transition border border-white/15">
                  Broker Reviews
                </Link>
              </div>
            </div>

            <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-5 shadow-2xl shadow-blue-900/20">
              <div className="grid gap-3">
                {marketStats.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 border border-white/10">
                    <span className="text-sm text-blue-100">{item.label}</span>
                    <span className="text-xl font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/ipos?type=MAINBOARD', label: 'Mainboard IPO', icon: '📈' },
            { href: '/ipos?type=SME', label: 'SME IPO', icon: '🏭' },
            { href: '/ncds', label: 'NCD (Bonds)', icon: '💰' },
            { href: '/brokers/compare', label: 'Compare Brokers', icon: '⚖️' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:border-orange-200 transition text-center"
            >
              <span className="text-2xl block mb-2">{item.icon}</span>
              <span className="font-medium text-gray-800 text-sm">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <IpoTable ipos={mainboardIpos} title="Mainboard IPOs 2026" moreLink="/ipos?type=MAINBOARD" />
            <IpoTable ipos={smeIpos} title="SME IPOs 2026" moreLink="/ipos?type=SME" />
          </div>
          <div>
            <AlertsPanel alerts={alerts} />
          </div>
        </div>

        <section className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Rights Issues</h2>
              <Link href="/rights-issues" className="text-orange-600 hover:underline text-sm font-medium">View all →</Link>
            </div>
            <div className="space-y-3">
              {rightsIssues.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-none last:pb-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.company}</p>
                    <p className="text-xs text-gray-500">Ratio: {item.ratio}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Buybacks</h2>
              <Link href="/buybacks" className="text-orange-600 hover:underline text-sm font-medium">View all →</Link>
            </div>
            <div className="space-y-3">
              {buybacks.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-none last:pb-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.company}</p>
                    <p className="text-xs text-gray-500">Buyback: ₹{item.buybackPrice}</p>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Stock Broker Reviews India</h2>
            <Link href="/brokers" className="text-orange-600 hover:underline text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...featuredBrokers, ...popularBrokers.filter((b) => !featuredBrokers.find((f) => f.id === b.id))]
              .slice(0, 6)
              .map((broker) => (
                <BrokerCard key={broker.id} broker={broker} />
              ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
            <Link href="/reports" className="text-orange-600 hover:underline text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {reports.slice(0, 3).map((report) => (
              <Link
                key={report.id}
                href={`/reports/${report.slug}`}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition"
              >
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{report.category}</span>
                <h3 className="font-semibold mt-2 text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{report.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
