# Hoppins Car Rental Inquiry Website

Modern mobile-first car rental inquiry website built with React, Tailwind CSS, React Router, Supabase, and Resend.

## Git
1. Clone
```bash
git clone <https://github.com/floki0425/Car-rental.gitl>
cd car_rental_website
```
2. Install
```bash
npm install
```
3. Run locally
```bash
npm run dev
```

## Environment Variables
Copy `.env.example` to `.env` and set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_CLIENT_SLUG`

## Supabase Migration and Seed
Run SQL from:
- `supabase/migrations/20260528170000_init_car_rental.sql`

## Edge Function Setup
```bash
supabase link --project-ref <project-ref>
supabase secrets set RESEND_API_KEY=your_key CONTACT_FROM_EMAIL="Hoppin With Shawn's Car Rental <bookings@example.com>" PROJECT_URL=https://your-project.supabase.co SERVICE_ROLE_KEY=your_service_role_key
supabase functions deploy send-booking-email
```

## Deploy
- Deploy frontend to Vercel/Netlify.
- Add frontend env vars there (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_CLIENT_SLUG`).
- Keep `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `PROJECT_URL`, and `SERVICE_ROLE_KEY` only in Supabase function secrets.

## Suggested Git Workflow
1. `git checkout -b codex/hoppins-build`
2. Make milestone commits.
3. Push and open PR.
