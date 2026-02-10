import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { applicationsApi } from '@/api/client'

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
        <h1 className="text-2xl font-bold">My Application</h1>
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Application</h1>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Full Name</dt>
              <dd className="font-medium">{borrower.fullName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{borrower.email}</dd>
            </div>
            {borrower.phone && (
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{borrower.phone}</dd>
              </div>
            )}
            {borrower.ssnLast4 && (
              <div>
                <dt className="text-muted-foreground">SSN (last 4)</dt>
                <dd className="font-medium">***-**-{borrower.ssnLast4}</dd>
              </div>
            )}
            {borrower.streetAddress && (
              <div className="md:col-span-2">
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
          <CardTitle className="text-base">Loan Details</CardTitle>
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
            {application.propertyType && (
              <div>
                <dt className="text-muted-foreground">Property Type</dt>
                <dd className="font-medium">{application.propertyType}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium">{application.status}</dd>
            </div>
            {application.propertyStreetAddress && (
              <div className="md:col-span-2">
                <dt className="text-muted-foreground">Property Address</dt>
                <dd className="font-medium">
                  {application.propertyStreetAddress}
                  {application.propertyCity && `, ${application.propertyCity}`}
                  {application.propertyState && `, ${application.propertyState}`}
                  {application.propertyZipCode && ` ${application.propertyZipCode}`}
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Application Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <div className="text-sm">
                <span className="font-medium">Application Started</span>
                <span className="text-muted-foreground ml-2">
                  {new Date(application.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {application.submittedAt && (
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <div className="text-sm">
                  <span className="font-medium">Application Submitted</span>
                  <span className="text-muted-foreground ml-2">
                    {new Date(application.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
