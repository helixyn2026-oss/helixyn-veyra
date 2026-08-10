# Helixyn V1: Team Task Delegation

Welcome to the V1 completion sprint! To get our MVP fully functional, we have divided the remaining work into 5 distinct modules. Each team member will own one domain to ensure we hit our goals efficiently without stepping on each other's toes.

---

## 🧑‍💻 Team Member 1: Core UI & Global Navigation
**Focus:** Universal layout, Authentication UX, and overarching navigation mechanics.

- [ ] **Universal Top Navigation:** 
  - Move the user's name and email from the bottom navigation sidebar to the top right, next to the Notification bell.
  - Implement a dropdown menu when clicking the profile/name in the top right.
  - Add a "My Profile" link inside this dropdown.
- [ ] **Login / Homepage Redesign:**
  - Make the login page more unique, modern, and branded for Helixyn. Add animations, better form validation, and a sleek layout.
- [ ] **Global Empty States:** Ensure all modules have beautiful empty states when there is no data to show.

---

## 👔 Team Member 2: HR Module Owner
**Focus:** Human Resources dashboard, employee onboarding, and document management.

- [ ] **HR Dashboard Personalization:** Replace static titles with the actual HR manager's name and company email (fetch these details from the HR profile settings).
- [ ] **HR Settings Cleanup:** Remove all the dummy/mock data currently present in the HR settings page and hook it up to the database.
- [ ] **Fix "Add Department":** The button/form for adding a new department is broken. Wire it up to the Prisma `Department` model so it actually creates and lists departments.
- [ ] **Fix Document Uploads:** The "Upload Document" feature in the HR module is broken. Implement a real file upload mechanism (e.g., uploading to a cloud bucket or local storage).
- [ ] **Separate Onboarding Nav:** Create a distinct navigation bar or tab specifically dedicated to "Onboarding Operations" so it doesn't clutter the main HR view.
- [ ] **New Feature Implementation:** Add a "Leave / Time-Off Requests" approval table so HR can approve/deny employee PTO.

---

## 📈 Team Member 3: CEO Module Owner
**Focus:** Executive overview, reporting, and high-level data management.

- [ ] **CEO Dashboard Personalization:** Replace the static "Executive Command" header with the actual CEO's name.
- [ ] **Fix "Generate Report":** Wire up this button to actually compile and download a PDF or CSV report of company metrics (Headcount, Burn Rate, etc.).
- [ ] **Fix Employee CRUD:** The Add, Edit, and Delete actions for employees on the CEO dashboard are currently non-functional. Wire these up to the backend.
- [ ] **Team & Project Detailed Views:** 
  - When clicking on a Team name, open a modal or new page showing all the members within that team.
  - When clicking on a Project, show the project description and a list of all members currently assigned to it.
- [ ] **Fix Document Uploads:** Similar to HR, fix the document upload functionality in the CEO module.

---

## 🚀 Team Member 4: Team Lead (TL) Module Owner
**Focus:** Agile workflows, sprint planning, and team communications.

- [ ] **TL Dashboard Personalization:** Replace the "Squad Command" header with the actual Team Lead's name.
- [ ] **My Team Roster:** Update the TL dashboard to display full details of the specific team the TL manages, including all team members, their current statuses, and health/workload.
- [ ] **Improvise Project Sprints:** Upgrade the sprint tracking UI. Make tasks draggable (Kanban style) or add better filtering/sorting so TLs can actually plan work.
- [ ] **Google Meet Integration:** Add a new sub-module that allows the TL to instantly generate and share Google Meet links for daily standups or 1-on-1s.
- [ ] **New Feature Implementation:** Add a "Blockers" view so the TL can instantly see if any employee reported a blocker in their daily standup.

---

## 💼 Team Member 5: Employee Module Owner
**Focus:** Employee self-service, daily tasks, and individual productivity.

- [ ] **Employee Dashboard Personalization:** Ensure the top header warmly welcomes the employee by their actual name.
- [ ] **Task Completion Mechanics:** Ensure employees can actually mark their assigned onboarding or project tasks as "Done" and have it reflect in the database.
- [ ] **New Feature Implementation (Self-Service):** 
  - **Time-Off Requests:** Build a UI for employees to request sick leave or vacation days.
  - **Helpdesk / IT Tickets:** Create a simple form where employees can submit IT issues (e.g., "Need a new monitor") which routes to a general table.
  - **Internal Directory:** A searchable page where the employee can find the contact info (email/slack) of their coworkers.

---

*Note: Before starting, ensure everyone pulls the latest `main` branch and runs `npm install` & `npx prisma db push` to keep their local environments in sync!*
