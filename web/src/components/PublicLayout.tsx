import { Link, Outlet } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { GOLD_BUTTON_CLASSES } from '@/lib/constants'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar — logo + login */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo_gold_isolated.png" alt="" className="h-9" />
            <div className="leading-tight">
              <span className="text-sm font-serif font-bold tracking-wider text-[#0B1D3A] block">ONE COMMUNITY</span>
              <span className="text-[10px] font-serif tracking-[0.25em] text-[#0B1D3A] block"><span className="font-bold">MORTGAGE</span></span>
            </div>
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
              className={`${GOLD_BUTTON_CLASSES} px-4 py-1.5 rounded text-sm font-semibold`}
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
              <div className="flex items-center gap-2 mb-3">
                <img src="/logo_gold_isolated.png" alt="" className="h-9" />
                <div className="leading-tight">
                  <span className="text-sm font-serif font-bold tracking-wider text-[#C9A84C] block">ONE COMMUNITY</span>
                  <span className="text-[10px] font-serif tracking-[0.25em] text-[#C9A84C] block"><span className="font-bold">MORT</span>GAGE</span>
                </div>
              </div>
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
                  <Phone className="h-4 w-4 shrink-0" />
                  623-694-2206
                </li>
                <li className="flex items-center gap-2 text-[#C8D5E3]">
                  <Mail className="h-4 w-4 shrink-0" />
                  austin@azmtg.net
                </li>
                <li className="flex items-start gap-2 text-[#C8D5E3]">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>701 E Carefree Highway<br />Phoenix, AZ 85085</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Equal Housing & Copyright */}
          <div className="border-t border-[#0B1D3A] mt-8 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-[#C8D5E3]">
                <img src="/equal-housing.svg" alt="Equal Housing Opportunity" className="h-8 w-8 invert opacity-70" />
                <span className="text-xs leading-tight">
                  Equal Housing Opportunity.<br />
                  All loans subject to credit approval.
                </span>
              </div>
              <p className="text-sm text-[#C8D5E3] text-center sm:text-right">
                © {new Date().getFullYear()} One Community Mortgage. All rights reserved.
                <br />
                <span className="text-xs">Company NMLS#158494 | BK#0910039</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
