import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { activitiesApi } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Plus } from 'lucide-react'

const activityTypes = ['Call', 'Email', 'Meeting', 'Note']

interface ActivityFeedProps {
  partnerId?: string
  leadId?: string
  onActivityAdded: () => void
}

export function ActivityFeed({ partnerId, leadId, onActivityAdded }: ActivityFeedProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState('Call')
  const [description, setDescription] = useState('')

  const createMutation = useMutation({
    mutationFn: () =>
      activitiesApi.create({
        partnerId: partnerId || null,
        leadId: leadId || null,
        type,
        description,
      }),
    onSuccess: () => {
      setIsOpen(false)
      setDescription('')
      setType('Call')
      onActivityAdded()
    },
  })

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-1" />
        Log Activity
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <NativeSelect value={type} onChange={(e) => setType(e.target.value)} className="w-24 h-8 text-sm">
        {activityTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </NativeSelect>
      <Input
        placeholder="What happened?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="h-8 text-sm"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && description.trim()) {
            createMutation.mutate()
          }
        }}
      />
      <Button
        size="sm"
        onClick={() => createMutation.mutate()}
        disabled={!description.trim() || createMutation.isPending}
      >
        {createMutation.isPending && <Spinner className="mr-1" size="sm" />}
        Add
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
    </div>
  )
}
