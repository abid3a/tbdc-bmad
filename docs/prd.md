
# 🧾 Product Requirements Document (PRD)

**Project**: Horizon Web Platform  
**Client**: Toronto Business Development Centre (TBDC)  
**Purpose**: Help European startups, mentors, and partners stay informed, book meetings, and track program progress in a responsive web app.

---

## 1. 🌟 Vision
Build a centralized web platform to support Horizon, TBDC’s flagship program. This app empowers European companies, mentors, and internal teams to coordinate sessions, meetings, connections, and expert support — with a polished UI and full admin control.

---

## 2. 🧑‍🤝‍🧑 User Types
- **Company Users** (startup teams in the program)
- **Mentors / Experts**
- **TBDC Team Members**
- **Admins / Program Managers**
- *(Future)*: Kiosk Public Viewer, Alumni

---

## 3. 🔑 Core Features

### A. Program Management
- Session scheduling & management
- Meeting booking, tracking, & note-taking
- Assignment of mentors, team, and companies
- Notes: global + contextual
- Reports (upload/view/export)

### B. Connections
- Taggable people (mentors, customers, EIRs, investors, etc.)
- Filter, favorite, and explore
- Full relational linkage:
  - Sessions/Meetings show people involved
  - People profiles show related sessions/meetings

### C. Surge (Mentor Marketplace)
- Discover mentors by expertise
- Credit-based meeting bookings
- Stripe or Supabase Payments for purchasing credits
- Admin credit management panel

**🆕 Calendar Booking (Option A)**:
- Mentors define availability in-app
- Companies see real-time booking slots
- Auto credit deduction
- Supabase stores bookings
- Calendar invites (.ics) sent via email
- If Option A fails, fallback to Option B (external Calendly-style links)

### D. Admin Console
- Full CRUD controls over sessions, meetings, connections, reports
- Upload files and images to Supabase Storage
- Adjust credits manually
- Assign users and permissions
- Replace Supabase dashboard access completely

### E. Reporting & Analytics
- CSV/PDF exports
- Attendance, mentor engagement, credit usage
- Filterable + downloadable views

### F. Responsive UI
- Built with mobile, desktop, and kiosk views in mind
- Peek panels, tabbed layouts, announcement banners
- Tailored UX per device size

---

## 4. 👣 User Journeys
**Admins** manage all aspects via the console.  
**Companies** navigate sessions, meetings, connections, Surge, and reports — all linked.  
**Mentors** manage availability, meeting prep, and sessions.  
**Kiosk mode** offers public program visibility.  
(Full journeys captured in Section 4 above.)

---

## 5. ⚙️ Technical Constraints
- **Backend**: Supabase (Postgres, Auth, RLS, Storage)
- **Frontend**: React (likely Next.js), Tailwind CSS, ShadCN UI
- **Build Order**: Frontend first → backend only on PM’s green light
- **Security**: RLS-based access control per role
- **No CRM Integration in MVP**

---

## 6. 📈 Success Metrics _(TBD, subject to change)_
- Usage % across modules
- Mentor engagement rates
- Admin usage vs. Supabase usage
- UX & support ticket feedback
- Operational efficiency improvements

---

## 7. 🔭 Future Considerations
- AI meeting notes, mentor matching, reminders
- Public showcase mode
- Alumni access
- CRM sync
- Calendar sync (Google/Outlook)
- Application form integration
