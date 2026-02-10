import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types - Existing CRM
export interface Partner {
  id: string
  name: string
  company: string | null
  type: string
  email: string | null
  phone: string | null
  lastContactedAt: string | null
  daysSinceContact: number | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface PartnerDetail extends Partner {
  totalLeads: number
  fundedLeads: number
  conversionRate: number
}

export interface Lead {
  id: string
  partnerId: string | null
  partnerName: string | null
  firstName: string
  lastName: string
  fullName: string
  email: string | null
  phone: string | null
  loanType: string
  loanAmount: number | null
  propertyAddress: string | null
  status: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  partnerId: string | null
  partnerName: string | null
  leadId: string | null
  leadName: string | null
  type: string
  description: string
  createdAt: string
}

export interface DashboardStats {
  totalLeads: number
  newLeads: number
  inProgressLeads: number
  fundedThisMonth: number
  activePartners: number
  totalPipelineValue: number
  leadsByStatus: { status: string; count: number }[]
  topPartners: { id: string; name: string; totalReferrals: number; fundedCount: number }[]
}

// Types - New Mortgage Platform
export interface BorrowerSummary {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string | null
  ssnLast4: string | null
  streetAddress: string | null
  city: string | null
  state: string | null
  zipCode: string | null
}

export interface Application {
  id: string
  borrowerId: string
  borrower: BorrowerSummary
  status: string
  loanType: string
  loanAmount: number
  propertyStreetAddress: string | null
  propertyCity: string | null
  propertyState: string | null
  propertyZipCode: string | null
  propertyType: string | null
  currentStep: number
  submittedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface PipelineApplication {
  id: string
  borrowerName: string
  borrowerEmail: string
  status: string
  loanType: string
  loanAmount: number
  propertyCity: string | null
  propertyState: string | null
  submittedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface PipelineDetail extends Application {
  docRequestCount: number
  pendingDocRequestCount: number
}

export type ResponsibleParty = 'Borrower' | 'Broker' | 'TitleCompany' | 'Appraiser'

export interface DocRequest {
  id: string
  category: string
  responsibleParty: string
  status: string
  message: string | null
  createdAt: string
}

export interface DocRequestDetail extends DocRequest {
  requestedByUserId: string
  requestedByEmail: string | null
  updatedAt: string
}

export interface StartApplicationResponse {
  applicationId: string
  borrowerId: string
  userId: string
}

// API functions - Existing CRM
export const partnersApi = {
  getAll: (search?: string) =>
    api.get<Partner[]>('/partners', { params: { search } }).then((r) => r.data),
  getById: (id: string) =>
    api.get<PartnerDetail>(`/partners/${id}`).then((r) => r.data),
  create: (data: Omit<Partner, 'id' | 'createdAt' | 'updatedAt' | 'lastContactedAt' | 'daysSinceContact'>) =>
    api.post<Partner>('/partners', data).then((r) => r.data),
  update: (id: string, data: Omit<Partner, 'id' | 'createdAt' | 'updatedAt' | 'lastContactedAt' | 'daysSinceContact'>) =>
    api.put<Partner>(`/partners/${id}`, data).then((r) => r.data),
  delete: (id: string) =>
    api.delete(`/partners/${id}`),
}

export const leadsApi = {
  getAll: (params?: { status?: string; partnerId?: string; search?: string }) =>
    api.get<Lead[]>('/leads', { params }).then((r) => r.data),
  getById: (id: string) =>
    api.get<Lead>(`/leads/${id}`).then((r) => r.data),
  create: (data: {
    partnerId?: string | null
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    loanType: string
    loanAmount?: number | null
    propertyAddress?: string | null
    notes?: string | null
  }) =>
    api.post<Lead>('/leads', data).then((r) => r.data),
  update: (id: string, data: {
    partnerId?: string | null
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    loanType: string
    loanAmount?: number | null
    propertyAddress?: string | null
    notes?: string | null
  }) =>
    api.put<Lead>(`/leads/${id}`, data).then((r) => r.data),
  updateStatus: (id: string, status: string) =>
    api.patch<Lead>(`/leads/${id}/status`, { status }).then((r) => r.data),
  delete: (id: string) =>
    api.delete(`/leads/${id}`),
}

export const activitiesApi = {
  getAll: (params?: { partnerId?: string; leadId?: string }) =>
    api.get<Activity[]>('/activities', { params }).then((r) => r.data),
  create: (data: { partnerId?: string | null; leadId?: string | null; type: string; description: string }) =>
    api.post<Activity>('/activities', data).then((r) => r.data),
}

export const dashboardApi = {
  getStats: () =>
    api.get<DashboardStats>('/dashboard/stats').then((r) => r.data),
}

// API functions - New Mortgage Platform (Borrower Flow)
export const applicationsApi = {
  start: (data: { firstName: string; lastName: string; email: string; phone?: string }) =>
    api.post<StartApplicationResponse>('/applications', data).then((r) => r.data),
  get: (id: string) =>
    api.get<Application>(`/applications/${id}`).then((r) => r.data),
  updateStep1: (id: string, data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    ssnLast4?: string
    streetAddress?: string
    city?: string
    state?: string
    zipCode?: string
  }) =>
    api.put<Application>(`/applications/${id}/step1`, data).then((r) => r.data),
  updateStep2: (id: string, data: {
    loanType: string
    loanAmount: number
    propertyStreetAddress?: string
    propertyCity?: string
    propertyState?: string
    propertyZipCode?: string
    propertyType?: string
  }) =>
    api.put<Application>(`/applications/${id}/step2`, data).then((r) => r.data),
  submit: (id: string) =>
    api.post<Application>(`/applications/${id}/submit`).then((r) => r.data),
  getDocRequests: (id: string) =>
    api.get<DocRequest[]>(`/applications/${id}/doc-requests`).then((r) => r.data),
}

// API functions - New Mortgage Platform (Staff Pipeline)
export const pipelineApi = {
  list: (params?: { status?: string; search?: string }) =>
    api.get<PipelineApplication[]>('/pipeline', { params }).then((r) => r.data),
  get: (id: string) =>
    api.get<PipelineDetail>(`/pipeline/${id}`).then((r) => r.data),
  updateStatus: (id: string, status: string) =>
    api.patch<PipelineApplication>(`/pipeline/${id}/status`, { status }).then((r) => r.data),
  createDocRequest: (id: string, category: string, responsibleParty: ResponsibleParty, message?: string) =>
    api.post<DocRequestDetail>(`/pipeline/${id}/doc-requests`, { category, responsibleParty, message }).then((r) => r.data),
  getDocRequests: (id: string) =>
    api.get<DocRequestDetail[]>(`/pipeline/${id}/doc-requests`).then((r) => r.data),
  updateDocRequestStatus: (id: string, status: string) =>
    api.patch<DocRequestDetail>(`/doc-requests/${id}/status`, { status }).then((r) => r.data),
}
