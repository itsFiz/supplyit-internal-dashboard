
Product Requirements Document (PRD)
Project: SupplyIT Internal Management Dashboard
Owner: NexzGen Strategic Ventures | Division: SME B2B Tech

1. 🧭 Purpose & Vision
The SupplyIT Internal Dashboard is a centralized internal tool for executive oversight of the project’s progress, capital usage, and roadmap. It enables data-driven decision-making and financial transparency across the SupplyIT venture lifecycle.

Key Objectives:

Track budget utilization and burn rate

Monitor fundraising, capital allocation, and ROI projections

Visualize milestone and roadmap progress

Manage hiring plans and key roles

Provide investor and internal reports quickly

2. 🎯 Core Features
Module	Description
Capital Usage Tracker	Real-time dashboard showing allocation vs. actual spend based on seed round structure (e.g., 30% Marketplace, 25% Logistics Workforce)Supply-IT_ Comprehensiv…
MVP Progress Monitor	Visual tracker of MVP milestone progress (e.g., UI/UX → Dev → Pilot → Traction)
Burn Rate & Runway	Auto-calculation of monthly OpEx and projected runway
Financial Forecasting Tool	Editable projection model: GMV growth, cost structures, CAC, LTV, subscription & gig income streamsSupply-IT_ Comprehensiv…
Hiring & Headcount Plan	Key hires (product, devs, operations, growth) + forecasted salary costs
Investor Report Generator	Generate quarterly/adhoc PDF reports for stakeholders
KPI Dashboard	Monitor KPIs: driver signups, deliveries, revenue processed, cost savings for clients, etc.Supply-IT-Infrastructur…
Roadmap Timeline View	Gantt-style visualization of Phases 1–4 and 10-year visionSupply-IT-Infrastructur…

3. 💰 Seed Fund Usage Tracker
Category	Allocation	Key Expense Items
Marketplace Development	30%	Vendor catalog dev, search engine, UX
Delivery Workforce	25%	Driver app, backend logistics infra
Product & Technology	20%	Core system architecture, dev resources
Marketing & Onboarding	15%	SME acquisition, awareness campaigns
Ops & Compliance	10%	Admin, legal, audit, KYCSupply-IT-Infrastructur…

4. 🔢 Financial Metrics to Track
Monthly Burn Rate

Runway Left (based on current bank + burn)

Cumulative Spend vs. Budget

Revenue to Date (Pilot Phase)

GMV Growth

Unit Economics: CAC, LTV, Gross Margin

KPI Benchmarks (2026 Target):

200+ registered drivers

500+ deliveries

RM 100K+ GMV processedSupply-IT-Infrastructur…

5. 👥 Key Hiring Plan
Role	Timeline	Salary Est.	Notes
Tech Lead (Fullstack)	Q4 2025	RM 7k	Oversee MVP completion
Logistics Ops Manager	Q1 2026	RM 6k	Recruit & manage driver fleet
Sales/BD Lead	Q2 2026	RM 5k	SME onboarding & pilot success
Support & QA	Q2 2026	RM 3k	Ensure ops readiness

6. 📍 Roadmap View
Phase	Timeline	Key Deliverables
Phase 1	Mid-2026	Klang Valley pilot, 500+ deliveries, MVP launch
Phase 2	2026–2027	Construction + Events verticals, 5,000 drivers
Phase 3	2027–2028	SG/TH/ID entry, cross-border infra
Phase 4	2028–2030	Fintech + Warehouse APIs, RM10B GMVSupply-IT-Infrastructur…

7. 🔐 Access Control
C-Level (CEO, CFO, COO): Full access

Investors: Read-only access to reports

Ops/Finance: Edit budget and hiring sections

Dev Lead: Update MVP module progress

8. 🧱 Tech Stack Recommendation
Use internal tool frameworks for fast rollout:

Frontend: Next.js + Tailwind CSS (reuse from public platform)

Backend: NeonDB + PostgreSQL (shared stack)

Auth: Role-based access control (Founder, Team, Investor, Client)

Charting: Recharts / Chart.js for financial visuals

Export: PDF export with React-pdf or Puppeteer

9. 🧪 Success Metrics
Dashboard adopted by all leadership by Q1 2026

Monthly reports auto-generated with <10% manual edits

Reduced investor update prep time by 80%

Burn rate tracked with <5% variance monthly

SupplyIT Dashboard – Role Permission Matrix (CRUD)

