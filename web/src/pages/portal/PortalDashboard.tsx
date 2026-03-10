import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { applicationsApi } from '@/api/client'
import { cn } from '@/lib/utils'
import { formatCurrency, formatDate, formatRelativeDate } from '@/lib/utils'
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  FileQuestion,
  DollarSign,
  CalendarDays,
  ClipboardList,
  Inbox,
  Send,
  XCircle,
  Check,
  AlertTriangle,
  Phone,
  Mail,
  HelpCircle,
  Building2,
  Receipt,
  FileCheck,
  CreditCard,
} from 'lucide-react'
import { APPLICATION_STATUS_CONFIG, RESPONSIBLE_PARTY_LABELS } from '@/lib/constants'

// ─── Portal-specific status config (extends base with icon + subtitle) ──────

const STATUS_CONFIG: Record<
  string,
  {
    label: string
    color: string
    icon: React.ComponentType<{ className?: string }>
    subtitle: string
  }
> = {
  Draft: {
    ...APPLICATION_STATUS_CONFIG['Draft'],
    icon: FileText,
    subtitle: 'Your application is still in draft.',
  },
  Received: {
    ...APPLICATION_STATUS_CONFIG['Received'],
    icon: Clock,
    subtitle: "We've received your application and are getting started.",
  },
  InReview: {
    ...APPLICATION_STATUS_CONFIG['InReview'],
    icon: Clock,
    subtitle: 'Your application is being reviewed by our team.',
  },
  NeedsDocs: {
    ...APPLICATION_STATUS_CONFIG['NeedsDocs'],
    icon: FileQuestion,
    subtitle: 'We need a few documents from you to continue.',
  },
  Submitted: {
    ...APPLICATION_STATUS_CONFIG['Submitted'],
    icon: CheckCircle,
    subtitle: 'Your application has been sent to the lender for final review.',
  },
  Closed: {
    ...APPLICATION_STATUS_CONFIG['Closed'],
    icon: CheckCircle,
    subtitle: 'Congratulations! Your loan has been funded.',
  },
  Denied: {
    ...APPLICATION_STATUS_CONFIG['Denied'],
    icon: AlertCircle,
    subtitle: 'Unfortunately, your application was not approved.',
  },
}

// ─── Progress steps ──────────────────────────────────────────────────────────

const PROGRESS_STEPS = [
  { key: 'Received', label: 'Received', icon: Inbox },
  { key: 'InReview', label: 'In Review', icon: ClipboardList },
  { key: 'Submitted', label: 'Submitted', icon: Send },
  { key: 'Closed', label: 'Closed', icon: CheckCircle },
] as const

const STATUS_ORDER: Record<string, number> = {
  Draft: -1,
  Received: 0,
  InReview: 1,
  NeedsDocs: 1, // same visual position as InReview
  Submitted: 2,
  Closed: 3,
  Denied: -2,
}

// ─── Doc category icon map ───────────────────────────────────────────────────

const DOC_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  PayStubs: Receipt,
  W2s: Building2,
  TaxReturns: FileCheck,
  BankStatements: CreditCard,
  IdentificationDocuments: FileText,
}

