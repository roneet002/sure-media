'use client';

import { useEffect, useState } from 'react';
import { adminFetch, adminLogin, getDashboardStats } from '@/lib/api';
import type { Alert, Broker, DashboardStats, Ipo, Report } from '@/lib/types';

type CrudTab = 'ipos' | 'brokers' | 'reports' | 'alerts';

type IpoForm = Partial<Ipo> & { company: string; type: 'MAINBOARD' | 'SME'; status: string };
type BrokerForm = Partial<Broker> & { name: string; type: 'DISCOUNT' | 'FULL_SERVICE'; brokerage: string };
type ReportForm = Partial<Report> & { title: string; category: string };
type AlertForm = Partial<Alert> & { title: string; message: string; category: string };

const initialIpoForm: IpoForm = {
  company: '',
  type: 'MAINBOARD',
  status: 'LIVE',
  openDate: '',
  closeDate: '',
  priceMin: 0,
  priceMax: 0,
  lotSize: 0,
  issueSize: '',
  listingAt: '',
  gmp: 0,
  subscription: '',
  description: '',
  sector: '',
};

const initialBrokerForm: BrokerForm = {
  name: '',
  type: 'DISCOUNT',
  brokerage: '',
  accountOpening: '',
  rating: 4.5,
  features: '',
  pros: '',
  cons: '',
  website: '',
  featured: false,
  popular: false,
};

const initialReportForm: ReportForm = {
  title: '',
  category: 'IPO',
  summary: '',
  content: '',
  published: true,
};

const initialAlertForm: AlertForm = {
  title: '',
  message: '',
  category: 'IPO',
  alertDate: new Date().toISOString(),
};

