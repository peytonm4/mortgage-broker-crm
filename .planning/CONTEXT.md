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

#### Color Palette Evolution
See `.planning/design/color-history.md` for full details.

- Started with Forest Green palette (`#1a5c38`) from prior commit
- Iterated through Emerald (`#059669`) briefly
- Settled on **Palette 2 — Emerald + Gold** (user-defined):
  - Primary: `#50C878` / Dark: `#2F9E5A`
  - Accent/Gold: `#FFC145` / Dark: `#D99A17`
  - Background: `#FAFCF8` | Text: `#1E2A22`

#### README Updated
- Expanded Key URLs section with full route list organized by section (Public Site, Borrower Portal, Staff CRM, API)

#### Stray File Removed
- Deleted `api/MortgageCrm.Api/dotnet-sdk-8.0.418-osx-x64.pkg` (accidentally placed installer)

---

## Planning Docs
- `.planning/BACKLOG.md` — full feature backlog organized by area
- `.planning/design/color-history.md` — color palette history

---

## Decisions & Conventions

- **Brand name:** HomeLoan Pro
- **Font:** system-ui (no custom font loaded yet)
- **Active color palette:** Palette 2 — Emerald + Gold (see `.planning/design/color-history.md`)
- **Hardcoded colors:** Nav/footer/buttons use hardcoded hex in JSX; CSS variables used for component library (cards, inputs, badges, etc.)
- **No `.gitignore` additions** — user declined adding `*.pkg` to gitignore
- **No GSD planning files** in this repo yet — no PROJECT.md, ROADMAP.md, or `.planning/phases/`