// ─── Component ───────────────────────────────────────────────────────────────

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

  // ── No application ──────────────────────────────────────────────────────

  if (!applicationId) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground">
          <h1 className="text-2xl font-bold mb-2">Welcome to Your Portal</h1>
          <p className="text-primary-foreground/80">
            Start a mortgage application to track your progress here.
          </p>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Application Found</h2>
            <p className="text-muted-foreground mb-6">
              Start a new mortgage application to track your progress here.
            </p>
            <Button asChild size="lg">
              <Link to="/apply">
                Start Application
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Loading ─────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-8">
          <div className="h-7 w-64 bg-primary-foreground/20 animate-pulse rounded" />
          <div className="h-5 w-80 bg-primary-foreground/10 animate-pulse rounded mt-3" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="py-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 w-16 bg-muted rounded" />
                  <div className="h-8 w-24 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // ── Not found ───────────────────────────────────────────────────────────

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

  // ── Derived data ────────────────────────────────────────────────────────

  const statusConfig = STATUS_CONFIG[application.status] || STATUS_CONFIG.Draft
  const pendingDocs = docRequests?.filter((d) => d.status === 'Pending') || []
  const fulfilledDocs = docRequests?.filter((d) => d.status === 'Fulfilled') || []
  const allDocs = [...pendingDocs, ...fulfilledDocs]
  const currentStepIndex = STATUS_ORDER[application.status] ?? -1
  const isDenied = application.status === 'Denied'

  const daysSinceSubmission = application.submittedAt
    ? Math.floor(
        (Date.now() - new Date(application.submittedAt).getTime()) / (1000 * 60 * 60 * 24)
      )
    : null

  const firstName = application.borrower?.firstName || 'there'

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ──────────────────────────────────────────── */}
      <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-6 md:p-8 text-primary-foreground">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">
          Welcome back, {firstName}
        </h1>
        <p className="text-primary-foreground/80 text-sm md:text-base">
          {statusConfig.subtitle}
        </p>
      </div>

      {/* ── Progress Tracker ────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Application Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop: horizontal stepper */}
          <div className="hidden sm:flex items-center justify-between">
            {PROGRESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon
              const isCompleted = !isDenied && currentStepIndex > idx
              const isCurrent = !isDenied && currentStepIndex === idx
              const isWarning = isCurrent && application.status === 'NeedsDocs'

              return (
                <div key={step.key} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                        isCompleted && 'bg-primary text-primary-foreground',
                        isCurrent && !isWarning && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                        isCurrent && isWarning && 'bg-orange-500 text-white ring-4 ring-orange-200',
                        isDenied && idx === 0 && 'bg-red-500 text-white',
                        !isCompleted && !isCurrent && !isDenied && 'bg-muted text-muted-foreground',
                        isDenied && idx > 0 && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : isDenied && idx === 0 ? (
                        <XCircle className="h-5 w-5" />
                      ) : isWarning ? (
                        <AlertTriangle className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs mt-2 font-medium whitespace-nowrap',
                        (isCompleted || isCurrent) && !isDenied && 'text-primary',
                        isDenied && idx === 0 && 'text-red-600',
                        !isCompleted && !isCurrent && 'text-muted-foreground'
                      )}
                    >
                      {isDenied && idx === 0 ? 'Denied' : step.label}
                    </span>
                  </div>
                  {idx < PROGRESS_STEPS.length - 1 && (
                    <div
                      className={cn(
                        'flex-1 h-1 mx-3 rounded-full transition-colors',
                        !isDenied && currentStepIndex > idx ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile: vertical stepper */}
          <div className="sm:hidden space-y-3">
            {PROGRESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon
              const isCompleted = !isDenied && currentStepIndex > idx
              const isCurrent = !isDenied && currentStepIndex === idx
              const isWarning = isCurrent && application.status === 'NeedsDocs'

              return (
                <div key={step.key} className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all',
                      isCompleted && 'bg-primary text-primary-foreground',
                      isCurrent && !isWarning && 'bg-primary text-primary-foreground ring-2 ring-primary/20',
                      isCurrent && isWarning && 'bg-orange-500 text-white ring-2 ring-orange-200',
                      isDenied && idx === 0 && 'bg-red-500 text-white',
                      !isCompleted && !isCurrent && !isDenied && 'bg-muted text-muted-foreground',
                      isDenied && idx > 0 && 'bg-muted text-muted-foreground'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : isDenied && idx === 0 ? (
                      <XCircle className="h-4 w-4" />
                    ) : isWarning ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <StepIcon className="h-4 w-4" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      (isCompleted || isCurrent) && !isDenied && 'text-foreground',
                      isDenied && idx === 0 && 'text-red-600',
                      !isCompleted && !isCurrent && 'text-muted-foreground'
                    )}
                  >
                    {isDenied && idx === 0 ? 'Denied' : step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── Quick Stats Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="py-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Loan Amount
                </p>
                <p className="text-xl font-bold">{formatCurrency(application.loanAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="py-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <CalendarDays className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {daysSinceSubmission !== null ? 'Days Since Submission' : 'Submitted'}
                </p>
                <p className="text-xl font-bold">
                  {daysSinceSubmission !== null ? daysSinceSubmission : 'Pending'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn('border-l-4', pendingDocs.length > 0 ? 'border-l-orange-500' : 'border-l-green-500')}>
          <CardContent className="py-5">
            <div className="flex items-center gap-3">
              <div className={cn(
                'p-2 rounded-lg',
                pendingDocs.length > 0 ? 'bg-orange-500/10' : 'bg-green-500/10'
              )}>
                <FileQuestion className={cn(
                  'h-5 w-5',
                  pendingDocs.length > 0 ? 'text-orange-500' : 'text-green-500'
                )} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Pending Documents
                </p>
                <p className="text-xl font-bold">{pendingDocs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Document Requests ───────────────────────────────────────── */}
      {allDocs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Document Requests
              {pendingDocs.length > 0 && (
                <Badge className="bg-orange-100 text-orange-800 ml-auto">
                  {pendingDocs.length} pending
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {allDocs.map((doc) => {
                const isPending = doc.status === 'Pending'
                const DocIcon = DOC_ICON[doc.category] || FileText
                const partyLabel = RESPONSIBLE_PARTY_LABELS[doc.responsibleParty] || doc.responsibleParty

                return (
                  <li
                    key={doc.id}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                      isPending ? 'bg-orange-50/50 border-orange-200' : 'bg-green-50/50 border-green-200'
                    )}
                  >
                    <div className={cn(
                      'p-2 rounded-lg shrink-0 mt-0.5',
                      isPending ? 'bg-orange-100' : 'bg-green-100'
                    )}>
                      <DocIcon className={cn(
                        'h-4 w-4',
                        isPending ? 'text-orange-600' : 'text-green-600'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">{doc.category}</span>
                        <Badge className={cn(
                          'text-xs',
                          isPending ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        )}>
                          {isPending ? 'Pending' : 'Fulfilled'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {partyLabel}
                        </Badge>
                      </div>
                      {doc.message && (
                        <p className="text-sm text-muted-foreground mt-1">{doc.message}</p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
            {pendingDocs.length > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  To submit documents, please contact us at{' '}
                  <a href="tel:6236942206" className="font-medium text-primary hover:underline">
                    623-694-2206
                  </a>{' '}
                  or email{' '}
                  <a href="mailto:austin@azmtg.net" className="font-medium text-primary hover:underline">
                    austin@azmtg.net
                  </a>
                  . Online upload coming soon.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Loan Summary ────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Loan Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Loan Type</dt>
                <dd className="font-medium text-sm">{application.loanType}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Loan Amount</dt>
                <dd className="font-medium text-sm">{formatCurrency(application.loanAmount)}</dd>
              </div>
            </div>
            {application.propertyCity && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Property Location</dt>
                  <dd className="font-medium text-sm">
                    {application.propertyCity}, {application.propertyState}
                  </dd>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Submitted</dt>
                <dd className="font-medium text-sm">
                  {application.submittedAt ? formatDate(application.submittedAt) : 'Not submitted'}
                </dd>
              </div>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* ── Help / Contact ──────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our team is here to help you through every step. Reach out anytime.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <a href="tel:6236942206">
                <Phone className="h-4 w-4 mr-2" />
                623-694-2206
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:austin@azmtg.net">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </a>
            </Button>
          </div>

          {/* What to expect */}
          <div className="border-t pt-4 mt-4">
            <h4 className="text-sm font-medium mb-3">What to Expect</h4>
            <div className="space-y-3">
              {[
                { q: 'How long does review take?', a: 'Most applications are reviewed within 24-48 hours.' },
                { q: 'What if documents are needed?', a: "We'll notify you here and via email with exactly what's required." },
                { q: 'When will I get a decision?', a: 'After review and document verification, you\'ll receive a decision via email and in your portal.' },
              ].map((item) => (
                <div key={item.q} className="text-sm">
                  <p className="font-medium">{item.q}</p>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
