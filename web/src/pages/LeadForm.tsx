import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { leadsApi, partnersApi } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { ArrowLeft } from 'lucide-react'

const leadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  partnerId: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  loanType: z.enum(['Purchase', 'Refinance', 'HELOC']),
  loanAmount: z.string().optional(),
  propertyAddress: z.string().optional(),
  notes: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

export function LeadForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEditing = !!id

  const { data: lead, isLoading: leadLoading } = useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsApi.getById(id!),
    enabled: isEditing,
  })

  const { data: partners } = useQuery({
    queryKey: ['partners'],
    queryFn: () => partnersApi.getAll(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      partnerId: '',
      email: '',
      phone: '',
      loanType: 'Purchase',
      loanAmount: '',
      propertyAddress: '',
      notes: '',
    },
  })

  useEffect(() => {
    if (lead) {
      reset({
        firstName: lead.firstName,
        lastName: lead.lastName,
        partnerId: lead.partnerId || '',
        email: lead.email || '',
        phone: lead.phone || '',
        loanType: lead.loanType as LeadFormData['loanType'],
        loanAmount: lead.loanAmount?.toString() || '',
        propertyAddress: lead.propertyAddress || '',
        notes: lead.notes || '',
      })
    }
  }, [lead, reset])

  const createMutation = useMutation({
    mutationFn: (data: LeadFormData) =>
      leadsApi.create({
        firstName: data.firstName,
        lastName: data.lastName,
        partnerId: data.partnerId || null,
        email: data.email || null,
        phone: data.phone || null,
        loanType: data.loanType,
        loanAmount: data.loanAmount ? parseFloat(data.loanAmount) : null,
        propertyAddress: data.propertyAddress || null,
        notes: data.notes || null,
      }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      navigate(`/crm/leads/${result.id}`)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: LeadFormData) =>
      leadsApi.update(id!, {
        firstName: data.firstName,
        lastName: data.lastName,
        partnerId: data.partnerId || null,
        email: data.email || null,
        phone: data.phone || null,
        loanType: data.loanType,
        loanAmount: data.loanAmount ? parseFloat(data.loanAmount) : null,
        propertyAddress: data.propertyAddress || null,
        notes: data.notes || null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', id] })
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      navigate(`/crm/leads/${id}`)
    },
  })

  const onSubmit = (data: LeadFormData) => {
    if (isEditing) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  if (leadLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse h-96 bg-muted rounded-lg" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to={isEditing ? `/crm/leads/${id}` : '/crm/leads'}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Lead' : 'New Lead'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" {...register('firstName')} />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" {...register('lastName')} />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register('phone')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnerId">Referred By</Label>
                <NativeSelect id="partnerId" {...register('partnerId')}>
                  <option value="">No referral (direct)</option>
                  {partners?.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name} {partner.company ? `(${partner.company})` : ''}
                    </option>
                  ))}
                </NativeSelect>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanType">Loan Type *</Label>
                <NativeSelect id="loanType" {...register('loanType')}>
                  <option value="Purchase">Purchase</option>
                  <option value="Refinance">Refinance</option>
                  <option value="HELOC">HELOC</option>
                </NativeSelect>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="e.g. 350000"
                  {...register('loanAmount')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Input id="propertyAddress" {...register('propertyAddress')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" rows={4} {...register('notes')} />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Spinner className="mr-2" size="sm" />
                )}
                {isEditing ? 'Save Changes' : 'Create Lead'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to={isEditing ? `/crm/leads/${id}` : '/crm/leads'}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
