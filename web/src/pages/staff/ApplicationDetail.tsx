import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { pipelineApi, type ResponsibleParty } from '@/api/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StatusDropdown } from '@/components/staff/StatusDropdown'
import { DocRequestModal } from '@/components/staff/DocRequestModal'
import { DocRequestList } from '@/components/staff/DocRequestList'
import { ArrowLeft, FileText, Plus } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

type TabType = 'overview' | 'documents'

export function ApplicationDetail() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [showDocModal, setShowDocModal] = useState(false)

  const { data: application, isLoading } = useQuery({
    queryKey: ['pipeline', id],
    queryFn: () => pipelineApi.get(id!),
    enabled: !!id,
  })

  const { data: docRequests } = useQuery({
    queryKey: ['pipeline', id, 'doc-requests'],
    queryFn: () => pipelineApi.getDocRequests(id!),
    enabled: !!id && activeTab === 'documents',
  })

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) => pipelineApi.updateStatus(id!, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipeline', id] })
      queryClient.invalidateQueries({ queryKey: ['pipeline'] })
    },
  })

  const createDocRequestMutation = useMutation({
    mutationFn: (data: { category: string; responsibleParty: ResponsibleParty; message: string }) =>
      pipelineApi.createDocRequest(id!, data.category, data.responsibleParty, data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipeline', id, 'doc-requests'] })
      queryClient.invalidateQueries({ queryKey: ['pipeline', id] })
      setShowDocModal(false)
    },
  })

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Application not found.</p>
      </div>
    )
  }

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: FileText, count: undefined },
    { id: 'documents' as const, label: 'Documents', icon: FileText, count: application.pendingDocRequestCount },
  ]

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/crm/pipeline"
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{application.borrower.fullName}</h1>
          <p className="text-muted-foreground">{application.borrower.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Status:</span>
          <StatusDropdown
            value={application.status}
            onChange={(status) => updateStatusMutation.mutate(status)}
            disabled={updateStatusMutation.isPending}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 border-b-2 -mb-px text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Borrower Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Borrower Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium">{application.borrower.fullName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-medium">{application.borrower.email}</dd>
                </div>
                {application.borrower.phone && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd className="font-medium">{application.borrower.phone}</dd>
                  </div>
                )}
                {application.borrower.ssnLast4 && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">SSN (last 4)</dt>
                    <dd className="font-medium">***-**-{application.borrower.ssnLast4}</dd>
                  </div>
                )}
                {application.borrower.streetAddress && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Address</dt>
                    <dd className="font-medium text-right">
                      {application.borrower.streetAddress}
                      <br />
                      {application.borrower.city}, {application.borrower.state}{' '}
                      {application.borrower.zipCode}
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Loan Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Loan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Type</dt>
                  <dd className="font-medium">{application.loanType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Amount</dt>
                  <dd className="font-medium">{formatCurrency(application.loanAmount)}</dd>
                </div>
                {application.propertyType && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Property Type</dt>
                    <dd className="font-medium">{application.propertyType}</dd>
                  </div>
                )}
                {application.propertyStreetAddress && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Property</dt>
                    <dd className="font-medium text-right">
                      {application.propertyStreetAddress}
                      <br />
                      {application.propertyCity}, {application.propertyState}{' '}
                      {application.propertyZipCode}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Submitted</dt>
                  <dd className="font-medium">
                    {application.submittedAt
                      ? new Date(application.submittedAt).toLocaleDateString()
                      : 'Not submitted'}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Application Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{application.docRequestCount}</div>
                  <div className="text-xs text-muted-foreground">Doc Requests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {application.pendingDocRequestCount}
                  </div>
                  <div className="text-xs text-muted-foreground">Pending Docs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'documents' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Document Requests</CardTitle>
            <Button size="sm" onClick={() => setShowDocModal(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Request Document
            </Button>
          </CardHeader>
          <CardContent>
            <DocRequestList applicationId={id!} docRequests={docRequests || []} />
          </CardContent>
        </Card>
      )}

      {/* Doc Request Modal */}
      {showDocModal && (
        <DocRequestModal
          onClose={() => setShowDocModal(false)}
          onSubmit={createDocRequestMutation.mutate}
          isSubmitting={createDocRequestMutation.isPending}
        />
      )}
    </div>
  )
}
