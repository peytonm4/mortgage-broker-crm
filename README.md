# Mortgage Broker CRM

A full-stack mortgage broker CRM with a public-facing borrower portal and a staff pipeline management system.

## Tech Stack

- **Backend:** .NET 8, Entity Framework Core, PostgreSQL
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Query
- **Database:** PostgreSQL 17 (Docker)

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Getting Started

### 1. Start the database

Make sure Docker Desktop is running, then start PostgreSQL:

```bash
docker compose up -d
```

This starts a PostgreSQL 17 container on **port 5433** with:
- Database: `mortgagecrm`
- Username: `postgres`
- Password: `postgres`

### 2. Start the API server

```bash
cd api/MortgageCrm.Api
dotnet run
```

The API runs at **http://localhost:5000**. On first run, EF Core will automatically apply migrations and seed demo data.

### 3. Start the frontend

```bash
cd web
npm install
npm run dev
```

The frontend runs at **http://localhost:5173** and proxies `/api` requests to the backend.

## Key URLs

### Public Site
| URL | Description |
|-----|-------------|
| http://localhost:5173 | Home page |
| http://localhost:5173/apply | Borrower application form |
| http://localhost:5173/privacy | Privacy policy |
| http://localhost:5173/terms | Terms of service |

### Borrower Portal
| URL | Description |
|-----|-------------|
| http://localhost:5173/portal | Portal dashboard |
| http://localhost:5173/portal/application | Application view |

### Staff CRM
| URL | Description |
|-----|-------------|
| http://localhost:5173/crm | Dashboard |
| http://localhost:5173/crm/partners | Partners list |
| http://localhost:5173/crm/partners/new | New partner form |
| http://localhost:5173/crm/partners/:id | Partner detail |
| http://localhost:5173/crm/partners/:id/edit | Edit partner |
| http://localhost:5173/crm/leads | Leads list |
| http://localhost:5173/crm/leads/new | New lead form |
| http://localhost:5173/crm/leads/:id | Lead detail |
| http://localhost:5173/crm/leads/:id/edit | Edit lead |
| http://localhost:5173/crm/funded | Funded loans |
| http://localhost:5173/crm/pipeline | Pipeline |
| http://localhost:5173/crm/pipeline/:id | Application detail |

### API
| URL | Description |
|-----|-------------|
| http://localhost:5000/api | API base URL |

## Project Structure

```
mortgage-broker-crm/
  api/
    MortgageCrm.Api/         # .NET 8 Minimal API
      Data/                   # EF Core DbContext, migrations
      Endpoints/              # Minimal API endpoint classes
      Models/                 # Entity models
      Dtos/                   # DTO records
  web/
    src/
      api/                    # Typed API client (axios)
      components/             # Shared UI components
      pages/
        crm/                  # Staff CRM pages
        portal/               # Borrower portal pages
        public/               # Public pages (Home, Apply)
      lib/                    # Utilities (cn, formatCurrency, etc.)
  docker-compose.yml          # PostgreSQL container
```

## Useful Commands

```bash
# Type-check the frontend
cd web && npx tsc --noEmit

# Stop the database
docker compose down

# Reset the database (deletes data)
docker compose down -v && docker compose up -d
```