export default function AdminPage() {
  const [email, setEmail] = useState('admin@chittorgarh.com');
  const [password, setPassword] = useState('admin123');
  const [token, setToken] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<CrudTab>('ipos');
  const [ipos, setIpos] = useState<Ipo[]>([]);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [ipoForm, setIpoForm] = useState<IpoForm>(initialIpoForm);
  const [brokerForm, setBrokerForm] = useState<BrokerForm>(initialBrokerForm);
  const [reportForm, setReportForm] = useState<ReportForm>(initialReportForm);
  const [alertForm, setAlertForm] = useState<AlertForm>(initialAlertForm);

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    void loadDashboard();
    void loadEntities();
  }, [token]);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    }
  }

  async function loadEntities() {
    try {
      const [ipoRes, brokerRes, reportRes, alertRes] = await Promise.all([
        adminFetch<Ipo[]>('/ipos'),
        adminFetch<Broker[]>('/brokers'),
        adminFetch<Report[]>('/reports/admin/all'),
        adminFetch<Alert[]>('/alerts'),
      ]);
      setIpos(ipoRes);
      setBrokers(brokerRes);
      setReports(reportRes);
      setAlerts(alertRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load records');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await adminLogin(email, password);
      localStorage.setItem('admin_token', result.token);
      setToken(result.token);
      setMessage('Login successful');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function saveIpo(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const payload = { ...ipoForm };
      if (!payload.company) throw new Error('Company name is required');
      if (payload.id) {
        await adminFetch(`/ipos/${payload.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        setMessage('IPO updated successfully');
      } else {
        await adminFetch('/ipos', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setMessage('IPO created successfully');
      }
      setIpoForm(initialIpoForm);
      await loadEntities();
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save IPO');
    } finally {
      setLoading(false);
    }
  }

  async function saveBroker(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const payload = { ...brokerForm };
      if (!payload.name) throw new Error('Broker name is required');
      if (payload.id) {
        await adminFetch(`/brokers/${payload.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        setMessage('Broker updated successfully');
      } else {
        await adminFetch('/brokers', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setMessage('Broker created successfully');
      }
      setBrokerForm(initialBrokerForm);
      await loadEntities();
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save broker');
    } finally {
      setLoading(false);
    }
  }

  async function saveReport(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const payload = { ...reportForm };
      if (!payload.title) throw new Error('Report title is required');
      if (payload.id) {
        await adminFetch(`/reports/${payload.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        setMessage('Report updated successfully');
      } else {
        await adminFetch('/reports', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setMessage('Report created successfully');
      }
      setReportForm(initialReportForm);
      await loadEntities();
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save report');
    } finally {
      setLoading(false);
    }
  }

  async function saveAlert(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const payload = { ...alertForm };
      if (!payload.title) throw new Error('Alert title is required');
      if (!payload.message) throw new Error('Alert message is required');
      await adminFetch('/alerts', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setAlertForm(initialAlertForm);
      setMessage('Alert created successfully');
      await loadEntities();
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create alert');
    } finally {
      setLoading(false);
    }
  }

  async function deleteRecord(path: string, id: number) {
    if (!token) return;
    setLoading(true);
    try {
      await adminFetch(`${path}/${id}`, { method: 'DELETE' });
      await loadEntities();
      await loadDashboard();
      setMessage('Item deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setToken(null);
    setStats(null);
    setIpos([]);
    setBrokers([]);
    setReports([]);
    setAlerts([]);
    setMessage('Logged out');
  }

  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-500 mb-6">Use the default admin credentials to manage the portal.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a3a5c] text-white rounded-lg py-2.5 font-medium disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage IPOs, brokers, reports, and alerts.</p>
        </div>
        <button
          onClick={logout}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
        >
          Logout
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">{error}</div>}
      {message && <div className="mb-4 rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700">{message}</div>}

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'IPOs', value: stats?.ipos ?? 0 },
          { label: 'Brokers', value: stats?.brokers ?? 0 },
          { label: 'NCDs', value: stats?.ncds ?? 0 },
          { label: 'Reports', value: stats?.reports ?? 0 },
          { label: 'Alerts', value: stats?.alerts ?? 0 },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {(['ipos', 'brokers', 'reports', 'alerts'] as CrudTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === tab ? 'bg-[#1a3a5c] text-white' : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === 'ipos' && (
        <div className="grid xl:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">IPO Records</h2>
            <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
              {ipos.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.company}</p>
                      <p className="text-xs text-gray-500">{item.type} • {item.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIpoForm({ ...item, openDate: item.openDate ?? '', closeDate: item.closeDate ?? '', })}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRecord('/ipos', item.id)}
                        className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={saveIpo} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
            <h3 className="text-lg font-semibold">{ipoForm.id ? 'Edit IPO' : 'Add IPO'}</h3>
            <input value={ipoForm.company ?? ''} onChange={(e) => setIpoForm({ ...ipoForm, company: e.target.value })} placeholder="Company" className="w-full border rounded-lg px-3 py-2" />
            <div className="grid grid-cols-2 gap-3">
              <select value={ipoForm.type ?? 'MAINBOARD'} onChange={(e) => setIpoForm({ ...ipoForm, type: e.target.value as 'MAINBOARD' | 'SME' })} className="w-full border rounded-lg px-3 py-2">
                <option value="MAINBOARD">MAINBOARD</option>
                <option value="SME">SME</option>
              </select>
              <select value={ipoForm.status ?? 'LIVE'} onChange={(e) => setIpoForm({ ...ipoForm, status: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                <option value="LIVE">LIVE</option>
                <option value="UPCOMING">UPCOMING</option>
                <option value="CLOSED">CLOSED</option>
                <option value="FILED">FILED</option>
                <option value="APPROVED">APPROVED</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={ipoForm.openDate ? new Date(ipoForm.openDate).toISOString().slice(0, 10) : ''} onChange={(e) => setIpoForm({ ...ipoForm, openDate: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
              <input type="date" value={ipoForm.closeDate ? new Date(ipoForm.closeDate).toISOString().slice(0, 10) : ''} onChange={(e) => setIpoForm({ ...ipoForm, closeDate: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={ipoForm.priceMin ?? 0} onChange={(e) => setIpoForm({ ...ipoForm, priceMin: Number(e.target.value) })} placeholder="Price Min" className="w-full border rounded-lg px-3 py-2" />
              <input type="number" value={ipoForm.priceMax ?? 0} onChange={(e) => setIpoForm({ ...ipoForm, priceMax: Number(e.target.value) })} placeholder="Price Max" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={ipoForm.lotSize ?? 0} onChange={(e) => setIpoForm({ ...ipoForm, lotSize: Number(e.target.value) })} placeholder="Lot Size" className="w-full border rounded-lg px-3 py-2" />
              <input value={ipoForm.issueSize ?? ''} onChange={(e) => setIpoForm({ ...ipoForm, issueSize: e.target.value })} placeholder="Issue Size" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <input value={ipoForm.sector ?? ''} onChange={(e) => setIpoForm({ ...ipoForm, sector: e.target.value })} placeholder="Sector" className="w-full border rounded-lg px-3 py-2" />
            <input value={ipoForm.listingAt ?? ''} onChange={(e) => setIpoForm({ ...ipoForm, listingAt: e.target.value })} placeholder="Listing At" className="w-full border rounded-lg px-3 py-2" />
            <input type="number" value={ipoForm.gmp ?? 0} onChange={(e) => setIpoForm({ ...ipoForm, gmp: Number(e.target.value) })} placeholder="GMP" className="w-full border rounded-lg px-3 py-2" />
            <input value={ipoForm.subscription ?? ''} onChange={(e) => setIpoForm({ ...ipoForm, subscription: e.target.value })} placeholder="Subscription" className="w-full border rounded-lg px-3 py-2" />
            <textarea value={ipoForm.description ?? ''} onChange={(e) => setIpoForm({ ...ipoForm, description: e.target.value })} placeholder="Description" rows={4} className="w-full border rounded-lg px-3 py-2" />
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="flex-1 bg-[#1a3a5c] text-white rounded-lg py-2.5 font-medium disabled:opacity-60">{ipoForm.id ? 'Update IPO' : 'Create IPO'}</button>
              <button type="button" onClick={() => setIpoForm(initialIpoForm)} className="border border-gray-200 rounded-lg px-4 py-2">Reset</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'brokers' && (
        <div className="grid xl:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Broker Records</h2>
            <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
              {brokers.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.type} • {item.brokerage}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setBrokerForm({ ...item, features: item.features ?? '' })} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Edit</button>
                      <button onClick={() => deleteRecord('/brokers', item.id)} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={saveBroker} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
            <h3 className="text-lg font-semibold">{brokerForm.id ? 'Edit Broker' : 'Add Broker'}</h3>
            <input value={brokerForm.name ?? ''} onChange={(e) => setBrokerForm({ ...brokerForm, name: e.target.value })} placeholder="Broker name" className="w-full border rounded-lg px-3 py-2" />
            <div className="grid grid-cols-2 gap-3">
              <select value={brokerForm.type ?? 'DISCOUNT'} onChange={(e) => setBrokerForm({ ...brokerForm, type: e.target.value as 'DISCOUNT' | 'FULL_SERVICE' })} className="w-full border rounded-lg px-3 py-2">
                <option value="DISCOUNT">DISCOUNT</option>
                <option value="FULL_SERVICE">FULL_SERVICE</option>
              </select>
              <input value={brokerForm.brokerage ?? ''} onChange={(e) => setBrokerForm({ ...brokerForm, brokerage: e.target.value })} placeholder="Brokerage" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <input value={brokerForm.accountOpening ?? ''} onChange={(e) => setBrokerForm({ ...brokerForm, accountOpening: e.target.value })} placeholder="Account Opening" className="w-full border rounded-lg px-3 py-2" />
            <input type="number" step="0.1" value={brokerForm.rating ?? 4.5} onChange={(e) => setBrokerForm({ ...brokerForm, rating: Number(e.target.value) })} placeholder="Rating" className="w-full border rounded-lg px-3 py-2" />
            <input value={brokerForm.website ?? ''} onChange={(e) => setBrokerForm({ ...brokerForm, website: e.target.value })} placeholder="Website" className="w-full border rounded-lg px-3 py-2" />
            <input value={brokerForm.features ?? ''} onChange={(e) => setBrokerForm({ ...brokerForm, features: e.target.value })} placeholder="Features (comma separated)" className="w-full border rounded-lg px-3 py-2" />
            <textarea value={brokerForm.pros ?? ''} onChange={(e) => setBrokerForm({ ...brokerForm, pros: e.target.value })} placeholder="Pros" rows={3} className="w-full border rounded-lg px-3 py-2" />
            <textarea value={brokerForm.cons ?? ''} onChange={(e) => setBrokerForm({ ...brokerForm, cons: e.target.value })} placeholder="Cons" rows={3} className="w-full border rounded-lg px-3 py-2" />
            <div className="flex gap-3">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!brokerForm.featured} onChange={(e) => setBrokerForm({ ...brokerForm, featured: e.target.checked })} /> Featured</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!brokerForm.popular} onChange={(e) => setBrokerForm({ ...brokerForm, popular: e.target.checked })} /> Popular</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="flex-1 bg-[#1a3a5c] text-white rounded-lg py-2.5 font-medium disabled:opacity-60">{brokerForm.id ? 'Update Broker' : 'Create Broker'}</button>
              <button type="button" onClick={() => setBrokerForm(initialBrokerForm)} className="border border-gray-200 rounded-lg px-4 py-2">Reset</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="grid xl:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Report Records</h2>
            <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
              {reports.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.category} • {item.published ? 'Published' : 'Draft'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setReportForm({ ...item, summary: item.summary ?? '', content: item.content ?? '' })} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Edit</button>
                      <button onClick={() => deleteRecord('/reports', item.id)} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={saveReport} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
            <h3 className="text-lg font-semibold">{reportForm.id ? 'Edit Report' : 'Add Report'}</h3>
            <input value={reportForm.title ?? ''} onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })} placeholder="Report title" className="w-full border rounded-lg px-3 py-2" />
            <select value={reportForm.category ?? 'IPO'} onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })} className="w-full border rounded-lg px-3 py-2">
              <option value="IPO">IPO</option>
              <option value="BROKER">BROKER</option>
              <option value="MARKET">MARKET</option>
              <option value="OTHER">OTHER</option>
            </select>
            <textarea value={reportForm.summary ?? ''} onChange={(e) => setReportForm({ ...reportForm, summary: e.target.value })} placeholder="Summary" rows={3} className="w-full border rounded-lg px-3 py-2" />
            <textarea value={reportForm.content ?? ''} onChange={(e) => setReportForm({ ...reportForm, content: e.target.value })} placeholder="Full content" rows={6} className="w-full border rounded-lg px-3 py-2" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!reportForm.published} onChange={(e) => setReportForm({ ...reportForm, published: e.target.checked })} /> Published</label>
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="flex-1 bg-[#1a3a5c] text-white rounded-lg py-2.5 font-medium disabled:opacity-60">{reportForm.id ? 'Update Report' : 'Create Report'}</button>
              <button type="button" onClick={() => setReportForm(initialReportForm)} className="border border-gray-200 rounded-lg px-4 py-2">Reset</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="grid xl:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Alert Records</h2>
            <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
              {alerts.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <button onClick={() => deleteRecord('/alerts', item.id)} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={saveAlert} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
            <h3 className="text-lg font-semibold">Create Alert</h3>
            <input value={alertForm.title ?? ''} onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })} placeholder="Alert title" className="w-full border rounded-lg px-3 py-2" />
            <select value={alertForm.category ?? 'IPO'} onChange={(e) => setAlertForm({ ...alertForm, category: e.target.value })} className="w-full border rounded-lg px-3 py-2">
              <option value="IPO">IPO</option>
              <option value="MARKET">MARKET</option>
              <option value="NCD">NCD</option>
              <option value="GENERAL">GENERAL</option>
            </select>
            <input type="datetime-local" value={alertForm.alertDate ? new Date(alertForm.alertDate).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)} onChange={(e) => setAlertForm({ ...alertForm, alertDate: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
            <textarea value={alertForm.message ?? ''} onChange={(e) => setAlertForm({ ...alertForm, message: e.target.value })} placeholder="Alert message" rows={5} className="w-full border rounded-lg px-3 py-2" />
            <button type="submit" disabled={loading} className="w-full bg-[#1a3a5c] text-white rounded-lg py-2.5 font-medium disabled:opacity-60">Create Alert</button>
          </form>
        </div>
      )}
    </div>
  );
}
