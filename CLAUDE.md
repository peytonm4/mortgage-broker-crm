# CLAUDE.md — Mortgage Broker CRM

Project-level instructions and conventions for Claude Code. Read this at the start of every session.

---

## Project Overview

A full-stack mortgage broker CRM with three audiences:
- **Public site** — borrower-facing landing page and application form
- **Borrower portal** — dashboard for tracking loan status and documents
- **Staff CRM** — internal pipeline, partner, and lead management

**Brand name:** One Community Mortgage

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, React Query |
| Backend | .NET 8 Minimal API, Entity Framework Core |
| Database | PostgreSQL 17 (Docker on port 5433) |
| HTTP client | Axios (typed, baseURL `/api`) |
| Forms | React Hook Form + Zod |
| UI primitives | Radix UI (Dialog, Select, Slot) |
| Icons | lucide-react |
| Date utils | date-fns |

---

## Running the App

```bash
# 1. Start database (Docker must be running)
docker compose up -d

# 2. Start API — http://localhost:5000
cd api/MortgageCrm.Api && dotnet run

# 3. Start frontend — http://localhost:5173
cd web && npm install && npm run dev

# Type-check frontend
cd web && npx tsc --noEmit

# Reset database (wipes all data, re-seeds)
docker compose down -v && docker compose up -d
```

**Database credentials:** host `localhost:5433`, db `mortgagecrm`, user `postgres`, password `postgres`

---

## Key Files

| File | Purpose |
|---|---|
| `web/src/App.tsx` | All client routes |
| `web/src/index.css` | CSS theme variables (Tailwind v4) |
| `web/src/api/client.ts` | Typed Axios API client, all API calls go here |
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

## Data Models & Enums

### Enums

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

### Implicit Status Transitions
- Creating a doc request on an `InReview` application auto-transitions it to `NeedsDocs`
- PATCH lead status auto-logs a `StatusChange` activity
- Calling/emailing/meeting a partner updates `LastContactedAt`

---

## Frontend Patterns

### API Client (`web/src/api/client.ts`)
Typed functions grouped by domain: `partnersApi`, `leadsApi`, `activitiesApi`, `dashboardApi`, `applicationsApi`, `pipelineApi`. All return the extracted `.data` from axios. Always add new API calls here.

### Data Fetching
React Query with 1-minute stale time. Mutations should `invalidateQueries` on the relevant query key after success.

### Form Validation
React Hook Form + Zod. Define schema with `z.object()`, pass to `useForm` via `zodResolver`.

### Styling
Tailwind CSS v4. Component library classes use CSS variables (e.g. `bg-primary`, `text-muted-foreground`). Nav/footer/hero elements use hardcoded hex values directly in JSX.

---

## Color Palette — Deep Navy + Champagne Gold (Active)

See `.planning/design/color-history.md` for full history and revert instructions for all past palettes.

| Role | Hex |
|---|---|
| Primary | `#0B1D3A` |
| Primary dark / hover | `#071428` |
| Primary light | `#C8D5E3` |
| Accent / Champagne Gold | `#C9A84C` |
| Accent dark / hover | `#A8893D` |
| Background | `#F5F7FA` |
| Surface | `#FFFFFF` |
| Alt surface | `#E8EDF3` |
| Text | `#0F1923` |
| Text secondary | `#5A6775` |
| Border | `#D1DAE5` |
| Support / success only | `#50C878` |

**Rules:**
- CSS variables in `index.css` apply to the component library
- Nav, footer, buttons, hero sections use hardcoded hex in JSX
- `#50C878` is reserved for success/support indicators (e.g. CheckCircle icons) — do not use as primary

---

## Unsplash Hero Images

Only older numeric-format IDs hotlink directly without API auth:
- ✅ Format: `https://images.unsplash.com/photo-{numeric-id}?w=1920&q=80`
- ❌ Newer alphanumeric IDs (e.g. `G48h926L2qo`) require API auth — do not use
- Current hero: `photo-1600585154340-be6161a56a0c` (modern luxury home exterior — confirmed working)

---

## Demo / Seed Data

Seeded automatically on first run if DB is empty.

**Demo users:**
- `admin@mortgagecrm.com` / `demo123` (Admin)
- `staff@mortgagecrm.com` / `demo123` (Staff)

**Demo partners:** Sarah Chen (Realtor), Mike Rodriguez (CPA), Jennifer Walsh (Attorney), David Kim (Realtor), Lisa Thompson (PastClient)

**Demo leads:** 10 leads across all statuses distributed among partners.

---

## Planning Docs

Always consult and update these when making significant changes:

| File | Purpose |
|---|---|
| `.planning/CONTEXT.md` | Running log of all session decisions and changes |
| `.planning/BACKLOG.md` | Feature backlog by area |
| `.planning/design/color-history.md` | Every palette with all hex values + revert instructions |

---

## Session Handoff Protocol

At the start of each session:
1. Read `.planning/CONTEXT.md` to restore decisions and current state
2. Check `.planning/BACKLOG.md` for pending work
3. Note any uncommitted changes with `git status`

At the end of a significant session:
1. Update `.planning/CONTEXT.md` with what changed
2. Update `color-history.md` if palette was modified
3. Confirm with user before committing

---

## Conventions

- **No auto-commit** — always confirm with user before committing or pushing
- **No `.gitignore` additions** unless explicitly requested
- **No over-engineering** — no premature abstractions, no extra error handling for impossible cases, no docstrings on unchanged code
- **Update planning docs** when making architectural or design decisions
- **Log color changes** in `.planning/design/color-history.md` before switching palettes
- **Enums are strings** — `JsonStringEnumConverter` is configured globally; enums serialize as strings in the API
- **All API calls go through `web/src/api/client.ts`** — do not call axios directly in components
