# Auth & Permissions

**Supabase Auth + RLS Policies:**
- Roles: `admin`, `team`, `company`, `mentor`, `viewer`
- RLS policies restrict data access based on role and ownership
- Admins have full access
- Companies only access their cohort sessions, their meetings, reports, and connections
- Mentors only access their own availability, bookings, and sessions 