import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { applicationsApi } from '@/api/client'
import { formatCurrency, formatDate, formatRelativeDate } from '@/lib/utils'
import {
  User,
  DollarSign,
  MapPin,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  FileQuestion,
} from 'lucide-react'

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  Draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  Received: { label: 'Received', color: 'bg-blue-100 text-blue-800' },
  InReview: { label: 'In Review', color: 'bg-yellow-100 text-yellow-800' },
  NeedsDocs: { label: 'Documents Needed', color: 'bg-orange-100 text-orange-800' },
  Submitted: { label: 'Submitted to Lender', color: 'bg-purple-100 text-purple-800' },
  Closed: { label: 'Closed', color: 'bg-green-100 text-green-800' },
  Denied: { label: 'Denied', color: 'bg-red-100 text-red-800' },
}

export function ApplicationView() {
  const [searchParams] = useSearchParams()
  const applicationId = searchParams.get('applicationId')

  const { data: application, isLoading } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => (applicationId ? applicationsApi.get(applicationId) : null),
    enabled: !!applicationId,
  })

  if (!applicationId) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Application</h1>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No application selected.
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <Card>
          <CardContent className="py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-4 w-48 bg-muted rounded" />
              <div className="h-4 w-40 bg-muted rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Application</h1>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Application not found.
          </CardContent>
        </Card>
      </div>
    )
  }

  const borrower = application.borrower
  const statusConfig = STATUS_CONFIG[application.status] || STATUS_CONFIG.Draft

  // Build timeline events
  const timelineEvents: { label: string; date: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    {
      label: 'Application Started',
      date: application.createdAt,
      icon: FileText,
      color: 'bg-primary',
    },
  ]
  if (application.submittedAt) {
    timelineEvents.push({
      label: 'Application Submitted',
      date: application.submittedAt,
      icon: CheckCircle,
      color: 'bg-primary',
    })
  }
  if (application.status === 'NeedsDocs') {
    timelineEvents.push({
      label: 'Documents Requested',
      date: application.updatedAt,
      icon: FileQuestion,
      color: 'bg-orange-500',
    })
  }
  if (application.status === 'Closed') {
    timelineEvents.push({
      label: 'Loan Funded',
      date: application.updatedAt,
      icon: CheckCircle,
      color: 'bg-green-500',
    })
  }
  if (application.status === 'Denied') {
    timelineEvents.push({
      label: 'Application Denied',
      date: application.updatedAt,
      icon: AlertCircle,
      color: 'bg-red-500',
    })
  }

  const hasProperty = application.propertyStreetAddress || application.propertyCity

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-bold">{borrower.fullName}</h1>
        <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
            <div className="flex justify-between md:block">
              <dt className="text-muted-foreground">Full Name</dt>
              <dd className="font-medium">{borrower.fullName}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{borrower.email}</dd>
            </div>
            {borrower.phone && (
              <div className="flex justify-between md:block">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{borrower.phone}</dd>
              </div>
            )}
            {borrower.ssnLast4 && (
              <div className="flex justify-between md:block">
                <dt className="text-muted-foreground">SSN (last 4)</dt>
                <dd className="font-medium">***-**-{borrower.ssnLast4}</dd>
              </div>
            )}
            {borrower.streetAddress && (
              <div className="md:col-span-2 flex justify-between md:block">
                <dt className="text-muted-foreground">Address</dt>
                <dd className="font-medium">
                  {borrower.streetAddress}
                  {borrower.city && `, ${borrower.city}`}
                  {borrower.state && `, ${borrower.state}`}
                  {borrower.zipCode && ` ${borrower.zipCode}`}
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Loan Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            Loan Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
            <div className="flex justify-between md:block">
              <dt className="text-muted-foreground">Loan Type</dt>
              <dd className="font-medium">{application.loanType}</dd>
            </div>
            <div className="flex justify-between md:block">
              <dt className="text-muted-foreground">Loan Amount</dt>
              <dd className="font-medium">{formatCurrency(application.loanAmount)}</dd>
            </div>
            {application.propertyType && (
              <div className="flex justify-between md:block">
                <dt className="text-muted-foreground">Property Type</dt>
                <dd className="font-medium">{application.propertyType}</dd>
              </div>
            )}
            <div className="flex justify-between md:block">
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Property Card */}
      {hasProperty && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Property Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p className="font-medium">
                {application.propertyStreetAddress}
              </p>
              <p className="text-muted-foreground">
                {application.propertyCity && application.propertyCity}
                {application.propertyState && `, ${application.propertyState}`}
                {application.propertyZipCode && ` ${application.propertyZipCode}`}
              </p>
              {application.propertyType && (
                <Badge variant="outline" className="mt-2">{application.propertyType}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Application Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-muted" />

            <div className="space-y-6">
              {timelineEvents.map((event, idx) => {
                const EventIcon = event.icon
                return (
                  <div key={idx} className="relative flex items-start gap-3">
                    {/* Dot on the line */}
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full ${event.color} flex items-center justify-center ring-4 ring-background`}
                    >
                      <EventIcon className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{event.label}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(event.date)}</span>
                        <span className="text-muted-foreground/60">
                          ({formatRelativeDate(event.date)})
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
