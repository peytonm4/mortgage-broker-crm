import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { partnersApi, activitiesApi, leadsApi } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { HealthIndicator } from '@/components/HealthIndicator'
import { StatusBadge } from '@/components/StatusBadge'
import { formatDate, formatCurrency } from '@/lib/utils'
import { ArrowLeft, Edit, Phone, Mail, Building, Trash2 } from 'lucide-react'
import { ActivityFeed } from '@/components/ActivityFeed'

export function PartnerDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { data: partner, isLoading } = useQuery({
    queryKey: ['partner', id],
    queryFn: () => partnersApi.getById(id!),
    enabled: !!id,
  })

  const { data: activities } = useQuery({
    queryKey: ['activities', { partnerId: id }],
    queryFn: () => activitiesApi.getAll({ partnerId: id }),
    enabled: !!id,
  })

  const { data: leads } = useQuery({
    queryKey: ['leads', { partnerId: id }],
    queryFn: () => leadsApi.getAll({ partnerId: id }),
    enabled: !!id,
  })

  const deleteMutation = useMutation({
    mutationFn: () => partnersApi.delete(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] })
      navigate('/crm/partners')
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

  if (!partner) {
    return (
      <div className="p-8">
        <p>Partner not found</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/crm/partners">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{partner.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary">{partner.type}</Badge>
            {partner.company && (
              <span className="text-muted-foreground flex items-center gap-1">
                <Building className="h-3 w-3" />
                {partner.company}
              </span>
            )}
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link to={`/partners/${id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Partner"
        description={`Are you sure you want to delete ${partner.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate()}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {partner.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${partner.email}`} className="text-primary hover:underline">
                  {partner.email}
                </a>
              </div>
            )}
            {partner.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${partner.phone}`} className="text-primary hover:underline">
                  {partner.phone}
                </a>
              </div>
            )}
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground mb-1">Last Contact</p>
              <HealthIndicator daysSinceContact={partner.daysSinceContact} />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Referral Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{partner.totalLeads}</p>
                <p className="text-xs text-muted-foreground">Total Leads</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{partner.fundedLeads}</p>
                <p className="text-xs text-muted-foreground">Funded</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{partner.conversionRate}%</p>
                <p className="text-xs text-muted-foreground">Conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{partner.notes || 'No notes yet.'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Activity Feed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Activity</CardTitle>
            <ActivityFeed partnerId={id!} onActivityAdded={() => {
              queryClient.invalidateQueries({ queryKey: ['activities', { partnerId: id }] })
              queryClient.invalidateQueries({ queryKey: ['partner', id] })
            }} />
          </CardHeader>
          <CardContent>
            {!activities?.length ? (
              <p className="text-sm text-muted-foreground">No activity yet</p>
            ) : (
              <div className="space-y-3">
                {activities.slice(0, 10).map((activity) => (
                  <div key={activity.id} className="flex gap-3 text-sm">
                    <div className="text-muted-foreground w-20 shrink-0">
                      {formatDate(activity.createdAt)}
                    </div>
                    <div>
                      <Badge variant="outline" className="mr-2">{activity.type}</Badge>
                      {activity.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referred Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Referred Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {!leads?.length ? (
              <p className="text-sm text-muted-foreground">No leads referred yet</p>
            ) : (
              <div className="space-y-2">
                {leads.map((lead) => (
                  <Link
                    key={lead.id}
                    to={`/leads/${lead.id}`}
                    className="flex items-center justify-between p-2 -mx-2 rounded hover:bg-muted"
                  >
                    <div>
                      <p className="font-medium">{lead.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.loanType} - {formatCurrency(lead.loanAmount)}
                      </p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
