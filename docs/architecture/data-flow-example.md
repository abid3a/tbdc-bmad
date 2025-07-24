# Data Flow Example: Surge Booking

1. Company views mentor availability (from `availability` table)
2. Selects a time slot
3. Booking is validated (available + enough credits)
4. Credit deducted from `credit_balance`
5. `meeting` record created
6. Confirmation email + `.ics` file sent to mentor & company
7. Booking appears in mentor and company dashboards 