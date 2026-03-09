# Project Context

A running log of decisions, changes, and context to preserve across sessions.

---

## Sessions

### 2026-03-08

#### GSD Removed & Reinstalled
- Removed GSD entirely (commands, agents, hooks, settings entries)
- Reinstalled via `npx get-shit-done-cc --claude --global` → v1.22.4
- New version added a `PostToolUse` context monitor hook in addition to the existing `SessionStart` update check and `statusLine`

#### Public Site UI Overhaul
Files changed: `web/src/components/PublicLayout.tsx`, `web/src/pages/public/Home.tsx`, `web/src/index.css`

**PublicLayout.tsx:**
- Replaced single-row header with two-row layout: top bar (logo + inline login form) and dark green nav bar
- Nav links: BUY A HOME, REFINANCE, VIEW RATES, FAQS, CONTACT US
- Footer redesigned to dark background with 4-column grid (brand, quick links, legal, contact)

**Home.tsx:**
- Full-bleed hero section with Unsplash background photo + white overlay
- 3 CTA pill buttons in hero (Existing Customers, View Live Rates, Apply Now)
- Gold info strip below hero
- "Why Choose Us?" feature cards
- Loan products grid (6 types)
- 4-step "How It Works" process
- Dark CTA banner section
- Trust indicators row

**Committed:** `12dffa1`

#### Hero Image Note
- Older numeric Unsplash IDs (e.g. `photo-1600585154340-be6161a56a0c`) hotlink directly — format: `https://images.unsplash.com/photo-{id}?w=1920&q=80`
- Newer alphanumeric IDs (e.g. `G48h926L2qo`) require API auth and do NOT hotlink directly
- Current confirmed working hero: `photo-1600585154340-be6161a56a0c` (modern luxury home exterior)

#### Color Palette Evolution
See `.planning/design/color-history.md` for full details.

- Started with Forest Green (`#1a5c38`) → Emerald (`#059669`) → Emerald + Gold (Palette 2) → **Navy + Gold (Palette 3, current)**
- Active: Primary `#1F3A5F` / Dark `#152A45`, Accent `#FFC145` / Dark `#D99A17`, Background `#F7F9FC`, Text `#16202B`, Support `#50C878`

#### README Updated
- Expanded Key URLs section with full route list organized by section (Public Site, Borrower Portal, Staff CRM, API)

#### Stray File Removed
- Deleted `api/MortgageCrm.Api/dotnet-sdk-8.0.418-osx-x64.pkg` (accidentally placed installer)

#### Navy + Gold Palette Applied (Palette 3) — uncommitted
- Updated `web/src/index.css`, `PublicLayout.tsx`, `Home.tsx` with Navy + Gold colors
- Hero image swapped to `photo-1600585154340-be6161a56a0c` (confirmed working)
- Navy overlay (`#1F3A5F/50`) on hero, headline text updated to white/`#DCE6F2`
- **Not yet committed** — pending user approval

#### CLAUDE.md Created
- `CLAUDE.md` added to repo root with full project context, API docs, enums, conventions, session handoff protocol
- `~/.claude/CLAUDE.md` created globally with auto-invoke rules and behavior preferences

#### MCP Servers Configured
- `~/.claude/mcp.json` created with GitHub, Memory, and Context7 MCPs
- GitHub token needs to be regenerated (was exposed in chat) — update `~/.claude/mcp.json` once new token is available
- Requires Claude Code restart to activate

### 2026-03-09

#### Hero Button Color Fix
- "Existing Customers" hero button was `#1F3A5F` (navy); updated to `#FFC145` / hover `#D99A17` (gold) to match "View Live Rates" and "Apply Now" buttons
- File: `web/src/pages/public/Home.tsx`

#### Apply Wizard — "Continue to Loan Details" Bug Fixed
- **Root cause:** `handleStep1` in `Apply.tsx` called `startMutation.mutateAsync` with no error handling; if the API threw, `setCurrentStep(2)` was never reached and the button appeared to do nothing
- **Immediate cause:** `Users` table has a unique index on `Email` (see `AppDbContext.cs` line 81); submitting with an already-registered email caused a DB constraint violation
- **Frontend fix:** Wrapped API calls in try/catch in both `handleStep1` and `handleStep2`; added `apiError` state that renders a red banner above the card on failure
- **Backend fix:** `StartApplication` endpoint now checks for an existing user by email before inserting; reuses the existing `User`/`Borrower` record instead of creating a duplicate
- Files: `web/src/pages/public/Apply.tsx`, `api/MortgageCrm.Api/Endpoints/ApplicationEndpoints.cs`

#### Committed & Pushed
- Commit `5681ce3` — Navy + Gold palette, CLAUDE.md, hero button color fix — pushed to `origin/master`

### 2026-03-09 (continued)

#### Rebrand to One Community Mortgage + Palette 4
- **Brand renamed:** HomeLoan Pro → One Community Mortgage (all files updated)
- **New palette applied:** Deep Navy + Champagne Gold (Palette 4), derived from One Community Mortgage logo
- Primary `#0B1D3A` / Dark `#071428`, Accent `#C9A84C` / Dark `#A8893D`, Background `#F5F7FA`, Text `#0F1923`
- Files updated: `index.css`, `PublicLayout.tsx`, `Home.tsx`, `PortalLayout.tsx`, `Layout.tsx`, `Terms.tsx`, `Privacy.tsx`, `ReviewStep.tsx`, `PortalDashboard.tsx`
- Email domains changed: `homeloanpro.com` → `onecommunity.mortgage`
- See `.planning/design/color-history.md` for full Palette 4 details

---

## Planning Docs
- `.planning/BACKLOG.md` — full feature backlog organized by area
- `.planning/design/color-history.md` — color palette history

---

## Decisions & Conventions

- **Brand name:** One Community Mortgage
- **Font:** system-ui (no custom font loaded yet)
- **Active color palette:** Palette 4 — Deep Navy + Champagne Gold (see `.planning/design/color-history.md`)
- **Hardcoded colors:** Nav/footer/buttons use hardcoded hex in JSX; CSS variables used for component library (cards, inputs, badges, etc.)
- **No `.gitignore` additions** — user declined adding `*.pkg` to gitignore
- **No GSD planning files** in this repo yet — no PROJECT.md, ROADMAP.md, or `.planning/phases/`
