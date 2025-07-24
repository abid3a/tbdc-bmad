# Folder Structure (Proposed)

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