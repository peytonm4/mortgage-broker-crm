import { cn } from '@/lib/utils'

interface HealthIndicatorProps {
  daysSinceContact: number | null
}

export function HealthIndicator({ daysSinceContact }: HealthIndicatorProps) {
  if (daysSinceContact === null) {
    return <span className="text-muted-foreground text-sm">Never contacted</span>
  }

  let color = 'bg-green-500'
  let label = 'Healthy'

  if (daysSinceContact > 30) {
    color = 'bg-red-500'
    label = 'Needs attention'
  } else if (daysSinceContact > 14) {
    color = 'bg-yellow-500'
    label = 'Getting stale'
  }

  return (
    <div className="flex items-center gap-2">
      <div className={cn('h-2 w-2 rounded-full', color)} />
      <span className="text-sm">
        {daysSinceContact} days ago
        <span className="text-muted-foreground ml-1">({label})</span>
      </span>
    </div>
  )
}
