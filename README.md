# PeopleOS — Employee Management System

A responsive, mobile-first Employee Management System demo built with plain HTML, CSS and JavaScript. It includes separate admin and employee dashboards, role-based demo screens, a PWA app shell, and Supabase database setup files.

## Demo sign-in

| Role | Login ID | Password |
|---|---|---|
| Admin | `admin@peopleos.in` | `Admin@123` |
| Employee | `aarav@peopleos.in` | `Employee@123` |

The demo **Forgot ID or password?** flow finds a seeded account by name/email and stores the new demo password in the current browser.

## Features

- Admin and employee dashboards with different views
- Admin demo: employee directory CRUD, attendance status updates, leave approvals, reports and CSV exports
- Employee demo: clock in/out, personal attendance, leave requests and personal reports
- Light/dark appearance, profile settings, notification preferences and keyboard shortcuts
- Responsive mobile navigation and PWA manifest/service worker
- Local demo records stored in the current browser

## Important: current database status

The website preview still uses browser `localStorage`; it is **not yet connected to a live database**. The Supabase schema with row-level security and the admin-only employee-account function are prepared in `supabase/`. Before entering real employee data, finish the Supabase frontend integration. See [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md).

Never commit Supabase service-role keys, passwords, or `.env` files. The browser may use only a publishable/anon key after RLS is configured.

## Run locally

Python 3 is enough; there are no npm packages to install:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Open `http://localhost:4173`.

## Publish on GitHub Pages

1. Create a GitHub repository (for example, `peopleos-employee-management`).
2. Push the contents of this project to the repository's `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the build/deployment source.
4. The included workflow at `.github/workflows/deploy.yml` deploys the static site. When it finishes, open the Pages URL from the workflow or the Pages settings.
5. On a phone, open the HTTPS Pages URL in Chrome and choose **⋮ → Install app / Add to Home Screen**.

### Push with Git

Run these commands inside the extracted project folder, replacing `YOUR-USERNAME` and `YOUR-REPO`:

```bash
git init
git add .
git commit -m "Add PeopleOS employee management system"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Supabase setup

See [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) for the free-project setup, schema, admin bootstrap and Edge Function deployment. The live database connection still needs the Supabase Project URL and publishable/anon key; do not use a service-role key in frontend code.
