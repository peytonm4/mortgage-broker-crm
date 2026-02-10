import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface ReviewStepProps {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    ssnLast4?: string
    streetAddress?: string
    city?: string
    state?: string
    zipCode?: string
  }
  loanDetails: {
    loanType: string
    loanAmount: string
    propertyStreetAddress?: string
    propertyCity?: string
    propertyState?: string
    propertyZipCode?: string
    propertyType?: string
  }
  onBack: () => void
  onSubmit: () => Promise<void>
  isSubmitting: boolean
}

export function ReviewStep({
  personalInfo,
  loanDetails,
  onBack,
  onSubmit,
  isSubmitting,
}: ReviewStepProps) {
  const [agreed, setAgreed] = useState(false)

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Review Your Application</h2>
        <p className="text-sm text-muted-foreground">
          Please review your information before submitting
        </p>
      </div>

      {/* Personal Information Summary */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Name:</span>{' '}
            <span className="font-medium">
              {personalInfo.firstName} {personalInfo.lastName}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>{' '}
            <span className="font-medium">{personalInfo.email}</span>
          </div>
          {personalInfo.phone && (
            <div>
              <span className="text-muted-foreground">Phone:</span>{' '}
              <span className="font-medium">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.ssnLast4 && (
            <div>
              <span className="text-muted-foreground">SSN (last 4):</span>{' '}
              <span className="font-medium">***-**-{personalInfo.ssnLast4}</span>
            </div>
          )}
          {personalInfo.streetAddress && (
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Address:</span>{' '}
              <span className="font-medium">
                {personalInfo.streetAddress}
                {personalInfo.city && `, ${personalInfo.city}`}
                {personalInfo.state && `, ${personalInfo.state}`}
                {personalInfo.zipCode && ` ${personalInfo.zipCode}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Loan Details Summary */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Loan Details</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Loan Type:</span>{' '}
            <span className="font-medium">{loanDetails.loanType}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Loan Amount:</span>{' '}
            <span className="font-medium">{formatCurrency(loanDetails.loanAmount)}</span>
          </div>
          {loanDetails.propertyType && (
            <div>
              <span className="text-muted-foreground">Property Type:</span>{' '}
              <span className="font-medium">{loanDetails.propertyType}</span>
            </div>
          )}
          {loanDetails.propertyStreetAddress && (
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Property Address:</span>{' '}
              <span className="font-medium">
                {loanDetails.propertyStreetAddress}
                {loanDetails.propertyCity && `, ${loanDetails.propertyCity}`}
                {loanDetails.propertyState && `, ${loanDetails.propertyState}`}
                {loanDetails.propertyZipCode && ` ${loanDetails.propertyZipCode}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Consent */}
      <div className="border rounded-lg p-4 bg-muted/30">
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="mt-0.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                agreed ? 'bg-primary border-primary' : 'border-muted-foreground'
              }`}
            >
              {agreed && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>
          </div>
          <span className="text-sm">
            I certify that the information provided is true and accurate. I authorize HomeLoan Pro
            to verify my information and run a credit check. I have read and agree to the{' '}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={!agreed || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  )
}
