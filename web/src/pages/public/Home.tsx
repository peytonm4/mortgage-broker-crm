import { Link } from 'react-router-dom'
import { CheckCircle, Clock, Shield, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[580px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)',
        }}
      >
        {/* subtle light overlay so text pops without killing the photo */}
        <div className="absolute inset-0 bg-[#1F3A5F]/50" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-sm mb-3">
            Low Rates. Great Service.
          </h1>
          <p className="text-xl md:text-2xl text-[#DCE6F2] mb-10">
            Home Purchase &amp; Refinance Loans
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/portal"
              className="bg-[#FFC145] text-white px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-[#D99A17] transition-colors uppercase"
            >
              Existing Customers
            </Link>
            <Link
              to="/apply"
              className="bg-[#FFC145] text-white px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-[#D99A17] transition-colors uppercase"
            >
              View Live Rates
            </Link>
            <Link
              to="/apply"
              className="bg-[#FFC145] text-white px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-[#D99A17] transition-colors uppercase"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom info strip */}
      <div className="bg-[#FFC145] text-white py-3 px-4 flex items-center justify-between text-sm">
        <span className="text-amber-100">
          Don't have an online account?{' '}
          <Link to="/apply" className="underline text-white hover:text-amber-200">
            Find out what you are missing.
          </Link>
        </span>
        <span className="font-semibold tracking-wider uppercase text-xs">
          Benefits of an Online Account
        </span>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fast Pre-Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get pre-approved in as little as 24 hours. Our streamlined process gets you
                  shopping for homes faster.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Competitive Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We work with multiple lenders to find you the best rates available.
                  Save thousands over the life of your loan.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Personal Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A dedicated loan officer guides you through the entire process.
                  We're here to answer your questions 7 days a week.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Loan Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Purchase', desc: 'Buying your first home or next home' },
              { title: 'Refinance', desc: 'Lower your rate or access equity' },
              { title: 'FHA Loans', desc: 'Low down payment options' },
              { title: 'VA Loans', desc: 'For veterans and service members' },
              { title: 'HELOC', desc: 'Home equity lines of credit' },
              { title: 'Conventional', desc: 'Traditional fixed-rate mortgages' },
            ].map((loan) => (
              <div key={loan.title} className="bg-background p-6 rounded-lg border hover:border-[#1F3A5F] transition-colors">
                <h3 className="font-semibold mb-2">{loan.title}</h3>
                <p className="text-sm text-muted-foreground">{loan.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Apply Online', desc: 'Complete our simple 3-step application in minutes' },
              { step: '2', title: 'Get Pre-Approved', desc: 'We review your application and provide a decision' },
              { step: '3', title: 'Find Your Home', desc: 'Shop with confidence knowing your budget' },
              { step: '4', title: 'Close & Move In', desc: 'We handle the paperwork, you get the keys' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[#1F3A5F] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1F3A5F] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Take the first step toward your new home. Our application takes just a few minutes
            and doesn't affect your credit score.
          </p>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 bg-[#FFC145] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#D99A17] transition-colors uppercase tracking-widest text-sm"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center text-muted-foreground">
            {[
              'Licensed in 50 States',
              '10,000+ Happy Customers',
              'A+ BBB Rating',
              '4.9/5 Customer Rating',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#50C878]" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
