import type { Alert } from '@/lib/types';
import { formatDate } from '@/lib/api';

interface Props {
  alerts: Alert[];
}

const categoryColors: Record<string, string> = {
  IPO: 'bg-blue-100 text-blue-700',
  MARKET: 'bg-green-100 text-green-700',
  NCD: 'bg-purple-100 text-purple-700',
  GENERAL: 'bg-gray-100 text-gray-700',
};

export default function AlertsPanel({ alerts }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 flex items-center gap-2">
        <span className="text-xl">🔔</span>
        <h2 className="text-white font-semibold">Latest Alerts</h2>
      </div>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No alerts for today</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[alert.category] || categoryColors.GENERAL}`}>
                  {alert.category}
                </span>
                <span className="text-xs text-gray-400">{formatDate(alert.alertDate)}</span>
              </div>
              <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{alert.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
