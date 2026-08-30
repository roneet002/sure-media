'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: number;
  name?: string;
  company?: string;
  title?: string;
  slug: string;
  type?: string;
  rating?: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    try {
      const [ipos, brokers, reports] = await Promise.all([
        fetch(`http://localhost:4000/api/ipos?search=${encodeURIComponent(q)}`).then(r => r.json()).catch(() => []),
        fetch(`http://localhost:4000/api/brokers?search=${encodeURIComponent(q)}`).then(r => r.json()).catch(() => []),
        fetch(`http://localhost:4000/api/reports?search=${encodeURIComponent(q)}`).then(r => r.json()).catch(() => []),
      ]);

      const combined = [
        ...(Array.isArray(ipos) ? ipos.map(item => ({ ...item, type: 'IPO' })) : []),
        ...(Array.isArray(brokers) ? brokers.map(item => ({ ...item, type: 'Broker' })) : []),
        ...(Array.isArray(reports) ? reports.map(item => ({ ...item, type: 'Report' })) : []),
      ];

      setResults(combined.slice(0, 8));
    } catch (error) {
      console.error('Search failed:', error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  const handleSelect = (result: SearchResult) => {
    let path = '/';
    if (result.type === 'IPO') path = `/ipos/${result.slug}`;
    else if (result.type === 'Broker') path = `/brokers/${result.slug}`;
    else if (result.type === 'Report') path = `/reports/${result.slug}`;
    
    router.push(path);
    setQuery('');
    setIsOpen(false);
    setResults([]);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <div className="rounded-full bg-white/10 border border-white/10 px-3 py-2 text-sm text-blue-100 flex items-center gap-2">
          <span className="text-base">⌕</span>
          <input
            type="text"
            placeholder="Search IPO, broker..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => query && setIsOpen(true)}
            className="bg-transparent w-full text-sm text-white placeholder:text-blue-200 outline-none"
          />
        </div>

        {isOpen && results.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
            {results.map((result, idx) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition"
              >
                <div className="font-medium text-gray-900">
                  {result.company || result.name || result.title}
                </div>
                <div className="text-xs text-gray-500">
                  {result.type} {result.rating && `• Rating: ${result.rating}/5`}
                </div>
              </button>
            ))}
          </div>
        )}

        {isOpen && query && results.length === 0 && (
          <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
            <p className="text-sm text-gray-500 text-center">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}
