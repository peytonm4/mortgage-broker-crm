import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { StepIndicator } from '@/components/apply/StepIndicator'
import { PersonalInfoStep } from '@/components/apply/PersonalInfoStep'
import { LoanDetailsStep } from '@/components/apply/LoanDetailsStep'
import { ReviewStep } from '@/components/apply/ReviewStep'
import { applicationsApi } from '@/api/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ClipboardList, FileText, Bell, ArrowRight } from 'lucide-react'

const STEPS = ['Personal Info', 'Loan Details', 'Review']

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

interface LoanDetailsData {
  loanType: string
  loanAmount: string
  propertyStreetAddress: string
  propertyCity: string
  propertyState: string
  propertyZipCode: string
  propertyType: string
}

export function Apply() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [applicationId, setApplicationId] = useState<string | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(null)
  const [loanDetails, setLoanDetails] = useState<LoanDetailsData | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const startMutation = useMutation({
    mutationFn: applicationsApi.start,
  })

  const updateStep1Mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: PersonalInfoData }) =>
      applicationsApi.updateStep1(id, data),
  })

  const updateStep2Mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: LoanDetailsData }) =>
      applicationsApi.updateStep2(id, {
        loanType: data.loanType,
        loanAmount: parseFloat(data.loanAmount),
        propertyStreetAddress: data.propertyStreetAddress,
        propertyCity: data.propertyCity,
        propertyState: data.propertyState,
        propertyZipCode: data.propertyZipCode,
        propertyType: data.propertyType,
      }),
  })

  const submitMutation = useMutation({
    mutationFn: (id: string) => applicationsApi.submit(id),
  })

  const handleStep1 = async (data: PersonalInfoData) => {
    setPersonalInfo(data)

    if (!applicationId) {
      // Start a new application
      const result = await startMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
      })
      setApplicationId(result.applicationId)

      // Update with full personal info
      await updateStep1Mutation.mutateAsync({ id: result.applicationId, data })
    } else {
      await updateStep1Mutation.mutateAsync({ id: applicationId, data })
    }

    setCurrentStep(2)
  }

  const handleStep2 = async (data: LoanDetailsData) => {
    setLoanDetails(data)
    if (applicationId) {
      await updateStep2Mutation.mutateAsync({ id: applicationId, data })
    }
    setCurrentStep(3)
  }

  const handleSubmit = async () => {
    if (applicationId) {
      await submitMutation.mutateAsync(applicationId)
      setSubmitted(true)
    }
  }

  if (submitted) {
    const portalUrl = applicationId
      ? `/portal?applicationId=${applicationId}`
      : '/portal'

    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            {/* Animated checkmark */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-[scale-in_0.4s_ease-out]">
              <CheckCircle className="h-10 w-10 text-green-600 animate-[scale-in_0.5s_ease-out_0.1s_both]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Thank you for your application. We've received your information and will be in touch
              within 24 hours.
            </p>

            {/* What happens next */}
            <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-sm mb-4 text-center">What Happens Next</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: ClipboardList,
                    title: 'We review your application',
                    desc: 'Our team will review your information within 24-48 hours.',
                  },
                  {
                    icon: FileText,
                    title: 'We may request documents',
                    desc: "If we need additional documentation, you'll be notified in your portal.",
                  },
                  {
                    icon: Bell,
                    title: "You'll receive a decision",
                    desc: "Once reviewed, you'll get a decision via email and in your portal.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate(portalUrl)}>
                Go to Portal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Apply for a Mortgage</h1>
        <p className="text-muted-foreground">
          Complete the form below to get started. It only takes a few minutes.
        </p>
      </div>

      <StepIndicator currentStep={currentStep} steps={STEPS} />

      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <PersonalInfoStep defaultValues={personalInfo || undefined} onNext={handleStep1} />
          )}
          {currentStep === 2 && (
            <LoanDetailsStep
              defaultValues={loanDetails || undefined}
              onNext={handleStep2}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && personalInfo && loanDetails && (
            <ReviewStep
              personalInfo={personalInfo}
              loanDetails={loanDetails}
              onBack={() => setCurrentStep(2)}
              onSubmit={handleSubmit}
              isSubmitting={submitMutation.isPending}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
