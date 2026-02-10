import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface LoanDetailsData {
  loanType: string
  loanAmount: string
  propertyStreetAddress: string
  propertyCity: string
  propertyState: string
  propertyZipCode: string
  propertyType: string
}

interface LoanDetailsStepProps {
  defaultValues?: Partial<LoanDetailsData>
  onNext: (data: LoanDetailsData) => void
  onBack: () => void
}

const LOAN_TYPES = [
  { value: 'Purchase', label: 'Purchase - Buying a home' },
  { value: 'Refinance', label: 'Refinance - Lower your rate' },
  { value: 'HELOC', label: 'HELOC - Access home equity' },
  { value: 'FHA', label: 'FHA - Low down payment' },
  { value: 'VA', label: 'VA - Veterans benefit' },
  { value: 'Conventional', label: 'Conventional - Traditional loan' },
]

const PROPERTY_TYPES = [
  { value: 'SingleFamily', label: 'Single Family Home' },
  { value: 'Condo', label: 'Condominium' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'MultiFamily', label: 'Multi-Family (2-4 units)' },
]

export function LoanDetailsStep({ defaultValues, onNext, onBack }: LoanDetailsStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoanDetailsData>({
    defaultValues,
  })

  const loanType = watch('loanType')
  const propertyType = watch('propertyType')

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Loan Details</h2>
        <p className="text-sm text-muted-foreground">Tell us about the loan you need</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Loan Type *</Label>
          <Select
            value={loanType}
            onValueChange={(value) => setValue('loanType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              {LOAN_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" {...register('loanType', { required: 'Loan type is required' })} />
          {errors.loanType && (
            <p className="text-sm text-destructive">{errors.loanType.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Loan Amount *</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id="loanAmount"
              type="number"
              {...register('loanAmount', {
                required: 'Loan amount is required',
                min: { value: 10000, message: 'Minimum loan amount is $10,000' },
              })}
              placeholder="350000"
              className="pl-7"
            />
          </div>
          {errors.loanAmount && (
            <p className="text-sm text-destructive">{errors.loanAmount.message}</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Property Information</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {loanType === 'Purchase'
            ? "Enter the address of the property you're purchasing, if known"
            : "Enter your current property address"}
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="propertyStreetAddress">Street Address</Label>
            <Input
              id="propertyStreetAddress"
              {...register('propertyStreetAddress')}
              placeholder="456 Oak Lane"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyCity">City</Label>
              <Input id="propertyCity" {...register('propertyCity')} placeholder="Austin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyState">State</Label>
              <Input id="propertyState" {...register('propertyState')} placeholder="TX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyZipCode">ZIP Code</Label>
              <Input
                id="propertyZipCode"
                {...register('propertyZipCode')}
                placeholder="78701"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select
              value={propertyType}
              onValueChange={(value) => setValue('propertyType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" {...register('propertyType')} />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Continue to Review</Button>
      </div>
    </form>
  )
}
