import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface PersonalInfoData {
  firstName: string
  lastName: string
  email: string
  phone: string
  ssnLast4: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
}

interface PersonalInfoStepProps {
  defaultValues?: Partial<PersonalInfoData>
  onNext: (data: PersonalInfoData) => void
}

export function PersonalInfoStep({ defaultValues, onNext }: PersonalInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
        <p className="text-sm text-muted-foreground">Tell us about yourself</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email',
              },
            })}
            placeholder="john.doe@email.com"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ssnLast4">Last 4 digits of SSN *</Label>
        <Input
          id="ssnLast4"
          {...register('ssnLast4', {
            required: 'SSN is required',
            pattern: {
              value: /^\d{4}$/,
              message: 'Please enter exactly 4 digits',
            },
          })}
          placeholder="1234"
          maxLength={4}
          className="w-32"
        />
        {errors.ssnLast4 && (
          <p className="text-sm text-destructive">{errors.ssnLast4.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          We only collect the last 4 digits for identification purposes
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-4">Current Address</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input
              id="streetAddress"
              {...register('streetAddress')}
              placeholder="123 Main Street"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register('city')} placeholder="Austin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" {...register('state')} placeholder="TX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input id="zipCode" {...register('zipCode')} placeholder="78701" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Continue to Loan Details</Button>
      </div>
    </form>
  )
}
