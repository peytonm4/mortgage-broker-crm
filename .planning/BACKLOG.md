# Feature Backlog

Potential features identified for future planning. Not yet prioritized or scheduled.

---

## Authentication & Security
- [ ] Real login system (header has username/password inputs but they don't work)
- [ ] Borrower portal authentication (currently anyone can access any application by ID)
- [ ] Staff login with role-based access (staff vs admin)
- [ ] Password reset / email verification

## Borrower Portal
- [ ] File upload for document requests (fulfill requests directly in the portal)
- [ ] Email/SMS notifications when application status changes or docs are requested
- [ ] Messaging thread between borrower and loan officer
- [ ] Co-borrower support on applications

## Staff CRM
- [ ] Activity logging UI (the `Activity` entity exists in the DB but there's no UI for it)
- [ ] Notes on leads/partners (full notes history)
- [ ] Email integration (log emails sent to leads/partners)
- [ ] Task/reminder system (follow-up reminders for leads)
- [ ] Lead-to-application conversion flow (convert a lead directly into a loan application)
- [ ] Bulk status updates on pipeline
- [ ] Export to CSV (leads, pipeline, funded loans)

## Document Management
- [ ] Actual file upload and storage (S3/Azure Blob)
- [ ] Document preview in the portal
- [ ] E-signature integration (DocuSign, HelloSign)

## Analytics & Reporting
- [ ] Conversion funnel report (lead → application → funded)
- [ ] Monthly/quarterly funded volume charts
- [ ] Partner ROI report
- [ ] Loan officer performance metrics

## Public Site
- [ ] Live rates page (static or integrated with a rates API)
- [ ] FAQ page (currently linked but not built)
- [ ] Contact Us page (currently linked but not built)
- [ ] Blog/resources section

## Integrations
- [ ] Credit pull integration
- [ ] LOS sync (Encompass, BytePro)
- [ ] CRM email sync (Gmail/Outlook)
