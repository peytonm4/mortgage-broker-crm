import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Layouts
import { Layout } from '@/components/Layout'
import { PublicLayout } from '@/components/PublicLayout'
import { PortalLayout } from '@/components/PortalLayout'

// Staff CRM Pages
import { Dashboard } from '@/pages/Dashboard'
import { Partners } from '@/pages/Partners'
import { PartnerDetail } from '@/pages/PartnerDetail'
import { PartnerForm } from '@/pages/PartnerForm'
import { Leads } from '@/pages/Leads'
import { LeadDetail } from '@/pages/LeadDetail'
import { LeadForm } from '@/pages/LeadForm'
import { Funded } from '@/pages/Funded'
import { Pipeline } from '@/pages/staff/Pipeline'
import { ApplicationDetail } from '@/pages/staff/ApplicationDetail'

// Public Pages
import { Home } from '@/pages/public/Home'
import { Apply } from '@/pages/public/Apply'
import { Privacy } from '@/pages/public/Privacy'
import { Terms } from '@/pages/public/Terms'

// Borrower Portal Pages
import { PortalDashboard } from '@/pages/portal/PortalDashboard'
import { ApplicationView } from '@/pages/portal/ApplicationView'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          {/* Borrower Portal */}
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<PortalDashboard />} />
            <Route path="application" element={<ApplicationView />} />
          </Route>

          {/* Staff CRM */}
          <Route path="/crm" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="partners" element={<Partners />} />
            <Route path="partners/new" element={<PartnerForm />} />
            <Route path="partners/:id" element={<PartnerDetail />} />
            <Route path="partners/:id/edit" element={<PartnerForm />} />
            <Route path="leads" element={<Leads />} />
            <Route path="leads/new" element={<LeadForm />} />
            <Route path="leads/:id" element={<LeadDetail />} />
            <Route path="leads/:id/edit" element={<LeadForm />} />
            <Route path="funded" element={<Funded />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="pipeline/:id" element={<ApplicationDetail />} />
          </Route>

          {/* Redirect old routes to new CRM routes */}
          <Route path="/partners/*" element={<Navigate to="/crm/partners" replace />} />
          <Route path="/leads/*" element={<Navigate to="/crm/leads" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