| **Module / Feature**              |  Founder | Super Admin | Finance Controller | Product Owner | Ops Manager | Tech Lead | Strategy Lead | Sales Lead | Investor | Pilot Client | Advisor |
| --------------------------------- | :------: | :---------: | :----------------: | :-----------: | :---------: | :-------: | :-----------: | :--------: | :------: | :----------: | :-----: |
| **User & Role Management**        | ✅C/R/U/D |   ✅C/R/U/D  |          ❌         |       ❌       |      ❌      |     ❌     |       ❌       |      ❌     |     ❌    |       ❌      |    ❌    |
| **Capital Usage & Budget**        |   ✅R/U   |     ✅R/U    |      ✅C/R/U/D      |       R       |      ❌      |     ❌     |       R       |      R     |     R    |       ❌      |    R    |
| **MVP Milestone Progress**        |   ✅R/U   |     ✅R/U    |          R         |    ✅C/R/U/D   |      R      |    ✅R/U   |      ✅R/U     |      R     |     R    |       ❌      |    R    |
| **Burn Rate & Runway**            |   ✅R/U   |     ✅R/U    |      ✅C/R/U/D      |       R       |      ❌      |     ❌     |       R       |      R     |     R    |       ❌      |    R    |
| **Financial Projections**         |   ✅R/U   |     ✅R/U    |      ✅C/R/U/D      |       R       |      ❌      |     ❌     |       R       |      R     |     R    |       ❌      |    R    |
| **Hiring & Headcount Plan**       |   ✅R/U   |     ✅R/U    |        ✅R/U        |       R       |     ✅R/U    |     R     |       R       |    ✅R/U    |     R    |       ❌      |    R    |
| **Investor Report Generator**     | ✅C/R/U/D |   ✅C/R/U/D  |       ✅C/R/U       |      ✅R/U     |      ❌      |     ❌     |      ✅C/R     |      R     |     R    |       ❌      |    R    |
| **KPI Dashboard**                 |   ✅R/U   |     ✅R/U    |        ✅R/U        |      ✅R/U     |     ✅R/U    |    ✅R/U   |      ✅R/U     |    ✅R/U    |     R    |       R      |    R    |
| **Roadmap & Timeline View**       |   ✅R/U   |     ✅R/U    |          R         |     ✅C/R/U    |      R      |     R     |     ✅C/R/U    |      R     |     R    |       ❌      |    R    |
| **Dev Progress & Infra Status**   |    ✅R    |      ✅R     |          ❌         |       R       |      ❌      |  ✅C/R/U/D |       R       |      ❌     |     R    |       ❌      |    R    |
| **Delivery Network Metrics**      |    ✅R    |      ✅R     |         ✅R         |       R       |    ✅C/R/U   |     ❌     |       R       |      R     |     R    |       ❌      |    R    |
| **Pilot Client Performance View** |    ✅R    |      ✅R     |          ❌         |       R       |      ✅R     |     ❌     |       R       |     ✅R     |     ❌    |   ✅R (self)  |    R    |
| **Compliance & Risk Logs**        |   ✅R/U   |     ✅R/U    |        ✅R/U        |       R       |      ❌      |     ❌     |      ✅R/U     |      ❌     |     ❌    |       ❌      |    R    |


🔑 Legend:
✅C = Create

✅R = Read

✅U = Update

✅D = Delete

❌ = No access

📌 Notes:
Founder and Super Admin have full oversight and admin control.

Finance Controller has deep access into financials but not into product or dev modules.

Product Owner is in charge of MVP tracking and roadmap execution.

Operations Manager controls driver network and performance metrics.

Tech Lead controls system development status but not finance or hiring.

Investor, Advisor, and Pilot Client are limited to read-only in relevant sections.

SUPPLYIT.IO – INTERNAL DASHBOARD PRD (PRE-MVP)
🧠 Project Name
SupplyIT.io – Internal Management Dashboard (Pre-MVP)
Category: B2B Logistics SaaS
Stage: Pre-MVP (RM 25,000 budget)

🎯 Goal
Track early development progress, capital use, and team responsibilities transparently — even before pre-seed funding. Enable core stakeholders to:

Monitor budget spend vs projection

Track design and dev milestones

Assign roles & tasks

View launch readiness at a glance

🔐 Roles
Role	Access Level
Founder	Full access (CRUD)
Team Member	Read/update own tasks
Advisor	Read-only
Intern	View only
Future Investor	Read-only (preview mode)

📊 Dashboard Modules
1. Budget Overview
Category	Est. Cost (RM)	Notes
UI/UX Design	RM 8,000	Wireframes, prototype, feedback loops
Initial Dev Setup	RM 10,000	Basic frontend/backend, repo setup
Domain & Infra	RM 5,000	Google Workspace, domain, hosting
Ops & Admin	RM 2,000	Pre-incorporation tasks, templates, compliance docs

✅ Static display with optional edit mode if role = founder

2. Milestone Tracker
Milestone	Target Date	Status
Design system + wireframes ready	Oct 20, 2025	Pending
Clickable MVP prototype demo	Oct 30, 2025	Pending
Stakeholder feedback & alignment	Nov 5, 2025	Pending
Tech repo and infra setup	Nov 10, 2025	Pending
Trello roadmap & task assignments	Nov 15, 2025	Pending
Domain/email/workspace live	Nov 10, 2025	Pending

🎯 Mark completed by clicking a checkbox, editable by founders only

3. Team Management
Role	Involvement	Monthly Cost (RM)	Notes
Founder / PM / Dev	Full-time	RM 0	Sweat equity, leading dev
UI/UX Intern	Part-time	RM 1,000	On stipend
Freelance Dev	Ad-hoc	RM 1,500	Per-task basis
Advisor	Advisory only	RM 0	Equity-based contribution

👥 Assign labels like “Confirmed”, “To Hire”, “Freelance Pool”

4. KPI Quick View
Metric	Goal
Design ready	Oct 20, 2025
Prototype demo	Oct 30, 2025
Stakeholder approval	Nov 5, 2025
Tech setup + repo	Nov 10, 2025

🛠️ Tech Stack
Frontend: Next.js 14 + Tailwind CSS

Backend: File-based or local JSON for now (pre-database)

Role Management: Basic RBAC using Zustand/Auth context

Export Functionality: Add optional PDF report export using react-pdf

🚩 Future Extensions
Add burn rate calculator once funding is secured

Build a financial projection chart

Enable stakeholder feedback forms

Integrate with Slack/Telegram alerts for milestone completion