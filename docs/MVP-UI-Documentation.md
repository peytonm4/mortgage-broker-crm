# One Community Mortgage — MVP UI Documentation

**Version:** 1.0 MVP
**Date:** 2026-03-09
**Brand:** One Community Mortgage
**Stack:** React 19 + TypeScript + Tailwind CSS v4 / .NET 8 API / PostgreSQL 17

---

## Table of Contents

1. [Color Palette & Brand](#color-palette--brand)
2. [Public Site](#public-site)
   - [Home Page](#home-page--)
   - [Apply Wizard](#apply-wizard--apply)
   - [Privacy Policy](#privacy-policy--privacy)
   - [Terms of Service](#terms-of-service--terms)
3. [Borrower Portal](#borrower-portal)
   - [Portal Dashboard](#portal-dashboard--portal)
   - [Application View](#application-view--portalapplication)
4. [Staff CRM](#staff-crm)
   - [Dashboard](#crm-dashboard--crm)
   - [Partners List](#partners-list--crmpartners)
   - [Partner Detail](#partner-detail--crmpartnersid)
   - [Create/Edit Partner](#createedit-partner--crmpartnersnew--crmpartnersidedit)
   - [Leads List](#leads-list--crmleads)
   - [Lead Detail](#lead-detail--crmleadsid)
   - [Create/Edit Lead](#createedit-lead--crmleadsnew--crmleadsidedit)
   - [Funded Clients](#funded-clients--crmfunded)
   - [Pipeline](#pipeline--crmpipeline)
   - [Application Detail](#application-detail--crmpipelineid)
5. [All Dropdown Values](#all-dropdown-values)
6. [All Status Badges](#all-status-badges)
7. [All Form Fields & Validation](#all-form-fields--validation)
8. [All Tables & Columns](#all-tables--columns)
9. [All Modals & Dialogs](#all-modals--dialogs)
10. [Enums Reference](#enums-reference)

---

## Color Palette & Brand

**Brand Name:** One Community Mortgage
**Palette:** Deep Navy + Champagne Gold (Palette 4)

| Role | Hex | Usage |
|---|---|---|
| Primary | `#0B1D3A` | Nav bar, CTA sections, step circles, logo text |
| Primary Dark | `#071428` | Footer background, button hover |
| Primary Light | `#C8D5E3` | Footer subtext, hero subtext |
| Accent / Gold | `#C9A84C` | CTA buttons, register button, info strip, nav hover |
| Accent Dark | `#A8893D` | Gold button hover |
| Background | `#F5F7FA` | Page background |
| Surface | `#FFFFFF` | Cards, inputs |
| Alt Surface | `#E8EDF3` | Muted backgrounds, secondary |
| Text | `#0F1923` | Body text, headings |
| Text Secondary | `#5A6775` | Muted/secondary text |
| Border | `#D1DAE5` | Card borders, input borders |
| Success | `#50C878` | CheckCircle icons, success indicators only |

**Hero Image:** `photo-1600585154340-be6161a56a0c` (modern luxury home exterior)

---

## Public Site

### Home Page (`/`)

**Layout:** PublicLayout (header with logo + login form + nav bar + footer)

**Header (top bar):**
- Logo: "ONE COMMUNITY MORTGAGE" (serif, bold, tracking-widest, navy)
- Username input (text, placeholder: "Username")
- Password input (password, placeholder: "Password")
- LOG IN button (navy) → links to `/portal`
- REGISTER button (gold) → links to `/apply`

**Navigation bar (navy background):**
- Links: BUY A HOME, REFINANCE, VIEW RATES, FAQS, CONTACT US
- Hover color: champagne gold

**Hero section:**
- Full-bleed Unsplash background image with 60% navy overlay
- Headline: "Low Rates. Great Service." (white, 5xl/6xl)
- Subtext: "Home Purchase & Refinance Loans" (light gray)
- 3 pill buttons (gold, uppercase, rounded-full):
  - "Existing Customers" → `/portal`
  - "View Live Rates" → `/apply`
  - "Apply Now" → `/apply`

**Info strip (gold background):**
- Left: "Don't have an online account? Find out what you are missing." (link)
- Right: "Benefits of an Online Account"

**Why Choose Us section:**
- 3 feature cards:
  - Fast Pre-Approval (Clock icon)
  - Competitive Rates (Shield icon)
  - Personal Support (Users icon)

**Our Loan Products section (muted background):**
- 6 product cards (hover: navy border):
  - Purchase — "Buying your first home or next home"
  - Refinance — "Lower your rate or access equity"
  - FHA Loans — "Low down payment options"
  - VA Loans — "For veterans and service members"
  - HELOC — "Home equity lines of credit"
  - Conventional — "Traditional fixed-rate mortgages"

**How It Works section:**
- 4-step process (navy numbered circles):
  1. Apply Online — "Complete our simple 3-step application in minutes"
  2. Get Pre-Approved — "We review your application and provide a decision"
  3. Find Your Home — "Shop with confidence knowing your budget"
  4. Close & Move In — "We handle the paperwork, you get the keys"

**CTA section (navy background):**
- "Ready to Get Started?"
- "Take the first step toward your new home..."
- "Apply Now" button (gold pill)

**Trust Indicators:**
- Licensed in 50 States (green CheckCircle)
- 10,000+ Happy Customers
- A+ BBB Rating
- 4.9/5 Customer Rating

**Footer (dark navy #071428):**
- 4-column grid:
  - Brand name + tagline
  - Quick Links: Home, Apply Now, Check Application Status
  - Legal: Privacy Policy, Terms of Service
  - Contact: (555) 123-4567, info@onecommunity.mortgage
- Copyright: "© 2026 One Community Mortgage. All rights reserved. NMLS #123456"

---

### Apply Wizard (`/apply`)

**Page title:** "Apply for a Mortgage"
**Subtitle:** "Complete the form below to get started. It only takes a few minutes."

**Step Indicator:** Visual 3-step progress bar with numbered circles and connecting lines.

#### Step 1 — Personal Information

| Field | Type | Required | Placeholder | Validation |
|---|---|---|---|---|
| First Name | text | Yes | "John" | Min 1 char |
| Last Name | text | Yes | "Doe" | Min 1 char |
| Email Address | email | Yes | "john.doe@email.com" | Valid email |
| Phone Number | tel | No | "(555) 123-4567" | — |
| Last 4 of SSN | text | Yes | "1234" | Exactly 4 digits |

**Current Address (all optional):**

| Field | Type | Placeholder |
|---|---|---|
| Street Address | text | "123 Main Street" |
| City | text | — |
| State | text | — |
| ZIP Code | text | — |

**Button:** "Continue to Loan Details"

#### Step 2 — Loan Details

| Field | Type | Required | Options/Validation |
|---|---|---|---|
| Loan Type | Select (Radix) | Yes | Purchase, Refinance, HELOC, FHA, VA, Conventional |
| Loan Amount | number | Yes | Min $10,000 — displayed with $ prefix |

**Property Information (all optional):**
- Contextual label: "Enter the address of the property you're purchasing, if known" (Purchase) or "Enter your current property address" (other types)

| Field | Type | Placeholder |
|---|---|---|
| Street Address | text | "456 Oak Lane" |
| City | text | — |
| State | text | — |
| ZIP Code | text | — |
| Property Type | Select (Radix) | Single Family Home, Condominium, Townhouse, Multi-Family (2-4 units) |

**Buttons:** "Back" (outline), "Continue to Review"

#### Step 3 — Review & Submit

- **Personal Information summary** (read-only bordered box): Name, Email, Phone, SSN (masked), Address
- **Loan Details summary** (read-only bordered box): Loan Type, Loan Amount (formatted), Property Type, Property Address
- **Consent checkbox** (required to submit):
  > "I certify that the information provided is true and accurate. I authorize One Community Mortgage to verify my information and run a credit check. I have read and agree to the Terms of Service and Privacy Policy."
- **Buttons:** "Back" (outline), "Submit Application" (primary, disabled until consent checked)

#### Success Screen (after submission)

- Animated green checkmark
- "Application Submitted!"
- "Thank you for your application. We've received your information and will be in touch within 24 hours."
- **What Happens Next:**
  1. "We review your application" — 24-48 hours
  2. "We may request documents" — notified in portal
  3. "You'll receive a decision" — via email and portal
- **Buttons:** "Go to Portal" (primary), "Return Home" (outline)

---

### Privacy Policy (`/privacy`)

Static content page covering:
- Information We Collect (personal, SSN, financial, property, employment)
- How We Use Your Information
- Information Sharing (credit bureaus, lenders, title companies, govt)
- Data Security
- Your Rights (access, correction, deletion, opt-out)
- Contact: privacy@onecommunity.mortgage, (555) 123-4567

---

### Terms of Service (`/terms`)

Static content page covering:
- Acceptance of Terms
- Description of Services
- User Responsibilities (5 items)
- No Guarantee of Approval
- Credit Checks
- Fees and Costs
- Limitation of Liability
- Modifications to Terms
- Governing Law (State of Texas)
- Contact: legal@onecommunity.mortgage, (555) 123-4567

---

## Borrower Portal

### Portal Dashboard (`/portal`)

**Access:** `?applicationId={uuid}` query parameter

**Layout:** PortalLayout — header with gradient (navy), sidebar nav (Dashboard, My Application), "Exit Portal" button

#### No Application State
- Gradient banner: "Welcome to Your Portal"
- Empty state card: FileText icon, "No Application Found", "Start Application" button → `/apply`

#### With Application — Sections

**Welcome Banner:**
- "Welcome back, {firstName}"
- Status-specific subtitle (see Status Config below)

**Progress Tracker (horizontal on desktop, vertical on mobile):**
- 4 steps: Received → In Review → Submitted → Closed
- Icons: Inbox → ClipboardList → Send → CheckCircle
- Completed steps: navy circle with white checkmark
- Current step: navy circle with ring glow
- NeedsDocs override: current step becomes orange with AlertTriangle icon
- Denied override: first step becomes red with XCircle, all others grayed out

**Quick Stats Row (3 cards):**

| Card | Icon | Value | Border Color |
|---|---|---|---|
| Loan Amount | DollarSign | Currency formatted | Navy (left) |
| Days Since Submission | CalendarDays | Number or "Pending" | Blue (left) |
| Pending Documents | FileQuestion | Count | Orange if >0, Green if 0 |

**Document Requests (if any exist):**
- Header: "Document Requests" + pending count badge (orange)
- Each document item shows:
  - Category icon (PayStubs→Receipt, W2s→Building2, TaxReturns→FileCheck, BankStatements→CreditCard)
  - Category name
  - Status badge: Pending (orange) or Fulfilled (green)
  - Responsible party badge (You / Broker / Title Company / Appraiser)
  - Message text (if provided)
- Help text: contact phone/email for document submission

**Loan Summary:**
- Loan Type, Loan Amount, Property Location, Submitted date

**Need Help? Section:**
- Phone: (555) 123-4567
- Email: support@onecommunity.mortgage
- FAQ:
  - "How long does review take?" → 24-48 hours
  - "What if documents are needed?" → Notified in portal and via email
  - "When will I get a decision?" → After review and doc verification

#### Portal Status Config

| Status | Badge Color | Icon | Subtitle |
|---|---|---|---|
| Draft | Gray | FileText | "Your application is still in draft." |
| Received | Blue | Clock | "We've received your application and are getting started." |
| InReview | Yellow | Clock | "Your application is being reviewed by our team." |
| NeedsDocs | Orange | FileQuestion | "We need a few documents from you to continue." |
| Submitted | Purple | CheckCircle | "Your application has been sent to the lender for final review." |
| Closed | Green | CheckCircle | "Congratulations! Your loan has been funded." |
| Denied | Red | AlertCircle | "Unfortunately, your application was not approved." |

---

### Application View (`/portal/application`)

**Access:** `?applicationId={uuid}` query parameter

- Heading: Borrower full name + status badge

**Personal Information card:**
- Full Name, Email, Phone, SSN (last 4 masked as ***-**-XXXX), Address

**Loan Details card:**
- Loan Type, Loan Amount, Property Type, Status badge

**Property Information card (if address exists):**
- Full property address, Property Type badge

**Application Timeline card:**
- Vertical timeline with colored dots and connecting line
- Events based on status progression:
  - "Application Started" (always)
  - "Application Submitted" (if submittedAt exists)
  - "Documents Requested" (if NeedsDocs)
  - "Loan Funded" (if Closed)
  - "Application Denied" (if Denied)

---

## Staff CRM

### CRM Dashboard (`/crm`)

**Layout:** Layout — sidebar with nav (Dashboard, Partners, Leads, Funded, Pipeline), "View Public Site" link

**Stats Cards (4-column grid):**

| Card | Icon | Value | Subtext |
|---|---|---|---|
| Total Leads | UserPlus | Count | "X new, Y in progress" |
| Funded This Month | TrendingUp | Count | "Loans closed" |
| Pipeline Value | DollarSign | Currency | "Active loans" |
| Active Partners | Users | Count | "Contacted in 30 days" |

**Pipeline by Status card:**
- Each status row: label, count, progress bar (width = count/total * 100%)

**Top Referral Partners card:**
- Ranked list: #1, #2, #3...
- Each: partner name (link), "X leads, Y funded"

---

### Partners List (`/crm/partners`)

**Header:** "Partners" / "Manage your referral partners"
**Actions:** "+ Add Partner" button, search input

**Table Columns:**

| Column | Content |
|---|---|
| Name | Link to partner detail |
| Company | Text |
| Type | Badge (Realtor, CPA, Attorney, Past Client, Other) |
| Contact | Email + Phone |
| Last Contact | HealthIndicator component |

**HealthIndicator states:**
- <14 days: Green dot, "X days ago (Healthy)"
- 14-30 days: Yellow dot, "X days ago (Getting stale)"
- >30 days: Red dot, "X days ago (Needs attention)"
- Never: "Never contacted"

---

### Partner Detail (`/crm/partners/{id}`)

- Partner name heading + type badge + company (if exists)
- Edit button, Delete button (opens confirmation dialog)

**Cards:**
- Contact Info: Email (mailto link), Phone (tel link), Last Contact (HealthIndicator)
- Referral Stats: Total Leads, Funded count, Conversion Rate %
- Notes: Text display or "No notes yet."
- Activity Timeline: Log Activity button + recent activities list (date, type badge, description)
- Referred Leads: Clickable list with name, loan type + amount, status badge

---

### Create/Edit Partner (`/crm/partners/new` | `/crm/partners/{id}/edit`)

| Field | Type | Required | Options |
|---|---|---|---|
| Name | text | Yes | — |
| Company | text | No | — |
| Type | NativeSelect | Yes | Realtor, CPA, Attorney, Past Client, Other |
| Email | email | No | Valid email format |
| Phone | text | No | — |
| Notes | textarea (4 rows) | No | — |

**Buttons:** "Create Partner" or "Save Changes" (primary), "Cancel" (outline)

---

### Leads List (`/crm/leads`)

**Header:** "Leads" / "Manage your loan pipeline"
**Actions:** "+ Add Lead" button

**Filters:**
- Search: "Search leads..."
- Status dropdown: All Statuses, New, Contacted, In Progress, Funded, Lost

**Table Columns:**

| Column | Content |
|---|---|
| Name | Link to detail + email subtext |
| Loan Type | Text |
| Amount | Currency formatted |
| Referred By | Partner link or "Direct" |
| Status | Inline NativeSelect dropdown (immediate update) |
| Updated | Relative date |

---

### Lead Detail (`/crm/leads/{id}`)

- Lead full name heading + loan type badge + amount
- Status dropdown (right side, inline update with spinner)
- Edit button, Delete button (opens confirmation dialog)

**Cards:**
- Contact Info: Email (mailto), Phone (tel), Property Address (MapPin icon)
- Referral: Partner name (link) or "Direct (no referral)", Created/Updated dates
- Notes: Text or "No notes yet."
- Activity Timeline: Log Activity button + activities list

---

### Create/Edit Lead (`/crm/leads/new` | `/crm/leads/{id}/edit`)

| Field | Type | Required | Options |
|---|---|---|---|
| First Name | text | Yes | — |
| Last Name | text | Yes | — |
| Email | email | No | Valid email format |
| Phone | tel | No | — |
| Referred By | NativeSelect | No | "No referral (direct)", then all partners by name |
| Loan Type | NativeSelect | Yes | Purchase, Refinance, HELOC |
| Loan Amount | number | No | Placeholder: "e.g. 350000" |
| Property Address | text | No | — |
| Notes | textarea (4 rows) | No | — |

**Buttons:** "Create Lead" or "Save Changes" (primary), "Cancel" (outline)

---

### Funded Clients (`/crm/funded`)

**Header:** "Funded Clients" / "Clients who have successfully closed their loans"
**Right:** Count with green CheckCircle icon
**Filter:** Search input

**Table Columns:**

| Column | Content |
|---|---|
| Name | Link to detail + email subtext |
| Loan Type | Text |
| Amount | Currency |
| Referred By | Partner link or "Direct" |
| Funded | Relative date |

---

### Pipeline (`/crm/pipeline`)

**Header:** "Loan Pipeline" / "Manage loan applications from borrowers"

**Filters:**
- Search: "Search by borrower name or email..."
- Status dropdown (Radix Select): All Statuses, Received, In Review, Needs Documents, Submitted, Closed, Denied

**Table Columns:**

| Column | Content |
|---|---|
| Borrower | Link to detail + email subtext |
| Loan Type | Text |
| Amount | Currency |
| Location | City, State or "—" |
| Status | Colored badge (see badge colors below) |
| Submitted | Date or "—" |

---

### Application Detail (`/crm/pipeline/{id}`)

- Borrower full name + email heading
- Status dropdown (right side, with spinner)

**Tabs:** Overview | Documents

#### Overview Tab
- **Borrower Information card:** Name, Email, Phone, SSN (masked), Address
- **Loan Details card:** Loan Type, Loan Amount, Property Type, Property Address, Submitted date
- **Application Summary card:** Doc Requests count, Pending Docs count (orange text)

#### Documents Tab
- "+ Request Document" button → opens DocRequestModal
- List of existing doc requests:
  - Category name + status badge + responsible party badge
  - Message text (if any)
  - Date requested + requester email
  - Actions (if Pending): "Mark Received" button, Cancel button

---

## All Dropdown Values

### Loan Type (Application Form — Step 2)
| Value | Display Label |
|---|---|
| Purchase | Purchase — Buying a home |
| Refinance | Refinance — Lower your rate |
| HELOC | HELOC — Access home equity |
| FHA | FHA — Low down payment |
| VA | VA — Veterans benefit |
| Conventional | Conventional — Traditional loan |

### Loan Type (Lead Form)
| Value | Display |
|---|---|
| Purchase | Purchase |
| Refinance | Refinance |
| HELOC | HELOC |

### Property Type (Application Form — Step 2)
| Value | Display |
|---|---|
| SingleFamily | Single Family Home |
| Condo | Condominium |
| Townhouse | Townhouse |
| MultiFamily | Multi-Family (2-4 units) |

### Partner Type
| Value | Display |
|---|---|
| Realtor | Realtor |
| CPA | CPA |
| Attorney | Attorney |
| PastClient | Past Client |
| Other | Other |

### Lead Status
| Value | Display |
|---|---|
| New | New |
| Contacted | Contacted |
| InProgress | In Progress |
| Funded | Funded |
| Lost | Lost |

### Application Status (Pipeline)
| Value | Display |
|---|---|
| Draft | Draft |
| Received | Received |
| InReview | In Review |
| NeedsDocs | Needs Documents |
| Submitted | Submitted |
| Closed | Closed |
| Denied | Denied |

### Document Category (Doc Request Modal)
| Value | Display |
|---|---|
| PayStubs | Pay Stubs |
| W2s | W-2s |
| BankStatements | Bank Statements |
| TaxReturns | Tax Returns |
| DriversLicense | Driver's License |
| Other | Other |

### Responsible Party (Doc Request Modal)
| Value | Display |
|---|---|
| Borrower | Borrower |
| Broker | Broker |
| TitleCompany | Title Company |
| Appraiser | Appraiser |

### Doc Request Status
| Value | Display |
|---|---|
| Pending | Pending |
| Fulfilled | Fulfilled |
| Cancelled | Cancelled |

### Activity Type (Log Activity)
| Value | Display |
|---|---|
| Call | Call |
| Email | Email |
| Meeting | Meeting |
| Note | Note |
| StatusChange | Status Change (auto-created) |

---

## All Status Badges

### Lead Status Badges
| Status | Badge Variant | Color |
|---|---|---|
| New | default | Gray background |
| Contacted | secondary | Light background |
| InProgress | warning | Yellow/amber |
| Funded | success | Green |
| Lost | destructive | Red |

### Application Status Badges
| Status | Background | Text |
|---|---|---|
| Received | `bg-blue-100` | `text-blue-800` |
| InReview | `bg-yellow-100` | `text-yellow-800` |
| NeedsDocs | `bg-orange-100` | `text-orange-800` |
| Submitted | `bg-purple-100` | `text-purple-800` |
| Closed | `bg-green-100` | `text-green-800` |
| Denied | `bg-red-100` | `text-red-800` |

### Doc Request Status Badges
| Status | Background | Text |
|---|---|---|
| Pending | `bg-yellow-100` | `text-yellow-800` |
| Fulfilled | `bg-green-100` | `text-green-800` |
| Cancelled | `bg-gray-100` | `text-gray-800` |

### Partner Contact Health
| Condition | Indicator | Label |
|---|---|---|
| <14 days | Green dot | "X days ago (Healthy)" |
| 14-30 days | Yellow dot | "X days ago (Getting stale)" |
| >30 days | Red dot | "X days ago (Needs attention)" |
| Never | — | "Never contacted" |

---

## All Form Fields & Validation

### Application Step 1 — Personal Info
| Field | Type | Required | Validation |
|---|---|---|---|
| First Name | text | Yes | Min 1 character |
| Last Name | text | Yes | Min 1 character |
| Email Address | email | Yes | Valid email format |
| Phone Number | tel | No | — |
| Last 4 of SSN | text | Yes | Exactly 4 digits |
| Street Address | text | No | — |
| City | text | No | — |
| State | text | No | — |
| ZIP Code | text | No | — |

### Application Step 2 — Loan Details
| Field | Type | Required | Validation |
|---|---|---|---|
| Loan Type | Radix Select | Yes | One of 6 application loan types |
| Loan Amount | number | Yes | Minimum $10,000 |
| Property Street Address | text | No | — |
| Property City | text | No | — |
| Property State | text | No | — |
| Property ZIP Code | text | No | — |
| Property Type | Radix Select | No | One of 4 property types |

### Partner Form
| Field | Type | Required | Validation |
|---|---|---|---|
| Name | text | Yes | Min 1 character |
| Company | text | No | — |
| Type | NativeSelect | Yes | One of 5 partner types |
| Email | email | No | Valid email format |
| Phone | text | No | — |
| Notes | textarea | No | — |

### Lead Form
| Field | Type | Required | Validation |
|---|---|---|---|
| First Name | text | Yes | Min 1 character |
| Last Name | text | Yes | Min 1 character |
| Email | email | No | Valid email format |
| Phone | tel | No | — |
| Referred By | NativeSelect | No | Partner list or "No referral" |
| Loan Type | NativeSelect | Yes | Purchase, Refinance, HELOC |
| Loan Amount | number | No | — |
| Property Address | text | No | — |
| Notes | textarea | No | — |

### Doc Request Modal
| Field | Type | Required | Validation |
|---|---|---|---|
| Document Type | Radix Select | Yes | One of 6 document categories |
| Responsible Party | Radix Select | Yes | One of 4 responsible parties |
| Message to Borrower | textarea | No | — |

### Activity Log (Inline)
| Field | Type | Required | Validation |
|---|---|---|---|
| Type | Select | Yes | Call, Email, Meeting, Note |
| Description | text | Yes | "What happened?" |

---

## All Tables & Columns

### Partners Table
| # | Column | Type | Sortable | Notes |
|---|---|---|---|---|
| 1 | Name | Link | — | Links to `/crm/partners/{id}` |
| 2 | Company | Text | — | — |
| 3 | Type | Badge | — | Color-coded by partner type |
| 4 | Contact | Text | — | Email + phone stacked |
| 5 | Last Contact | HealthIndicator | — | Green/yellow/red dot + label |

### Leads Table
| # | Column | Type | Sortable | Notes |
|---|---|---|---|---|
| 1 | Name | Link + subtext | — | Name links to detail, email below |
| 2 | Loan Type | Text | — | — |
| 3 | Amount | Currency | — | Formatted with $ |
| 4 | Referred By | Link or text | — | Partner link or "Direct" |
| 5 | Status | Inline Select | — | Immediate update with spinner |
| 6 | Updated | Relative date | — | e.g. "2 days ago" |

### Funded Table
| # | Column | Type | Notes |
|---|---|---|---|
| 1 | Name | Link + subtext | Name links to detail, email below |
| 2 | Loan Type | Text | — |
| 3 | Amount | Currency | — |
| 4 | Referred By | Link or text | — |
| 5 | Funded | Relative date | — |

### Pipeline Table
| # | Column | Type | Notes |
|---|---|---|---|
| 1 | Borrower | Link + subtext | Name links to detail, email below |
| 2 | Loan Type | Text | — |
| 3 | Amount | Currency | — |
| 4 | Location | Text | City, State or "—" |
| 5 | Status | Colored badge | See badge color reference |
| 6 | Submitted | Date | Formatted date or "—" |

---

## All Modals & Dialogs

### Delete Partner Dialog
- **Trigger:** Delete button on partner detail
- **Title:** "Delete Partner"
- **Description:** "Are you sure you want to delete {name}? This action cannot be undone."
- **Actions:** "Delete" (destructive, with spinner), "Cancel"

### Delete Lead Dialog
- **Trigger:** Delete button on lead detail
- **Title:** "Delete Lead"
- **Description:** "Are you sure you want to delete {fullName}? This action cannot be undone."
- **Actions:** "Delete" (destructive, with spinner), "Cancel"

### Request Document Modal
- **Trigger:** "+ Request Document" button on application detail Documents tab
- **Title:** "Request Document"
- **Fields:** Document Type (select), Responsible Party (select), Message (textarea)
- **Actions:** "Send Request" (primary, disabled until required fields), "Cancel"
- **Side effect:** If application status is InReview, auto-transitions to NeedsDocs

---

## Enums Reference

### Backend Enums (serialized as strings via `JsonStringEnumConverter`)

```
LeadStatus:        New | Contacted | InProgress | Funded | Lost
LoanType (Lead):   Purchase | Refinance | HELOC
ApplicationStatus: Draft | Received | InReview | NeedsDocs | Submitted | Closed | Denied
ApplicationLoanType: Purchase | Refinance | HELOC | FHA | VA | Conventional
DocumentCategory:  PayStubs | W2s | BankStatements | TaxReturns | DriversLicense | Other
DocRequestStatus:  Pending | Fulfilled | Cancelled
ResponsibleParty:  Borrower | Broker | TitleCompany | Appraiser
PartnerType:       Realtor | CPA | Attorney | PastClient | Other
ActivityType:      Call | Email | Meeting | Note | StatusChange
UserRole:          Borrower | Staff | Admin
```

### Implicit Status Transitions
- Creating a doc request on an `InReview` application → auto-transitions to `NeedsDocs`
- PATCH lead status → auto-logs a `StatusChange` activity
- Calling/emailing/meeting a partner → updates `LastContactedAt`

---

## API Endpoints Summary

### Applications — `/api/applications`
| Method | Path | Action |
|---|---|---|
| POST | `/api/applications` | Start new application |
| GET | `/api/applications/{id}` | Get application details |
| PUT | `/api/applications/{id}/step1` | Update personal info |
| PUT | `/api/applications/{id}/step2` | Update loan details |
| POST | `/api/applications/{id}/submit` | Submit (Draft → Received) |
| GET | `/api/applications/{id}/doc-requests` | Get doc requests |

### Pipeline — `/api/pipeline`
| Method | Path | Action |
|---|---|---|
| GET | `/api/pipeline` | List non-draft applications |
| GET | `/api/pipeline/{id}` | Application detail |
| PATCH | `/api/pipeline/{id}/status` | Update status |
| POST | `/api/pipeline/{id}/doc-requests` | Create doc request |
| GET | `/api/pipeline/{id}/doc-requests` | List doc requests |

### Doc Requests — `/api/doc-requests`
| Method | Path | Action |
|---|---|---|
| PATCH | `/api/doc-requests/{id}/status` | Update status |

### Partners — `/api/partners`
| Method | Path | Action |
|---|---|---|
| GET | `/api/partners` | List |
| GET | `/api/partners/{id}` | Detail |
| POST | `/api/partners` | Create |
| PUT | `/api/partners/{id}` | Update |
| DELETE | `/api/partners/{id}` | Delete |

### Leads — `/api/leads`
| Method | Path | Action |
|---|---|---|
| GET | `/api/leads` | List |
| GET | `/api/leads/{id}` | Detail |
| POST | `/api/leads` | Create |
| PUT | `/api/leads/{id}` | Update |
| PATCH | `/api/leads/{id}/status` | Update status |
| DELETE | `/api/leads/{id}` | Delete |

### Activities — `/api/activities`
| Method | Path | Action |
|---|---|---|
| GET | `/api/activities` | List (filter: partnerId, leadId) |
| POST | `/api/activities` | Create |

### Dashboard — `/api/dashboard`
| Method | Path | Action |
|---|---|---|
| GET | `/api/dashboard/stats` | All dashboard stats |

---

## Demo / Seed Data

**Demo Users:**
- `admin@mortgagecrm.com` / `demo123` (Admin)
- `staff@mortgagecrm.com` / `demo123` (Staff)

**Demo Partners:** Sarah Chen (Realtor), Mike Rodriguez (CPA), Jennifer Walsh (Attorney), David Kim (Realtor), Lisa Thompson (PastClient)

**Demo Leads:** 10 leads across all statuses distributed among partners

---

*Document generated 2026-03-09 for One Community Mortgage MVP*
