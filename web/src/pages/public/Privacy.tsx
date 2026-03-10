export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-sm max-w-none space-y-6">
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-muted-foreground mb-3">
            When you apply for a mortgage through our services, we collect the following types of
            information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Personal identification information (name, email, phone number)</li>
            <li>Social Security Number (for credit verification purposes)</li>
            <li>Financial information (income, assets, debts)</li>
            <li>Property information for the loan you are seeking</li>
            <li>Employment history and verification</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Process your mortgage application</li>
            <li>Verify your identity and creditworthiness</li>
            <li>Communicate with you about your application status</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Improve our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Information Sharing</h2>
          <p className="text-muted-foreground">
            We may share your information with third parties as necessary to process your mortgage
            application, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
            <li>Credit bureaus for credit verification</li>
            <li>Lenders and financial institutions</li>
            <li>Title companies and appraisers</li>
            <li>Government agencies as required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction. This
            includes encryption, secure servers, and regular security assessments.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
          <p className="text-muted-foreground">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal requirements)</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-muted-foreground mt-2">
            Email: austin@azmtg.net
            <br />
            Phone: 623-694-2206
            <br />
            Address: 701 E Carefree Highway, Phoenix, AZ 85085
          </p>
        </section>
      </div>
    </div>
  )
}
