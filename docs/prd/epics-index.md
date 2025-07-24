# Epic Overview - Horizon Web Platform

## Project Summary
The Horizon Web Platform is a comprehensive web application for Toronto Business Development Centre (TBDC) designed to help European startups, mentors, and partners stay informed, book meetings, and track program progress.

## Epic Structure

### Epic 1: Program Management ✅ DRAFT
**Status**: In Progress  
**Stories**: 7 stories (1.1 in Draft)  
**Focus**: Core program management functionality including sessions, meetings, assignments, notes, and reports.

**Key Features:**
- Session scheduling & management
- Meeting booking, tracking, & note-taking
- Assignment of mentors, team, and companies
- Notes: global + contextual
- Reports (upload/view/export)

### Epic 2: Connections
**Status**: Not Started  
**Stories**: 5 stories  
**Focus**: People management and relationship building across the platform.

**Key Features:**
- Taggable people (mentors, customers, EIRs, investors, etc.)
- Filter, favorite, and explore
- Full relational linkage between people and sessions/meetings

### Epic 3: Surge (Mentor Marketplace)
**Status**: Not Started  
**Stories**: 7 stories  
**Focus**: Mentor discovery and booking marketplace with credit system.

**Key Features:**
- Discover mentors by expertise
- Credit-based meeting bookings
- Stripe or Supabase Payments for purchasing credits
- Calendar booking system (Option A with fallback to Option B)
- Admin credit management panel

### Epic 4: Admin Console
**Status**: Not Started  
**Stories**: 8 stories  
**Focus**: Comprehensive admin interface for platform management.

**Key Features:**
- Full CRUD controls over all entities
- Upload files and images to Supabase Storage
- Adjust credits manually
- Assign users and permissions
- Replace Supabase dashboard access completely

### Epic 5: Reporting & Analytics
**Status**: Not Started  
**Stories**: 7 stories  
**Focus**: Data-driven insights and reporting capabilities.

**Key Features:**
- CSV/PDF exports
- Attendance, mentor engagement, credit usage analytics
- Filterable + downloadable views
- Automated reporting

### Epic 6: Responsive UI
**Status**: Not Started  
**Stories**: 7 stories  
**Focus**: Cross-device user experience and modern UI components.

**Key Features:**
- Mobile, desktop, and kiosk views
- Peek panels, tabbed layouts, announcement banners
- Tailored UX per device size
- Accessibility compliance

## Implementation Order

### Phase 1: Foundation (Epic 1)
1. **Epic 1.1**: Project Setup and Authentication ✅ DRAFT
2. **Epic 1.2**: Database Schema and Core Models
3. **Epic 1.3**: Session Management System
4. **Epic 1.4**: Meeting Booking and Management
5. **Epic 1.5**: Assignment Management
6. **Epic 1.6**: Notes System
7. **Epic 1.7**: Reports Management

### Phase 2: Social Layer (Epic 2)
- All Epic 2 stories build on the foundation established in Epic 1

### Phase 3: Marketplace (Epic 3)
- Epic 3 stories depend on both Epic 1 and Epic 2 completion

### Phase 4: Administration (Epic 4)
- Epic 4 requires all previous epics to be completed

### Phase 5: Analytics (Epic 5)
- Epic 5 builds on all previous epics for comprehensive reporting

### Phase 6: Polish (Epic 6)
- Epic 6 enhances the user experience across all previous functionality

## Dependencies and Relationships

```
Epic 1 (Program Management) ← Foundation
    ↓
Epic 2 (Connections) ← Social Layer
    ↓
Epic 3 (Surge) ← Marketplace
    ↓
Epic 4 (Admin Console) ← Administration
    ↓
Epic 5 (Reporting) ← Analytics
    ↓
Epic 6 (Responsive UI) ← Polish
```

## Success Criteria
- All epics completed with acceptance criteria met
- Platform provides comprehensive program management capabilities
- Mentor marketplace drives engagement and bookings
- Admin console enables efficient platform management
- Analytics provide actionable insights
- Responsive design ensures excellent user experience across all devices

## Technical Stack
- **Frontend**: React (Next.js), TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Supabase (PostgreSQL, Auth, RLS, Storage)
- **Payments**: Stripe or Supabase Payments
- **Hosting**: Vercel/Netlify (Frontend), Supabase (Backend)
- **Calendar**: iCal integration with email notifications 