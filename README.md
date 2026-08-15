# Helixyn Veyra 🚀

## Employee Lifecycle & Internal Management Platform

Veyra is an internal employee lifecycle management system built for **Helixyn** to streamline the journey from:

**Offer → Onboarding → Team Assignment → Project Assignment → Employee Operations**

The goal is to replace scattered spreadsheets, emails, documents, and manual follow-ups with a single role-aware platform.

## 🎯 Why Veyra Exists

As a growing company scales, employee onboarding and internal operations can become difficult to manage consistently.

Veyra provides a centralized platform where different stakeholders can manage the employee lifecycle through dedicated workflows.

## ✨ Core Features

### 👔 CEO Workspace

* Review and approve employee offers
* View organizational information
* Manage high-level employee workflows

### 🧑‍💼 HR Workspace

* Create and manage employee records
* Manage onboarding workflows
* Track employee documentation
* Handle offer-letter processes
* Track onboarding progress

### 👨‍💻 Team Lead Workspace

* View assigned employees
* Assign teams
* Assign projects
* Manage team-level employee workflows

### 👤 Employee Workspace

* Employee profile
* Onboarding information
* Assigned team and project
* Access to internal employee workflows
* Offer acceptance workflow

### 📄 Document & Offer Management

Veyra includes workflows around offer letters and document processing, including PDF generation and document extraction.

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      Next.js App    │
                    │  Role-based UI/UX   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ Server Actions /    │
                    │    API Routes       │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
       ┌──────▼──────┐  ┌──────▼──────┐  ┌─────▼─────┐
       │   Prisma    │  │  Documents  │  │   Email   │
       │  Database   │  │ PDF Tooling │  │  Resend   │
       └─────────────┘  └─────────────┘  └───────────┘
```

## 🛠️ Tech Stack

| Layer           | Technology                                       |
| --------------- | ------------------------------------------------ |
| Framework       | Next.js 16                                       |
| Frontend        | React 19 + TypeScript                            |
| Styling         | Tailwind CSS                                     |
| Database        | Prisma ORM + SQL                                 |
| Backend         | Next.js Server Actions + API Routes              |
| Authentication  | bcryptjs                                         |
| Cloud / Data    | Supabase                                         |
| PDF / Documents | PDF-Lib, React PDF Renderer, pdf-parse, pdf2json |
| Email           | Resend                                           |
| UI              | Lucide React                                     |

The repository currently includes Next.js, React, TypeScript, Prisma, Supabase, bcryptjs, PDF processing libraries, Resend, Tailwind CSS and related tooling.

## 📁 Project Structure

```text
app/
├── actions/          # Server actions
├── api/              # API routes
├── ceo/              # CEO workspace
├── employee/         # Employee workspace
├── hr/               # HR workspace
├── tl/               # Team Lead workspace
├── accept-offer/     # Offer acceptance flow
├── login/            # Authentication
├── components/       # Shared components
├── page.tsx          # Application entry point
└── layout.tsx        # Root layout

lib/                  # Shared utilities
prisma/               # Database schema and seed logic
extract_text.*        # Document extraction utilities
inspect_pdf.mjs       # PDF inspection utility
```

The codebase is organized around dedicated CEO, HR, Team Lead and Employee areas, alongside authentication, offer acceptance, API and shared component layers.

## 🔄 Employee Lifecycle

```text
HR creates employee
        ↓
Offer generated
        ↓
CEO approval
        ↓
Offer sent
        ↓
Employee accepts
        ↓
Onboarding begins
        ↓
Documents & access tracked
        ↓
Team assigned
        ↓
Project assigned
        ↓
Employee workspace activated
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/helixyn2026-oss/helixyn-veyra.git
cd helixyn-veyra
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file containing the required database, authentication, Supabase and email configuration.

**Never commit production credentials, API keys or secrets.**

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🧩 Engineering Principles

* **Single source of truth** for employee lifecycle information
* **Role-based workflows** rather than one generic dashboard
* **Automation-first** handling of repetitive HR operations
* **Document-aware workflows** for offers and onboarding
* **Modular architecture** for future internal tools and integrations

## 🔮 Future Direction

Veyra is designed to evolve into a broader internal automation platform.

Potential extensions include:

* AI-assisted onboarding
* Internal RAG knowledge assistant
* Employee helpdesk chatbot
* Automated document verification
* Intelligent team/project recommendations
* Attendance automation
* Daily work-summary generation
* HR and leadership analytics
* AI-powered employee insights

## 📌 Project Status

Veyra is an actively developed internal product for the **Helixyn** ecosystem.

## 🏢 About Helixyn

Helixyn is focused on building practical software products and automation systems that reduce operational complexity and improve how teams work.

Veyra is part of that effort — providing a foundation for structured, automated and eventually AI-assisted employee operations.

---

> **Build systems that remove friction, automate the routine, and give people more time to focus on meaningful work.**
