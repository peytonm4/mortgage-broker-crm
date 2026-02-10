import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { leadsApi, activitiesApi } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NativeSelect } from '@/components/ui/select'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Spinner } from '@/components/ui/spinner'
import { formatDate, formatCurrency } from '@/lib/utils'
import { ArrowLeft, Edit, Phone, Mail, MapPin, Trash2 } from 'lucide-react'
import { ActivityFeed } from '@/components/ActivityFeed'

const statuses = ['New', 'Contacted', 'InProgress', 'Funded', 'Lost']

export function LeadDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { data: lead, isLoading } = useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsApi.getById(id!),
    enabled: !!id,
  })

  const { data: activities } = useQuery({
    queryKey: ['activities', { leadId: id }],
    queryFn: () => activitiesApi.getAll({ leadId: id }),
    enabled: !!id,
  })

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) => leadsApi.updateStatus(id!, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', id] })
      queryClient.invalidateQueries({ queryKey: ['activities', { leadId: id }] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => leadsApi.delete(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      navigate('/crm/leads')
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

  if (!lead) {
    return (
      <div className="p-8">
        <p>Lead not found</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/crm/leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{lead.fullName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary">{lead.loanType}</Badge>
            {lead.loanAmount && (
              <span className="text-muted-foreground">{formatCurrency(lead.loanAmount)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <div className="relative">
            <NativeSelect
              value={lead.status}
              onChange={(e) => updateStatusMutation.mutate(e.target.value)}
              className="w-36"
              disabled={updateStatusMutation.isPending}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'InProgress' ? 'In Progress' : status}
                </option>
              ))}
            </NativeSelect>
            {updateStatusMutation.isPending && (
              <Spinner className="absolute right-8 top-1/2 -translate-y-1/2" size="sm" />
            )}
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link to={`/leads/${id}/edit`}>
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
        title="Delete Lead"
        description={`Are you sure you want to delete ${lead.fullName}? This action cannot be undone.`}
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
            {lead.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                  {lead.email}
                </a>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                  {lead.phone}
                </a>
              </div>
            )}
            {lead.propertyAddress && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{lead.propertyAddress}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referral Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Referral</CardTitle>
          </CardHeader>
          <CardContent>
            {lead.partnerName ? (
              <Link
                to={`/partners/${lead.partnerId}`}
                className="text-primary hover:underline font-medium"
              >
                {lead.partnerName}
              </Link>
            ) : (
              <span className="text-muted-foreground">Direct (no referral)</span>
            )}
            <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
              <p>Created: {formatDate(lead.createdAt)}</p>
              <p>Updated: {formatDate(lead.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{lead.notes || 'No notes yet.'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Activity Timeline</CardTitle>
          <ActivityFeed leadId={id!} onActivityAdded={() => {
            queryClient.invalidateQueries({ queryKey: ['activities', { leadId: id }] })
          }} />
        </CardHeader>
        <CardContent>
          {!activities?.length ? (
            <p className="text-sm text-muted-foreground">No activity yet</p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4 text-sm">
                  <div className="text-muted-foreground w-24 shrink-0">
                    {formatDate(activity.createdAt)}
                  </div>
                  <div className="flex-1">
                    <Badge variant="outline" className="mr-2">{activity.type}</Badge>
                    {activity.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
