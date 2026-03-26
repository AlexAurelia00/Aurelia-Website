# Supabase Setup Guide for Aurelia Design

## Quick Start

### 1. Create the Database Table

Follow these steps in your Supabase Dashboard (https://app.supabase.com):

1. Go to **SQL Editor**
2. Create a new query
3. Copy and paste the SQL below:

```sql
-- Create the client_inquiries table
CREATE TABLE public.client_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_needed text NOT NULL,
  project_details text NOT NULL,
  submitted_at timestamp with time zone DEFAULT now() NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_client_inquiries_status ON public.client_inquiries(status);
CREATE INDEX idx_client_inquiries_submitted_at ON public.client_inquiries(submitted_at);
CREATE INDEX idx_client_inquiries_email ON public.client_inquiries(email);

-- Enable RLS (Row Level Security) - Public insert, authenticated reads
ALTER TABLE public.client_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert inquiries
CREATE POLICY "Enable insert for all users" ON public.client_inquiries
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all inquiries
CREATE POLICY "Enable select for authenticated users" ON public.client_inquiries
  FOR SELECT USING (true);

-- Allow authenticated users to update inquiries
CREATE POLICY "Enable update for all" ON public.client_inquiries
  FOR UPDATE USING (true);

-- Allow authenticated users to delete inquiries
CREATE POLICY "Enable delete for all" ON public.client_inquiries
  FOR DELETE USING (true);
```

4. Click **Run**

### 2. Update RLS Policies (If Needed)

If you want more security, set up proper authentication policies in the Supabase dashboard.

---

## How It Works

### Contact Form (contact.html)
- Users fill out the form with their name, email, phone, service needed, and project details
- When submitted, data is automatically stored in Supabase
- User gets a confirmation message

### Admin Panel (admin.html)
- **URL**: `https://yoursite.com/admin.html`
- **Login Credentials**: 
  - Email: `admin@aureliadesign.com`
  - Password: `admin123`
  
⚠️ **IMPORTANT**: Change these credentials in production!

### Features
- ✅ View all client inquiries
- ✅ Filter by status (New, In Progress, Completed)
- ✅ Filter by service needed
- ✅ Search by name or email
- ✅ Update inquiry status with dropdown
- ✅ View detailed inquiry information
- ✅ Delete inquiries
- ✅ Statistics dashboard

---

## Production Checklist

### Before Going Live:

1. **Change Admin Credentials**
   - Edit `admin.html` line ~200
   - Change email from `admin@aureliadesign.com` to your email
   - Change password from `admin123` to a strong password

2. **Enable Proper Authentication**
   - Replace the demo login with Supabase Auth
   - Reference: https://supabase.com/docs/guides/auth/quickstarts/javascript

3. **Add Email Notifications** (Optional)
   - Set up Supabase Functions to send email when new inquiry comes in
   - Or use Webhook service

4. **Update Database Policies**
   - Make insert-only for public
   - Restrict read/update/delete to authenticated admin users

5. **Enable CORS** (Already done in Supabase by default)

---

## Files Modified/Created

1. **contact.html** - Added Supabase form handling
2. **admin.html** - New admin dashboard
3. **Assests/js/supabase-init.js** - Supabase configuration and form handler

---

## Database Schema

```
client_inquiries table:
- id (UUID, Primary Key)
- full_name (text)
- email (text)
- phone (text)
- service_needed (text)
- project_details (text)
- submitted_at (timestamp)
- status (text: 'new', 'in_progress', 'completed')
- created_at (timestamp)
```

---

## Troubleshooting

### Issue: "Failed to load data"
- Check that Supabase URL and key are correct
- Verify table is created
- Check browser console for errors (F12)

### Issue: Form doesn't submit
- Ensure table name is exactly `client_inquiries`
- Check that RLS policies allow inserts

### Issue: Admin panel shows no data
- Verify you're logged in
- Check Supabase RLS policies

---

## Security Notes

- Keep API key safe (it's a publishable key, designed for client-side use)
- For sensitive operations, use server-side API
- Consider adding email verification
- Implement rate limiting in production
