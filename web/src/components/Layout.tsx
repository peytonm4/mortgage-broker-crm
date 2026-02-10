import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, Users, UserPlus, Home, FileStack, ExternalLink, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/crm', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/crm/partners', icon: Users, label: 'Partners' },
  { to: '/crm/leads', icon: UserPlus, label: 'Leads' },
  { to: '/crm/funded', icon: CheckCircle, label: 'Funded' },
  { to: '/crm/pipeline', icon: FileStack, label: 'Pipeline' },
]

export function Layout() {
  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background flex flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Home className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">Mortgage CRM</span>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            View Public Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
