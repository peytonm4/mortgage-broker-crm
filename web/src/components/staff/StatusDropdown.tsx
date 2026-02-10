import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const STATUSES = [
  { value: 'Received', label: 'Received' },
  { value: 'InReview', label: 'In Review' },
  { value: 'NeedsDocs', label: 'Needs Documents' },
  { value: 'Submitted', label: 'Submitted' },
  { value: 'Closed', label: 'Closed' },
  { value: 'Denied', label: 'Denied' },
]

interface StatusDropdownProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function StatusDropdown({ value, onChange, disabled }: StatusDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
