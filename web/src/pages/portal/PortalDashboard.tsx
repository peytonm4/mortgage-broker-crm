import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { applicationsApi } from '@/api/client'
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  FileQuestion,
} from 'lucide-react'

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  Draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: FileText },
  Received: { label: 'Received', color: 'bg-blue-100 text-blue-800', icon: Clock },
  InReview: { label: 'In Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  NeedsDocs: { label: 'Documents Needed', color: 'bg-orange-100 text-orange-800', icon: FileQuestion },
  Submitted: { label: 'Submitted to Lender', color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
  Closed: { label: 'Closed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  Denied: { label: 'Denied', color: 'bg-red-100 text-red-800', icon: AlertCircle },
}

export function PortalDashboard() {
  const [searchParams] = useSearchParams()
  const applicationId = searchParams.get('applicationId')

  const { data: application, isLoading } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => (applicationId ? applicationsApi.get(applicationId) : null),
    enabled: !!applicationId,
  })

  const { data: docRequests } = useQuery({
    queryKey: ['doc-requests', applicationId],
    queryFn: () => (applicationId ? applicationsApi.getDocRequests(applicationId) : []),
    enabled: !!applicationId,
  })

  if (!applicationId) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Welcome to Your Portal</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Application Found</h2>
            <p className="text-muted-foreground mb-6">
              Start a new mortgage application to track your progress here.
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90"
            >
              Start Application
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <Card>
          <CardContent className="py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-8 w-48 bg-muted rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Application Not Found</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              We couldn't find an application with that ID.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusConfig = STATUS_CONFIG[application.status] || STATUS_CONFIG.Draft
  const StatusIcon = statusConfig.icon
  const pendingDocs = docRequests?.filter((d) => d.status === 'Pending') || []

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Application Dashboard</h1>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${statusConfig.color}`}>
              <StatusIcon className="h-6 w-6" />
            </div>
            <div>
              <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
              <p className="text-sm text-muted-foreground mt-1">
                {application.status === 'Received' &&
                  "We've received your application and are reviewing it."}
                {application.status === 'InReview' &&
                  'Your application is being reviewed by our team.'}
                {application.status === 'NeedsDocs' &&
                  'Please provide the requested documents below.'}
                {application.status === 'Submitted' &&
                  'Your application has been submitted to the lender.'}
                {application.status === 'Closed' && 'Congratulations! Your loan has been funded.'}
                {application.status === 'Denied' &&
                  'Unfortunately, your application was not approved.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Requests */}
      {pendingDocs.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileQuestion className="h-5 w-5 text-orange-600" />
              Documents Needed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Please provide the following documents to continue processing your application:
            </p>
            <ul className="space-y-3">
              {pendingDocs.map((doc) => {
                const partyLabels: Record<string, string> = {
                  Borrower: 'You',
                  Broker: 'Broker',
                  TitleCompany: 'Title Company',
                  Appraiser: 'Appraiser',
                }
                const partyLabel = partyLabels[doc.responsibleParty] || doc.responsibleParty
                return (
                  <li key={doc.id} className="flex items-start gap-3 p-3 bg-background rounded-md">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{doc.category}</span>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">{partyLabel}</Badge>
                      </div>
                      {doc.message && (
                        <p className="text-sm text-muted-foreground">{doc.message}</p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Document upload functionality coming soon. Please contact us at (555) 123-4567 to
              submit documents.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Loan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Loan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Loan Type</dt>
              <dd className="font-medium">{application.loanType}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Loan Amount</dt>
              <dd className="font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(application.loanAmount)}
              </dd>
            </div>
            {application.propertyCity && (
              <div>
                <dt className="text-muted-foreground">Property Location</dt>
                <dd className="font-medium">
                  {application.propertyCity}, {application.propertyState}
                </dd>
              </div>
            )}
            <div>
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our team is here to help you through the process. Contact us anytime.
          </p>
          <div className="flex gap-4">
            <a
              href="tel:5551234567"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Call (555) 123-4567
            </a>
            <a
              href="mailto:support@homeloanpro.com"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Email Support
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
