export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-sm max-w-none space-y-6">
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using One Community Mortgage's services, you accept and agree to be bound by
            these Terms of Service. If you do not agree to these terms, please do not use our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Description of Services</h2>
          <p className="text-muted-foreground">
            One Community Mortgage provides mortgage brokerage services, connecting borrowers with lenders.
            We help facilitate the mortgage application process but are not a direct lender. Final
            loan decisions are made by the lending institutions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
          <p className="text-muted-foreground mb-3">By using our services, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide accurate and truthful information in your application</li>
            <li>Promptly respond to requests for additional documentation</li>
            <li>Notify us of any changes to your financial situation</li>
            <li>Not use our services for any unlawful purpose</li>
            <li>Keep your account credentials secure and confidential</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">No Guarantee of Approval</h2>
          <p className="text-muted-foreground">
            Submission of an application does not guarantee loan approval. All loan applications
            are subject to verification and approval by the lending institution. Interest rates,
            terms, and conditions are determined by the lender and may vary based on your credit
            profile and market conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Credit Checks</h2>
          <p className="text-muted-foreground">
            By submitting an application, you authorize One Community Mortgage and our lending partners to
            obtain your credit report from one or more credit bureaus. This may affect your credit
            score.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Fees and Costs</h2>
          <p className="text-muted-foreground">
            One Community Mortgage may receive compensation from lenders for loans that are funded. Any fees
            associated with your mortgage will be clearly disclosed prior to closing. We are
            committed to transparency in all fee disclosures.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            One Community Mortgage shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages arising out of your use of our services. Our liability is limited
            to the maximum extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Modifications to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these Terms of Service at any time. Changes will be
            effective immediately upon posting. Your continued use of our services after any
            changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms of Service shall be governed by and construed in accordance with the laws
            of the State of Texas, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <p className="text-muted-foreground">
            For questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-muted-foreground mt-2">
            Email: legal@onecommunity.mortgage
            <br />
            Phone: (555) 123-4567
            <br />
            Address: 123 Main Street, Austin, TX 78701
          </p>
        </section>
      </div>
    </div>
  )
}
