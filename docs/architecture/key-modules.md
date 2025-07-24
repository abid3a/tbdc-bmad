# Key Modules

## 1. **Sessions**
- Fields: `uid`, `topic`, `status`, `type`, `date`, `duration`, `end_time`, `description`, `location`, `connection_uids[]`, `company_uid`, `cohort`
- Linked to: Connections, Companies
- Companies only see sessions tied to their assigned cohort

## 2. **Meetings**
- Fields: `uid`, `topic`, `type`, `status`, `date`, `duration`, `end_time`, `location`, `connections[]`, `company_uid`, `notes[]`
- Linked to: Connections, Companies, Notes
- Visible only to the associated company and participants

## 3. **Connections (People)**
- Fields: `uid`, `name`, `linkedin`, `role`, `bio`, `industry`, `type`, `image`, `company_uid`, `session_uids[]`, `meeting_uids[]`
- Types: Mentor, Customer, EIR, Investor, etc.
- Linked to: Sessions, Meetings

## 4. **Companies**
- Fields: `uid`, `name`, `industry`, `contact_info`, `team_members[]`, `credit_balance`, `cohort`

## 5. **Notes**
- Fields: `uid`, `content`, `linked_type`, `linked_id`, `created_by`, `created_at`
- Can be linked globally or to a session/meeting

## 6. **Reports**
- Uploaded as files (PDF, CSV)
- Stored in Supabase Storage with metadata
- Access restricted to the associated company and admins

## 7. **Surge (Mentor Booking Marketplace)**
- Availability Table: `mentor_id`, `day`, `time_range`
- Bookings Table: `mentor_id`, `company_id`, `datetime`, `status`, `credit_cost`
- Logic: Deduct credits → create meeting → send calendar invite

## 8. **Admin Console**
- Full CRUD management for all entities
- Manual credit adjustment
- Role and user permission management
- Opens in a separate tab with a dedicated app management layout and its own side navigation

This approach separates administrative operations from the core company/mentor views, making it easier to scale and control access while providing a clean interface tailored for operational tasks. It is a good idea as it prevents UI clutter and enforces clearer access control. 