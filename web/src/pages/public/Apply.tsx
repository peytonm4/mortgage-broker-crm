import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { StepIndicator } from '@/components/apply/StepIndicator'
import { PersonalInfoStep } from '@/components/apply/PersonalInfoStep'
import { LoanDetailsStep } from '@/components/apply/LoanDetailsStep'
import { ReviewStep } from '@/components/apply/ReviewStep'
import { applicationsApi } from '@/api/client'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

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
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your application. We've received your information and will be in touch
              within 24 hours. You can check your application status in the borrower portal.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/portal')}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90"
              >
                Go to Portal
              </button>
              <button
                onClick={() => navigate('/')}
                className="border px-6 py-2 rounded-md font-medium hover:bg-muted"
              >
                Return Home
              </button>
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
