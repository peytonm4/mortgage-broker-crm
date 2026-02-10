import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { pipelineApi } from '@/api/client'
import { Check, X } from 'lucide-react'

interface DocRequest {
  id: string
  category: string
  responsibleParty: string
  status: string
  message: string | null
  requestedByEmail: string | null
  createdAt: string
}

interface DocRequestListProps {
  applicationId: string
  docRequests: DocRequest[]
}

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Fulfilled: 'bg-green-100 text-green-800',
  Cancelled: 'bg-gray-100 text-gray-800',
}

const PARTY_COLORS: Record<string, string> = {
  Borrower: 'bg-blue-100 text-blue-800',
  Broker: 'bg-purple-100 text-purple-800',
  TitleCompany: 'bg-teal-100 text-teal-800',
  Appraiser: 'bg-indigo-100 text-indigo-800',
}

const PARTY_LABELS: Record<string, string> = {
  Borrower: 'Borrower',
  Broker: 'Broker',
  TitleCompany: 'Title Company',
  Appraiser: 'Appraiser',
}

export function DocRequestList({ applicationId, docRequests }: DocRequestListProps) {
  const queryClient = useQueryClient()

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      pipelineApi.updateDocRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipeline', applicationId, 'doc-requests'] })
      queryClient.invalidateQueries({ queryKey: ['pipeline', applicationId] })
    },
  })

  if (docRequests.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        No document requests yet. Click "Request Document" to request documents from the borrower.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {docRequests.map((doc) => (
        <div key={doc.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{doc.category}</span>
                <Badge className={STATUS_COLORS[doc.status] || 'bg-gray-100'}>
                  {doc.status}
                </Badge>
                <Badge className={PARTY_COLORS[doc.responsibleParty] || 'bg-gray-100'}>
                  {PARTY_LABELS[doc.responsibleParty] || doc.responsibleParty}
                </Badge>
              </div>
              {doc.message && (
                <p className="text-sm text-muted-foreground">{doc.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Requested {new Date(doc.createdAt).toLocaleDateString()}
                {doc.requestedByEmail && ` by ${doc.requestedByEmail}`}
              </p>
            </div>
            {doc.status === 'Pending' && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateStatusMutation.mutate({ id: doc.id, status: 'Fulfilled' })
                  }
                  disabled={updateStatusMutation.isPending}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark Received
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    updateStatusMutation.mutate({ id: doc.id, status: 'Cancelled' })
                  }
                  disabled={updateStatusMutation.isPending}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
