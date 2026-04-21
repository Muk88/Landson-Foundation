# Quick Start Guide - Landson Foundation Website

## ✅ Current Status

Your development server is running at **http://localhost:3000**

The website is now functional with placeholder images!

## 🎯 What Works Right Now

### Public Pages (All Functional)
- ✅ **Home** - http://localhost:3000
- ✅ **About** - http://localhost:3000/about
- ✅ **Programs** - http://localhost:3000/programs
- ✅ **Stories** - http://localhost:3000/stories
- ✅ **Contact** - http://localhost:3000/contact

### Admin Dashboard
- ✅ **Login** - http://localhost:3000/admin/login

## ⚠️ What You Need to Set Up

### 1. Environment Variables (CRITICAL)

You have `.env.local.example` - copy it to `.env.local` and fill in:

```env
# Supabase (Required for database)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Supabase Setup

1. Go to https://supabase.com and create a new project
2. Go to SQL Editor and run the entire `database/schema.sql` file
3. Go to Authentication > Users and create a user
4. Copy the user's UUID and run:
   ```sql
   INSERT INTO admin_users (id, email, role)
   VALUES ('paste-uuid-here', 'admin@example.com', 'admin');
   ```

### 3. Test the Admin Login

Once Supabase is set up:
1. Go to http://localhost:3000/admin/login
2. Login with your admin credentials
3. Explore the dashboard!

## 📝 Current Warnings (Safe to Ignore)

- **Google Fonts timeout**: The app uses fallback fonts, works fine
- **Missing video**: Add `public/videos/hero.mp4` when you have it
- **Placeholder images**: Replace with real photos when ready

## 🚀 Next Steps

1. **Set up Supabase** (5 minutes)
   - Create project
   - Run schema.sql
   - Create admin user

2. **Configure .env.local** (2 minutes)
   - Add Supabase keys

3. **Test Admin Dashboard**
   - Login at /admin/login
   - Add a test success story
   - Update impact metrics
   - Check if it appears on homepage

4. **Replace Placeholder Images**
   - Add real photos to `public/images/`
   - Add hero video to `public/videos/hero.mp4`

## 🎨 Placeholder Images Added

I've added AI-generated placeholder images so you can see the site working:
- runner.jpg - Athlete running
- education.jpg - Students studying
- future.jpg - Graduate with medal
- founder.jpg - Professional portrait
- (and duplicates for all other pages)

**Replace these with your actual photos when ready!**

## 💡 Quick Commands

```bash
# Development server (already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

## 🆘 Troubleshooting

**Issue**: Can't see impact metrics on homepage
**Solution**: Set up Supabase and add initial data to `impact_metrics` table

**Issue**: Can't login to admin
**Solution**: Ensure admin user is added to `admin_users` table in Supabase

**Issue**: Images not loading
**Solution**: Make sure images are in `public/images/` directory

## 📞 Need Help?

Check the main [README.md](file:///c:/Users/user/Downloads/Landson/README.md) for detailed documentation.

---

**You're all set! The website is running and ready for configuration.** 🎉
