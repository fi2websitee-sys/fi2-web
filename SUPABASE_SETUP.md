# Supabase Setup Instructions for FI2 Website

Follow these steps to set up the backend for your FI2 Student Committee website.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create an account)
2. Click "New Project"
3. Fill in the details:
   - **Name**: `fi2-platform` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to Lebanon (e.g., Frankfurt, Paris)
   - **Pricing Plan**: Free tier is perfect for this project
4. Click "Create new project" and wait 2-3 minutes for setup

## Step 2: Run the Database Migration

1. In your Supabase project dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Open the file `supabase/migrations/20231209_initial_schema.sql` from your project
4. Copy ALL the SQL code and paste it into the Supabase SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. You should see "Success. No rows returned" - this is good!

## Step 3: Create Your First Admin User

1. In Supabase dashboard, go to **Authentication** > **Users** (left sidebar)
2. Click "Add user" > "Create new user"
3. Fill in:
   - **Email**: Your committee email (e.g., media.lufi2@gmail.com)
   - **Password**: Create a secure password
   - **Auto Confirm User**: Enable this (toggle on)
4. Click "Create user"
5. **Important**: Copy the User ID (UUID) - you'll see it in the users table

## Step 4: Get Your API Keys

1. In Supabase dashboard, go to **Project Settings** (gear icon, bottom left)
2. Click **API** in the left menu
3. You'll see:
   - **Project URL**: Starts with `https://xxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJh...`
   - **service_role key**: Another long string (click "Reveal" to see it)

## Step 5: Configure Environment Variables

1. In your project root, create a file called `.env.local`:

```bash
# Copy this into .env.local

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3002
```

2. Replace the values:
   - `YOUR_PROJECT_ID`: From the Project URL
   - `your_anon_key_here`: The anon/public key
   - `your_service_role_key_here`: The service_role key
   - `your_random_secret_here`: Generate with: `openssl rand -base64 32`

3. **IMPORTANT**: `.env.local` is already in `.gitignore` - never commit this file!

## Step 6: Verify Storage Buckets

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. You should see two buckets created:
   - `news-images` - for news article images
   - `documents` - for PDFs (exams, contract sheets)
3. Both should be marked as "Public"

## Step 7: Test Your Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3002/login`

3. Login with the admin email and password you created in Step 3

4. If successful, you'll be redirected to `/admin` dashboard!

## Troubleshooting

### Can't login?
- Check that `.env.local` has the correct API keys
- Verify the user was created in Authentication > Users
- Make sure "Auto Confirm User" was enabled

### Database errors?
- Re-run the SQL migration in SQL Editor
- Check if tables were created in Database > Tables

### Storage errors?
- Verify buckets exist in Storage
- Check that buckets are marked as "Public"

## Next Steps

Once setup is complete:
1. ✅ Login to admin panel at `/admin`
2. ✅ Upload news articles
3. ✅ Upload exam PDFs
4. ✅ Manage all website content

## Security Notes

- **Never** commit `.env.local` to Git
- **Never** share your service_role key publicly
- Service role key has full database access - keep it secret!
- The anon key is safe to use in frontend code

## Need Help?

If you encounter issues:
1. Check Supabase logs: Dashboard > Logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
