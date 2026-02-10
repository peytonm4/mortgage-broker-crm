import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { leadsApi } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect } from '@/components/ui/select'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import { formatCurrency, formatRelativeDate } from '@/lib/utils'
import { Plus, Search } from 'lucide-react'

const statuses = ['', 'New', 'Contacted', 'InProgress', 'Funded', 'Lost']

export function Leads() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads', search, statusFilter],
    queryFn: () =>
      leadsApi.getAll({
        search: search || undefined,
        status: statusFilter || undefined,
      }),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      leadsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
    onSettled: () => {
      setUpdatingLeadId(null)
    },
  })

  const handleStatusChange = (leadId: string, newStatus: string) => {
    setUpdatingLeadId(leadId)
    updateStatusMutation.mutate({ id: leadId, status: newStatus })
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage your loan pipeline</p>
        </div>
        <Button asChild>
          <Link to="/crm/leads/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <NativeSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40"
            >
              <option value="">All Statuses</option>
              {statuses.slice(1).map((status) => (
                <option key={status} value={status}>
                  {status === 'InProgress' ? 'In Progress' : status}
                </option>
              ))}
            </NativeSelect>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded animate-pulse" />
              ))}
            </div>
          ) : !leads?.length ? (
            <div className="text-center py-8 text-muted-foreground">
              {search || statusFilter
                ? 'No leads found matching your filters'
                : 'No leads yet. Add your first lead!'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Referred By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Link
                        to={`/leads/${lead.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {lead.fullName}
                      </Link>
                      {lead.email && (
                        <div className="text-sm text-muted-foreground">{lead.email}</div>
                      )}
                    </TableCell>
                    <TableCell>{lead.loanType}</TableCell>
                    <TableCell>{formatCurrency(lead.loanAmount)}</TableCell>
                    <TableCell>
                      {lead.partnerName ? (
                        <Link
                          to={`/crm/partners/${lead.partnerId}`}
                          className="text-primary hover:underline"
                        >
                          {lead.partnerName}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">Direct</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="relative inline-block">
                        <NativeSelect
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="w-32 h-8 text-xs"
                          disabled={updatingLeadId === lead.id}
                        >
                          {statuses.slice(1).map((status) => (
                            <option key={status} value={status}>
                              {status === 'InProgress' ? 'In Progress' : status}
                            </option>
                          ))}
                        </NativeSelect>
                        {updatingLeadId === lead.id && (
                          <Spinner className="absolute right-6 top-1/2 -translate-y-1/2" size="sm" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatRelativeDate(lead.updatedAt)}
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
