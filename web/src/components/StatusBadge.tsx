import { Badge } from '@/components/ui/badge'

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' }> = {
  New: { label: 'New', variant: 'default' },
  Contacted: { label: 'Contacted', variant: 'secondary' },
  InProgress: { label: 'In Progress', variant: 'warning' },
  Funded: { label: 'Funded', variant: 'success' },
  Lost: { label: 'Lost', variant: 'destructive' },
}

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'secondary' as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
