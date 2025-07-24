# Core Features

## A. Program Management
- Session scheduling & management
- Meeting booking, tracking, & note-taking
- Assignment of mentors, team, and companies
- Notes: global + contextual
- Reports (upload/view/export)

## B. Connections
- Taggable people (mentors, customers, EIRs, investors, etc.)
- Filter, favorite, and explore
- Full relational linkage:
  - Sessions/Meetings show people involved
  - People profiles show related sessions/meetings

## C. Surge (Mentor Marketplace)
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

## D. Admin Console
- Full CRUD controls over sessions, meetings, connections, reports
- Upload files and images to Supabase Storage
- Adjust credits manually
- Assign users and permissions
- Replace Supabase dashboard access completely

## E. Reporting & Analytics
- CSV/PDF exports
- Attendance, mentor engagement, credit usage
- Filterable + downloadable views

## F. Responsive UI
- Built with mobile, desktop, and kiosk views in mind
- Peek panels, tabbed layouts, announcement banners
- Tailored UX per device size 