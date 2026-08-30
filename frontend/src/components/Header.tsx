'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SearchBar from './SearchBar';

const navLinks = [
  { href: '/ipos', label: 'IPO' },
  { href: '/ipos?type=SME', label: 'SME IPO' },
  { href: '/ncds', label: 'NCD' },
  { href: '/rights-issues', label: 'Rights' },
  { href: '/buybacks', label: 'Buyback' },
  { href: '/brokers', label: 'Brokers' },
  { href: '/brokers/compare', label: 'Compare' },
  { href: '/reports', label: 'Reports' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#102b46] to-[#1a3f5c] text-white shadow-lg sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20 py-3 gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex flex-col items-center justify-center font-bold text-sm shadow-lg shadow-orange-500/25">
              <div className="leading-tight">SU</div>
              <div className="leading-tight">RE</div>
            </div>
            <div>
              <span className="font-bold text-lg leading-tight block">SURE Media</span>
              <span className="text-[10px] uppercase tracking-widest text-blue-200 font-semibold">Market Intel</span>
            </div>
          </Link>

          <div className="hidden xl:block flex-1">
            <SearchBar />
          </div>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname.startsWith(link.href.split('?')[0])
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 transition shadow-lg shadow-orange-500/25"
            >
              Admin
            </Link>
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1 border-t border-white/10 pt-4">
            <div className="px-2 mb-3">
              <SearchBar />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admin" className="px-3 py-2 rounded bg-orange-500 font-medium" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
