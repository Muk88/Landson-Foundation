# Setup Instructions - Get Your Website Running

## ✅ Step 1: Environment Variables (DONE)

I've created `.env.local` with placeholder values. The errors should stop after the server restarts.

**To restart the server:**
1. In the terminal, press `Ctrl+C` to stop
2. Run `npm run dev` again

## 🔧 Step 2: Get Real Credentials

### Supabase Setup (5 minutes)

1. **Create Account**: Go to https://supabase.com
2. **New Project**: Click "New Project"
   - Name: Landson Foundation
   - Database Password: (save this!)
   - Region: Choose closest to Kenya
3. **Get API Keys**: 
   - Go to Settings → API
   - Copy `Project URL` → Replace `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → Replace `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role` key → Replace `SUPABASE_SERVICE_ROLE_KEY`
4. **Run Database Schema**:
   - Go to SQL Editor
   - Copy entire content from `database/schema.sql`
   - Paste and click "Run"
5. **Create Admin User**:
   - Go to Authentication → Users
   - Click "Add User"
   - Email: your-email@example.com
   - Password: (your choice)
   - Click "Create User"
   - Copy the user's UUID (long string like `abc123-def456...`)
   - Go back to SQL Editor and run:
     ```sql
     INSERT INTO admin_users (id, email, role)
     VALUES ('paste-uuid-here', 'your-email@example.com', 'admin');
     ```

### Paystack Setup (2 minutes)

1. **Create Account**: Go to https://paystack.com
2. **Get Test Keys**:
   - Go to Settings → API Keys & Webhooks
   - Copy `Test Public Key` → Replace `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - Copy `Test Secret Key` → Replace `PAYSTACK_SECRET_KEY`

## 🎯 Step 3: Test Everything

After updating `.env.local` and restarting the server:

1. **Homepage**: http://localhost:3000
   - Should show impact metrics (once Supabase is set up)
   
2. **Admin Login**: http://localhost:3000/admin/login
   - Login with your Supabase user credentials
   - Add a test success story
   - Update impact metrics
   
3. **Donate Page**: http://localhost:3000/donate
   - Try a test donation (use Paystack test cards)

## 📹 Optional: Add Hero Video

Create or find a 10-30 second video of athletes running, then:
1. Optimize it to under 5MB
2. Save as `public/videos/hero.mp4`

Or leave it - the site works fine without it!

## 🚀 You're Almost There!

Once you:
1. Restart the dev server (Ctrl+C, then `npm run dev`)
2. Add Supabase credentials to `.env.local`
3. Run the database schema
4. Create an admin user

The website will be **fully functional**! 🎉

---

**Current Status**: Website is running with placeholder data. Just needs real Supabase/Paystack credentials to be production-ready.
