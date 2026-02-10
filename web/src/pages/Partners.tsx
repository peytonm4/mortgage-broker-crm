import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { partnersApi } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { HealthIndicator } from '@/components/HealthIndicator'
import { Plus, Search } from 'lucide-react'

export function Partners() {
  const [search, setSearch] = useState('')

  const { data: partners, isLoading } = useQuery({
    queryKey: ['partners', search],
    queryFn: () => partnersApi.getAll(search || undefined),
  })

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partners</h1>
          <p className="text-muted-foreground">Manage your referral partners</p>
        </div>
        <Button asChild>
          <Link to="/crm/partners/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
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
          ) : !partners?.length ? (
            <div className="text-center py-8 text-muted-foreground">
              {search ? 'No partners found matching your search' : 'No partners yet. Add your first partner!'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <Link
                        to={`/partners/${partner.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {partner.name}
                      </Link>
                    </TableCell>
                    <TableCell>{partner.company || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{partner.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {partner.email && <div>{partner.email}</div>}
                        {partner.phone && <div className="text-muted-foreground">{partner.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <HealthIndicator daysSinceContact={partner.daysSinceContact} />
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
