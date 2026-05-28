# DriveGo Car Rental Inquiry Website

Modern mobile-first car rental inquiry website built with React, Tailwind CSS, React Router, Supabase, and Resend.

## Git
1. Clone
```bash
git clone <your-repo-url>
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
- `VITE_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `WHATSAPP_NUMBER`

## Supabase Migration and Seed
Run SQL from:
- `supabase/migrations/20260528170000_init_car_rental.sql`

## Edge Function Setup
```bash
supabase link --project-ref <project-ref>
supabase secrets set RESEND_API_KEY=your_key ADMIN_EMAIL=you@example.com
supabase functions deploy send-booking-email
```

## Deploy
- Deploy frontend to Vercel/Netlify.
- Add frontend env vars there (`VITE_...`, `WHATSAPP_NUMBER`).
- Keep `RESEND_API_KEY` only in Supabase function secrets.

## Suggested Git Workflow
1. `git checkout -b codex/drivego-build`
2. Make milestone commits.
3. Push and open PR.

