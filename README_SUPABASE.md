# Supabase Integration - Quick Reference

## ✅ What's Been Set Up

### 1. **Contact Form Integration** (contact.html)
- Form now stores data in Supabase instead of using mailto
- Shows success/error messages to users
- Fields captured:
  - Full Name
  - Email
  - Phone
  - Service Needed
  - Project Details

### 2. **Admin Dashboard** (admin.html)
- Secure login panel to view all client inquiries
- Real-time statistics (Total, New, In Progress, Completed)
- Advanced filtering and search
- Update inquiry status
- View detailed inquiry information
- Delete inquiries

### 3. **Supabase Configuration**
- **URL**: `https://aruvntvtxsbguztzjwkz.supabase.co`
- **API Key**: `sb_publishable_YCn4vlof9ULaUt2dUP1fug_47A_j-wZ`
- **Scripts**: Supabase JS library automatically loaded
- **Handler**: `supabase-init.js` manages all database operations

---

## 🚀 How to Use

### Step 1: Create the Database Table
1. Open Supabase Dashboard: https://app.supabase.com
2. Go to **SQL Editor**
3. Create new query
4. Copy SQL from `SUPABASE_SETUP.md`
5. Click **Run**

### Step 2: Access Admin Panel
1. Open: `https://yoursite.com/admin.html`
2. Login with:
   - **Email**: `admin@aureliadesign.com`
   - **Password**: `admin123`

### Step 3: Test Contact Form
1. Go to Contact page (contact.html)
2. Fill out the form
3. Click "Send Inquiry"
4. Check admin panel to see the submission

---

## 📊 Admin Panel Features

| Feature | Description |
|---------|-------------|
| **Dashboard Stats** | See total inquiries, new, in progress, completed |
| **Status Filter** | Show only New, In Progress, or Completed |
| **Service Filter** | Filter by service type |
| **Search** | Find by name or email |
| **View Details** | Click "View" to see full inquiry details |
| **Update Status** | Change status directly from table |
| **Delete** | Remove inquiries (with confirmation) |

---

## 🔐 Security Notes

### Current Setup (Demo)
- Admin panel uses simple login (for testing)
- Supabase policies allow public inserts
- Suitable for development

### Production Setup (Recommended)
1. Enable Supabase Auth
2. Change admin credentials
3. Implement email verification
4. Add rate limiting
5. Use environment variables for secrets

---

## 📁 Files Created/Modified

```
✅ New Files:
- admin.html                    (Admin dashboard)
- Assests/js/supabase-init.js   (Supabase config & handlers)
- SUPABASE_SETUP.md             (Database setup guide)

📝 Modified Files:
- contact.html                  (Updated to use Supabase)
- Assests/js/Reuse.js          (Already fixed from earlier)
```

---

## 🔧 Customization

### Change Admin Credentials
Edit `admin.html`, find this section (~line 200):
```javascript
if (email === 'admin@aureliadesign.com' && password === 'admin123') {
```

Change to your preferred email and password.

### Add More Fields to Contact Form
1. Edit `contact.html` - add new input field
2. Edit `supabase-init.js` - add field to formData object
3. Edit `admin.html` - add column to table (optional)
4. Update Supabase table to add new column

### Customize Form Messages
Edit `supabase-init.js`, search for:
- "Thank you! Your inquiry has been received..."
- Change text and colors as needed

---

## ❓ Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Failed to load" error | Check table exists in Supabase, verify URL/key |
| Form won't submit | Ensure RLS policies allow inserts |
| Admin panel blank | Refresh page, check you're logged in |
| Can't login | Verify email/password are correct (case-sensitive) |

---

## 🌐 URLs

- **Contact Form**: `yourdomain.com/contact.html`
- **Admin Panel**: `yourdomain.com/admin.html`
- **Supabase Dashboard**: `https://app.supabase.com`

---

## 📌 Next Steps

1. ✅ Create database table (see SUPABASE_SETUP.md)
2. ✅ Test contact form submission
3. ✅ Access admin panel with test credentials
4. ⏭️ Change admin credentials before going live
5. ⏭️ Set up email notifications (optional)
6. ⏭️ Enable proper authentication (production)

---

Need help? Check SUPABASE_SETUP.md for detailed instructions!
