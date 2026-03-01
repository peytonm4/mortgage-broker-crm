import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = currentStep > stepNumber
        const isCurrent = currentStep === stepNumber

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300',
                  isCompleted && 'bg-primary text-primary-foreground',
                  isCurrent && 'bg-primary text-primary-foreground scale-110 ring-4 ring-primary/20',
                  !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
              </div>
              <span
                className={cn(
                  'text-xs mt-2 font-medium transition-colors duration-300',
                  (isCompleted || isCurrent) && 'text-primary',
                  !isCompleted && !isCurrent && 'text-muted-foreground'
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-16 h-1.5 mx-2 rounded-full transition-colors duration-300',
                  currentStep > stepNumber ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
