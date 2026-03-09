import { Link, Outlet } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar — logo + login */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold tracking-widest text-[#1F3A5F] uppercase">
              HomeLoan Pro
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Username"
              className="border rounded px-3 py-1.5 text-sm w-36 focus:outline-none focus:ring-1 focus:ring-[#1F3A5F]"
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded px-3 py-1.5 text-sm w-36 focus:outline-none focus:ring-1 focus:ring-[#1F3A5F]"
            />
            <Link
              to="/portal"
              className="bg-[#1F3A5F] text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-[#152A45] transition-colors"
            >
              LOG IN
            </Link>
            <Link
              to="/apply"
              className="bg-[#FFC145] text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-[#D99A17] transition-colors"
            >
              REGISTER
            </Link>
          </div>
        </div>
      </div>

      {/* Nav bar — dark green */}
      <nav className="bg-[#1F3A5F]">
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
              className="text-white text-xs font-semibold tracking-widest hover:text-[#FFC145] transition-colors"
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
      <footer className="bg-[#152A45] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <span className="font-serif font-bold text-lg tracking-widest uppercase">HomeLoan Pro</span>
              <p className="text-sm text-[#DCE6F2] mt-3">
                Your trusted mortgage partner for home purchases, refinancing, and more.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-[#DCE6F2] hover:text-white">Home</Link></li>
                <li><Link to="/apply" className="text-[#DCE6F2] hover:text-white">Apply Now</Link></li>
                <li><Link to="/portal" className="text-[#DCE6F2] hover:text-white">Check Application Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-[#DCE6F2] hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-[#DCE6F2] hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-[#DCE6F2]">
                  <Phone className="h-4 w-4" />
                  (555) 123-4567
                </li>
                <li className="flex items-center gap-2 text-[#DCE6F2]">
                  <Mail className="h-4 w-4" />
                  info@homeloanpro.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1F3A5F] mt-8 pt-8 text-center text-sm text-[#DCE6F2]">
            © {new Date().getFullYear()} HomeLoan Pro. All rights reserved. NMLS #123456
          </div>
        </div>
      </footer>
    </div>
  )
}
