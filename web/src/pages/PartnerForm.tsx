import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { partnersApi } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { ArrowLeft } from 'lucide-react'

const partnerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  type: z.enum(['Realtor', 'CPA', 'Attorney', 'PastClient', 'Other']),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  notes: z.string().optional(),
})

type PartnerFormData = z.infer<typeof partnerSchema>

export function PartnerForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEditing = !!id

  const { data: partner, isLoading } = useQuery({
    queryKey: ['partner', id],
    queryFn: () => partnersApi.getById(id!),
    enabled: isEditing,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: '',
      company: '',
      type: 'Realtor',
      email: '',
      phone: '',
      notes: '',
    },
  })

  useEffect(() => {
    if (partner) {
      reset({
        name: partner.name,
        company: partner.company || '',
        type: partner.type as PartnerFormData['type'],
        email: partner.email || '',
        phone: partner.phone || '',
        notes: partner.notes || '',
      })
    }
  }, [partner, reset])

  const createMutation = useMutation({
    mutationFn: (data: PartnerFormData) =>
      partnersApi.create({
        name: data.name,
        company: data.company || null,
        type: data.type,
        email: data.email || null,
        phone: data.phone || null,
        notes: data.notes || null,
      }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['partners'] })
      navigate(`/crm/partners/${result.id}`)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: PartnerFormData) =>
      partnersApi.update(id!, {
        name: data.name,
        company: data.company || null,
        type: data.type,
        email: data.email || null,
        phone: data.phone || null,
        notes: data.notes || null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner', id] })
      queryClient.invalidateQueries({ queryKey: ['partners'] })
      navigate(`/crm/partners/${id}`)
    },
  })

  const onSubmit = (data: PartnerFormData) => {
    if (isEditing) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  if (isLoading) {
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
          <Link to={isEditing ? `/crm/partners/${id}` : '/crm/partners'}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Partner' : 'New Partner'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partner Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" {...register('company')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <NativeSelect id="type" {...register('type')}>
                  <option value="Realtor">Realtor</option>
                  <option value="CPA">CPA</option>
                  <option value="Attorney">Attorney</option>
                  <option value="PastClient">Past Client</option>
                  <option value="Other">Other</option>
                </NativeSelect>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register('phone')} />
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
                {isEditing ? 'Save Changes' : 'Create Partner'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to={isEditing ? `/crm/partners/${id}` : '/crm/partners'}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
