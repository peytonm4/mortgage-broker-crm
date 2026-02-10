import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { pipelineApi } from '@/api/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, FileText } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  Received: 'bg-blue-100 text-blue-800',
  InReview: 'bg-yellow-100 text-yellow-800',
  NeedsDocs: 'bg-orange-100 text-orange-800',
  Submitted: 'bg-purple-100 text-purple-800',
  Closed: 'bg-green-100 text-green-800',
  Denied: 'bg-red-100 text-red-800',
}

const STATUSES = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Received', label: 'Received' },
  { value: 'InReview', label: 'In Review' },
  { value: 'NeedsDocs', label: 'Needs Documents' },
  { value: 'Submitted', label: 'Submitted' },
  { value: 'Closed', label: 'Closed' },
  { value: 'Denied', label: 'Denied' },
]

export function Pipeline() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data: applications, isLoading } = useQuery({
    queryKey: ['pipeline', statusFilter, search],
    queryFn: () => pipelineApi.list({
      status: statusFilter === 'all' ? undefined : statusFilter,
      search: search || undefined
    }),
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Loan Pipeline</h1>
        <p className="text-muted-foreground">Manage loan applications from borrowers</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by borrower name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded" />
              ))}
            </div>
          ) : !applications || applications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No applications found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <Link
                        to={`/crm/pipeline/${app.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {app.borrowerName}
                      </Link>
                      <div className="text-xs text-muted-foreground">{app.borrowerEmail}</div>
                    </TableCell>
                    <TableCell>{app.loanType}</TableCell>
                    <TableCell>{formatCurrency(app.loanAmount)}</TableCell>
                    <TableCell>
                      {app.propertyCity && app.propertyState
                        ? `${app.propertyCity}, ${app.propertyState}`
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[app.status] || 'bg-gray-100'}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {app.submittedAt
                        ? new Date(app.submittedAt).toLocaleDateString()
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
