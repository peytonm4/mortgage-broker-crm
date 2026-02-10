import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X } from 'lucide-react'
import type { ResponsibleParty } from '@/api/client'

const DOC_CATEGORIES = [
  { value: 'PayStubs', label: 'Pay Stubs' },
  { value: 'W2s', label: 'W-2s' },
  { value: 'BankStatements', label: 'Bank Statements' },
  { value: 'TaxReturns', label: 'Tax Returns' },
  { value: 'DriversLicense', label: "Driver's License" },
  { value: 'Other', label: 'Other' },
]

const RESPONSIBLE_PARTIES: { value: ResponsibleParty; label: string }[] = [
  { value: 'Borrower', label: 'Borrower' },
  { value: 'Broker', label: 'Broker' },
  { value: 'TitleCompany', label: 'Title Company' },
  { value: 'Appraiser', label: 'Appraiser' },
]

interface DocRequestModalProps {
  onClose: () => void
  onSubmit: (data: { category: string; responsibleParty: ResponsibleParty; message: string }) => void
  isSubmitting?: boolean
}

export function DocRequestModal({ onClose, onSubmit, isSubmitting }: DocRequestModalProps) {
  const [category, setCategory] = useState('')
  const [responsibleParty, setResponsibleParty] = useState<ResponsibleParty | ''>('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (category && responsibleParty) {
      onSubmit({ category, responsibleParty, message })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-background rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Request Document</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Document Type *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {DOC_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Responsible Party *</Label>
            <Select value={responsibleParty} onValueChange={(v) => setResponsibleParty(v as ResponsibleParty)}>
              <SelectTrigger>
                <SelectValue placeholder="Who needs to provide this?" />
              </SelectTrigger>
              <SelectContent>
                {RESPONSIBLE_PARTIES.map((party) => (
                  <SelectItem key={party.value} value={party.value}>
                    {party.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Message to Borrower (optional)</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide any specific instructions..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!category || !responsibleParty || isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
