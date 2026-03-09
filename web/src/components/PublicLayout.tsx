import { Link, Outlet } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar — logo + login */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold tracking-widest text-[#0B1D3A] uppercase">
              One Community Mortgage
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Username"
              className="border rounded px-3 py-1.5 text-sm w-36 focus:outline-none focus:ring-1 focus:ring-[#0B1D3A]"
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded px-3 py-1.5 text-sm w-36 focus:outline-none focus:ring-1 focus:ring-[#0B1D3A]"
            />
            <Link
              to="/portal"
              className="bg-[#0B1D3A] text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-[#071428] transition-colors"
            >
              LOG IN
            </Link>
            <Link
              to="/apply"
              className="bg-[#C9A84C] text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-[#A8893D] transition-colors"
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="bg-[#0B1D3A]">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center gap-8">
          {[
            { label: 'BUY A HOME', to: '/apply' },
            { label: 'REFINANCE', to: '/apply' },
            { label: 'VIEW RATES', to: '/apply' },
            { label: 'FAQS', to: '/' },
            { label: 'CONTACT US', to: '/' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-white text-xs font-semibold tracking-widest hover:text-[#C9A84C] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#071428] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <span className="font-serif font-bold text-lg tracking-widest uppercase">One Community Mortgage</span>
              <p className="text-sm text-[#C8D5E3] mt-3">
                Your trusted mortgage partner for home purchases, refinancing, and more.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-[#C8D5E3] hover:text-white">Home</Link></li>
                <li><Link to="/apply" className="text-[#C8D5E3] hover:text-white">Apply Now</Link></li>
                <li><Link to="/portal" className="text-[#C8D5E3] hover:text-white">Check Application Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-[#C8D5E3] hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-[#C8D5E3] hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-[#C8D5E3]">
                  <Phone className="h-4 w-4" />
                  (555) 123-4567
                </li>
                <li className="flex items-center gap-2 text-[#C8D5E3]">
                  <Mail className="h-4 w-4" />
                  info@onecommunity.mortgage
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#0B1D3A] mt-8 pt-8 text-center text-sm text-[#C8D5E3]">
            © {new Date().getFullYear()} One Community Mortgage. All rights reserved. NMLS #123456
          </div>
        </div>
      </footer>
    </div>
  )
}
