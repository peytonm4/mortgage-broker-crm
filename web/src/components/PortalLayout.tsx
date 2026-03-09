import { useState } from 'react'
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { Home, FileText, User, LogOut, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { to: '/portal', icon: Home, label: 'Dashboard' },
  { to: '/portal/application', icon: FileText, label: 'My Application' },
]

export function PortalLayout() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Preserve applicationId across nav links
  const applicationId = searchParams.get('applicationId')
  const qs = applicationId ? `?applicationId=${applicationId}` : ''

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-primary-foreground">
              <Home className="h-6 w-6" />
              <span className="text-xl font-bold">One Community Mortgage</span>
            </Link>
            <span className="hidden sm:inline text-primary-foreground/60">|</span>
            <span className="hidden sm:inline text-sm font-medium text-primary-foreground/90">
              Borrower Portal
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-sm text-primary-foreground/90">
              <User className="h-4 w-4" />
              <span>My Account</span>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/">
                <LogOut className="h-4 w-4 mr-1.5" />
                <span className="hidden sm:inline">Exit Portal</span>
              </Link>
            </Button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 rounded-md hover:bg-primary-foreground/10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav row */}
      <div className={cn(
        'md:hidden border-b bg-background overflow-hidden transition-all duration-200',
        mobileOpen ? 'max-h-16' : 'max-h-0 border-b-0'
      )}>
        <div className="flex gap-2 px-4 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={`${item.to}${qs}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar — hidden on mobile */}
          <aside className="hidden md:block w-56 shrink-0">
            <nav className="space-y-1 sticky top-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={`${item.to}${qs}`}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
