import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a3a5c] text-blue-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">SURE Media</h3>
            <p className="text-sm leading-relaxed">
              India&apos;s trusted source for IPO information, stock broker reviews, and market insights.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">IPO</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ipos?type=MAINBOARD" className="hover:text-white">Mainboard IPO</Link></li>
              <li><Link href="/ipos?type=SME" className="hover:text-white">SME IPO</Link></li>
              <li><Link href="/ncds" className="hover:text-white">NCD Issues</Link></li>
              <li><Link href="/rights-issues" className="hover:text-white">Rights Issues</Link></li>
              <li><Link href="/buybacks" className="hover:text-white">Buybacks</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Brokers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/brokers" className="hover:text-white">Broker Reviews</Link></li>
              <li><Link href="/brokers/compare" className="hover:text-white">Compare Brokers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/reports" className="hover:text-white">Reports</Link></li>
              <li><Link href="/admin" className="hover:text-white">Admin Panel</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SURE Media. Market Intelligence Platform</p>
        </div>
      </div>
    </footer>
  );
}
