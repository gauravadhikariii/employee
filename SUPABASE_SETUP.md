# Supabase setup for PeopleOS

PeopleOS is prepared for **Supabase Free** (Postgres + Auth). This gives admin and employees one shared cloud database, so updates are visible from desktop and phone. The SQL schema and guarded employee-account Edge Function are in `supabase/`.

> **Connection status:** the current preview still uses its browser demo store. It is not connected to a Supabase project yet. Each project has its own URL and public key, so those must come from the project owner before the website can be wired to the live database.

## 1. Create a free project

1. Create a project at Supabase and choose the Free plan.
2. In the project dashboard, open **SQL Editor → New query**.
3. Paste and run all of `supabase/schema.sql`.

The schema separates `admin_profiles`, `employees`, and `employee_compensation`. Attendance and leave requests are separate tables. Row Level Security (RLS) is enabled: admins can manage the team, while an employee can read only their own employee, attendance, and leave records. Salary data is admin-only.

## 2. Create the first administrator

1. In **Authentication → Users**, create a confirmed user using the desired admin email and password.
2. In **SQL Editor**, assign that account as the first admin and add its admin profile. Replace the sample email/name if needed:

```sql
update public.profiles
set role = 'admin'
where email = lower('admin@peopleos.in');

insert into public.admin_profiles (user_id, full_name, title, department, location, timezone)
select id, 'Neha Kapoor', 'Head of People', 'People & Culture', 'Mumbai', 'Asia/Kolkata'
from public.profiles
where email = lower('admin@peopleos.in')
on conflict (user_id) do update set full_name = excluded.full_name;
```

A new Auth account is assigned `employee` by default. Do not let a browser/client choose its own role.

## 3. Deploy secure employee account creation

The Edge Function at `supabase/functions/admin-employees/index.ts` checks the signed-in caller's database role before creating or deleting an Auth account. Deploy it with the Supabase CLI from the project folder:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy admin-employees
```

Supabase provides the function's project URL and service-role secret as function environment variables. **Never place `SUPABASE_SERVICE_ROLE_KEY` in the website or send it in chat.** It bypasses RLS.

## 4. Connect the website

From **Project Settings → API**, copy:

- **Project URL**
- **Publishable key** (or the older `anon` public key)

Send those two public values to the developer so the frontend can be connected and tested. Do not send the `service_role` / secret key. RLS policies must remain enabled.

## Security and deployment notes

- Use Supabase Auth for sign-in and password reset email; do not store passwords in browser storage.
- Deploy the web files on HTTPS (needed for installable PWA / service worker).
- Supabase Free is subject to its current storage, usage and inactivity limits; check the Supabase dashboard for the latest plan limits.
- Until the app's URL/key are configured, the existing preview remains a local demo and its changes do not sync to Supabase or between devices.
