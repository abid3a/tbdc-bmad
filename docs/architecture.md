
# 🏗 Horizon App Architecture

This document outlines the technical architecture for the Horizon Web App developed for Toronto Business Development Centre (TBDC). The app supports European companies expanding to North America by enabling seamless management of sessions, meetings, mentor bookings, and internal collaboration.

---

## 🔧 System Overview

**Architecture Type**: Full-stack web application with Supabase backend and React-based frontend.

- **Frontend**: React (Next.js), Tailwind CSS, ShadCN UI
- **Backend**: Supabase (PostgreSQL, Auth, RLS, Storage)
- **Hosting**: Vercel or Netlify (for frontend), Supabase (for backend)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage for images, files, and reports

---

## 🗂 Key Modules

### 1. **Sessions**
- Fields: `uid`, `topic`, `status`, `type`, `date`, `duration`, `end_time`, `description`, `location`, `connection_uids[]`, `company_uid`, `cohort`
- Linked to: Connections, Companies
- Companies only see sessions tied to their assigned cohort

### 2. **Meetings**
- Fields: `uid`, `topic`, `type`, `status`, `date`, `duration`, `end_time`, `location`, `connections[]`, `company_uid`, `notes[]`
- Linked to: Connections, Companies, Notes
- Visible only to the associated company and participants

### 3. **Connections (People)**
- Fields: `uid`, `name`, `linkedin`, `role`, `bio`, `industry`, `type`, `image`, `company_uid`, `session_uids[]`, `meeting_uids[]`
- Types: Mentor, Customer, EIR, Investor, etc.
- Linked to: Sessions, Meetings

### 4. **Companies**
- Fields: `uid`, `name`, `industry`, `contact_info`, `team_members[]`, `credit_balance`, `cohort`

### 5. **Notes**
- Fields: `uid`, `content`, `linked_type`, `linked_id`, `created_by`, `created_at`
- Can be linked globally or to a session/meeting

### 6. **Reports**
- Uploaded as files (PDF, CSV)
- Stored in Supabase Storage with metadata
- Access restricted to the associated company and admins

### 7. **Surge (Mentor Booking Marketplace)**
- Availability Table: `mentor_id`, `day`, `time_range`
- Bookings Table: `mentor_id`, `company_id`, `datetime`, `status`, `credit_cost`
- Logic: Deduct credits → create meeting → send calendar invite

### 8. **Admin Console**
- Full CRUD management for all entities
- Manual credit adjustment
- Role and user permission management
- Opens in a separate tab with a dedicated app management layout and its own side navigation

This approach separates administrative operations from the core company/mentor views, making it easier to scale and control access while providing a clean interface tailored for operational tasks. It is a good idea as it prevents UI clutter and enforces clearer access control.

---

## 🔐 Auth & Permissions

**Supabase Auth + RLS Policies:**
- Roles: `admin`, `team`, `company`, `mentor`, `viewer`
- RLS policies restrict data access based on role and ownership
- Admins have full access
- Companies only access their cohort sessions, their meetings, reports, and connections
- Mentors only access their own availability, bookings, and sessions

---

## 🔁 Data Flow Example: Surge Booking
1. Company views mentor availability (from `availability` table)
2. Selects a time slot
3. Booking is validated (available + enough credits)
4. Credit deducted from `credit_balance`
5. `meeting` record created
6. Confirmation email + `.ics` file sent to mentor & company
7. Booking appears in mentor and company dashboards

---

## 📱 Frontend Architecture

**Main Pages:**
- Home (Dashboard)
- Sessions
- Meetings
- Connections
- Surge
- Reports
- Admin Panel (conditional rendering based on role, opens as separate app view)

**Shared Components:**
- Peek Panels
- Tabbed Navigation
- Announcement Banners
- Credit Counter & Management
- Note Editors

**Responsive Design:**
- Tailwind-based layout with full mobile/kiosk/desktop responsiveness
- Sidebar collapsible on mobile

---

## 🧱 Folder Structure (Proposed)
```
/tbdc-horizon
├── components/
│   ├── SessionCard.tsx
│   ├── MeetingCard.tsx
│   ├── ConnectionProfile.tsx
│   ├── SurgeBooking.tsx
│   └── AdminControls.tsx
├── pages/
│   ├── index.tsx (Home)
│   ├── sessions/
│   ├── meetings/
│   ├── surge/
│   ├── connections/
│   └── admin/ (separate admin console view)
├── lib/
│   ├── supabaseClient.ts
│   ├── auth.ts
│   └── calendar.ts (iCal logic)
├── styles/
├── utils/
├── public/
└── supabase/schema.sql
```

---

## 📌 Build Flow
- Phase 1: Frontend-first development with mocked data and complete UI/UX
- PM approval triggers backend development
- Supabase backend hooked to frontend via typesafe client
- Final integration: bookings, credit logic, uploads, RLS policies

---

## 📤 Integrations
- Stripe (or Supabase Payments) for Surge credits
- Email + `.ics` calendar invite on booking
- Future optional: Zapier for Google Calendar sync

---

This document will evolve as implementation begins. Next steps: define wireframes, refine DB schema, generate Supabase RLS policies.
