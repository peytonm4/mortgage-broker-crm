import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { leadsApi } from '@/api/client'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency, formatRelativeDate } from '@/lib/utils'
import { Search, CheckCircle } from 'lucide-react'

export function Funded() {
  const [search, setSearch] = useState('')

  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads', search, 'Funded'],
    queryFn: () =>
      leadsApi.getAll({
        search: search || undefined,
        status: 'Funded',
      }),
  })

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funded Clients</h1>
          <p className="text-muted-foreground">
            Clients who have successfully closed their loans
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>{leads?.length ?? 0} funded</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search funded clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
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
              {search
                ? 'No funded clients found matching your search'
                : 'No funded clients yet'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Referred By</TableHead>
                  <TableHead>Funded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Link
                        to={`/crm/leads/${lead.id}`}
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
