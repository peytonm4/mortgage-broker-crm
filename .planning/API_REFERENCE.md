# API Reference — One Community Mortgage CRM

Extracted from CLAUDE.md for progressive disclosure. Read when working on routes, endpoints, or data models.

---

## Routes

### Public Site
| Path | Page |
|---|---|
| `/` | Home |
| `/apply` | Loan application (3-step wizard) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

### Borrower Portal
| Path | Page |
|---|---|
| `/portal` | Portal dashboard |
| `/portal/application` | Application view |

### Staff CRM
| Path | Page |
|---|---|
| `/crm` | Dashboard (stats + partner leaderboard) |
| `/crm/partners` | Partners list |
| `/crm/partners/new` | Create partner |
| `/crm/partners/:id` | Partner detail |
| `/crm/partners/:id/edit` | Edit partner |
| `/crm/leads` | Leads list |
| `/crm/leads/new` | Create lead |
| `/crm/leads/:id` | Lead detail |
| `/crm/leads/:id/edit` | Edit lead |
| `/crm/funded` | Funded loans |
| `/crm/pipeline` | Pipeline (all non-draft applications) |
| `/crm/pipeline/:id` | Application detail + doc requests |

Redirects: `/partners/*` → `/crm/partners`, `/leads/*` → `/crm/leads`

---

## API Endpoints

### Applications — `/api/applications`
| Method | Path | Action |
|---|---|---|
| POST | `/api/applications` | Start new application (creates User + Borrower + LoanApplication) |
| GET | `/api/applications/{id}` | Get application details |
| PUT | `/api/applications/{id}/step1` | Update personal info |
| PUT | `/api/applications/{id}/step2` | Update loan details |
| POST | `/api/applications/{id}/submit` | Submit (Draft → Received) |
| GET | `/api/applications/{id}/doc-requests` | Get doc requests |

### Pipeline — `/api/pipeline`
| Method | Path | Action |
|---|---|---|
| GET | `/api/pipeline` | List all non-draft applications (filter: status, search) |
| GET | `/api/pipeline/{id}` | Application detail with doc request counts |
| PATCH | `/api/pipeline/{id}/status` | Update status |
| POST | `/api/pipeline/{id}/doc-requests` | Create doc request |
| GET | `/api/pipeline/{id}/doc-requests` | List doc requests |

### Doc Requests — `/api/doc-requests`
| Method | Path | Action |
|---|---|---|
| PATCH | `/api/doc-requests/{id}/status` | Update doc request status |

### Partners — `/api/partners`
| Method | Path | Action |
|---|---|---|
| GET | `/api/partners` | List (filter: search) |
| GET | `/api/partners/{id}` | Detail with totalLeads, fundedLeads, conversionRate |
| POST | `/api/partners` | Create |
| PUT | `/api/partners/{id}` | Update |
| DELETE | `/api/partners/{id}` | Delete |

### Leads — `/api/leads`
| Method | Path | Action |
|---|---|---|
| GET | `/api/leads` | List (filter: status, partnerId, search) |
| GET | `/api/leads/{id}` | Detail |
| POST | `/api/leads` | Create |
| PUT | `/api/leads/{id}` | Update |
| PATCH | `/api/leads/{id}/status` | Update status (auto-logs StatusChange activity) |
| DELETE | `/api/leads/{id}` | Delete |

### Activities — `/api/activities`
| Method | Path | Action |
|---|---|---|
| GET | `/api/activities` | List up to 100 (filter: partnerId, leadId) |
| POST | `/api/activities` | Create |

### Dashboard — `/api/dashboard`
| Method | Path | Action |
|---|---|---|
| GET | `/api/dashboard/stats` | totalLeads, newLeads, inProgress, fundedThisMonth, activePartners, pipelineValue, leadsByStatus, topPartners |

---

## Key Files

| File | Purpose |
|---|---|
| `web/src/App.tsx` | All client routes |
| `web/src/index.css` | CSS theme variables (Tailwind v4) |
| `web/src/api/client.ts` | Typed Axios API client |
| `web/src/components/PublicLayout.tsx` | Public site header/nav/footer |
| `web/src/components/Layout.tsx` | Staff CRM sidebar layout |
| `web/src/components/PortalLayout.tsx` | Borrower portal layout |
| `web/src/pages/public/Home.tsx` | Homepage hero + sections |
| `web/src/pages/public/Apply.tsx` | 3-step loan application wizard |
| `web/src/pages/portal/PortalDashboard.tsx` | Borrower portal dashboard |
| `web/src/pages/staff/Pipeline.tsx` | Staff pipeline view |
| `web/src/pages/staff/ApplicationDetail.tsx` | Staff application detail + doc requests |
| `api/MortgageCrm.Api/Program.cs` | API entry point, DI, middleware |
| `api/MortgageCrm.Api/Data/AppDbContext.cs` | EF Core DbContext + seed data |
| `api/MortgageCrm.Api/Endpoints/` | All API endpoint handlers |
| `api/MortgageCrm.Api/Entities/` | Database entity models |

---

## Data Models & Enums

**LeadStatus:** `New` | `Contacted` | `InProgress` | `Funded` | `Lost`

**LoanType (Lead):** `Purchase` | `Refinance` | `HELOC`

**ApplicationStatus:** `Draft` | `Received` | `InReview` | `NeedsDocs` | `Submitted` | `Closed` | `Denied`

**ApplicationLoanType:** `Purchase` | `Refinance` | `HELOC` | `FHA` | `VA` | `Conventional`

**DocumentCategory:** `PayStubs` | `W2s` | `BankStatements` | `TaxReturns` | `DriversLicense` | `Other`

**DocRequestStatus:** `Pending` | `Fulfilled` | `Cancelled`

**ResponsibleParty:** `Borrower` | `Broker` | `TitleCompany` | `Appraiser`

**PartnerType:** `Realtor` | `CPA` | `Attorney` | `PastClient` | `Other`

**ActivityType:** `Call` | `Email` | `Meeting` | `Note` | `StatusChange`

**UserRole:** `Borrower` | `Staff` | `Admin`
