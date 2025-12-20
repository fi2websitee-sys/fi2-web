-- =====================================================
-- FI2 STUDENT COMMITTEE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. NEWS & EVENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.news_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_ar TEXT,
  excerpt TEXT NOT NULL,
  excerpt_ar TEXT,
  content TEXT,
  content_ar TEXT,
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  author_id UUID REFERENCES auth.users(id)
);

-- Create index for faster queries
CREATE INDEX idx_news_published ON public.news_items(published);
CREATE INDEX idx_news_created_at ON public.news_items(created_at DESC);
CREATE INDEX idx_news_slug ON public.news_items(slug);

-- =====================================================
-- 2. PREVIOUS EXAMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.previous_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_name TEXT NOT NULL,
  course_name_ar TEXT,
  major TEXT NOT NULL CHECK (major IN ('journalism', 'pr', 'marketing', 'info-management', 'data-science', 'common')),
  year_level TEXT NOT NULL,
  semester TEXT NOT NULL CHECK (semester IN ('semester1', 'semester2')),
  academic_year TEXT NOT NULL,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('midterm', 'final', 'quiz')),
  pdf_url TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id)
);

-- Create indexes
CREATE INDEX idx_exams_major ON public.previous_exams(major);
CREATE INDEX idx_exams_year ON public.previous_exams(year_level);
CREATE INDEX idx_exams_semester ON public.previous_exams(semester);
CREATE INDEX idx_exams_academic_year ON public.previous_exams(academic_year);

-- =====================================================
-- 3. ENTRANCE EXAMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.entrance_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year TEXT NOT NULL,
  major TEXT NOT NULL,
  major_ar TEXT,
  exam_date DATE,
  pdf_url TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id)
);

-- Create index
CREATE INDEX idx_entrance_exams_year ON public.entrance_exams(academic_year);

-- =====================================================
-- 4. CONTRACT SHEETS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contract_sheets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_name TEXT NOT NULL,
  program_name_ar TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('bachelor', 'master')),
  major TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id)
);

-- Create index
CREATE INDEX idx_contract_sheets_level ON public.contract_sheets(level);

-- =====================================================
-- 5. CONTACT FORM SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index
CREATE INDEX idx_contact_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_created_at ON public.contact_submissions(created_at DESC);

-- =====================================================
-- 6. ADMIN PROFILES TABLE (extends auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- 7. CREATE STORAGE BUCKETS
-- =====================================================

-- Bucket for news images
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket for PDF files (exams, contract sheets)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 8. STORAGE POLICIES
-- =====================================================

-- Allow public read access to news images
CREATE POLICY "Public read access for news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

-- Allow authenticated users (admins) to upload news images
CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images'
  AND auth.role() = 'authenticated'
);

-- Allow admins to delete news images
CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-images'
  AND auth.role() = 'authenticated'
);

-- Allow public read access to documents
CREATE POLICY "Public read access for documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

-- Allow authenticated users (admins) to upload documents
CREATE POLICY "Admins can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents'
  AND auth.role() = 'authenticated'
);

-- Allow admins to delete documents
CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents'
  AND auth.role() = 'authenticated'
);

-- =====================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.previous_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entrance_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- News Items Policies
CREATE POLICY "Anyone can view published news"
ON public.news_items FOR SELECT
USING (published = true);

CREATE POLICY "Admins can view all news"
ON public.news_items FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert news"
ON public.news_items FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update news"
ON public.news_items FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete news"
ON public.news_items FOR DELETE
USING (auth.role() = 'authenticated');

-- Previous Exams Policies
CREATE POLICY "Anyone can view previous exams"
ON public.previous_exams FOR SELECT
USING (true);

CREATE POLICY "Admins can insert previous exams"
ON public.previous_exams FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update previous exams"
ON public.previous_exams FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete previous exams"
ON public.previous_exams FOR DELETE
USING (auth.role() = 'authenticated');

-- Entrance Exams Policies
CREATE POLICY "Anyone can view entrance exams"
ON public.entrance_exams FOR SELECT
USING (true);

CREATE POLICY "Admins can insert entrance exams"
ON public.entrance_exams FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update entrance exams"
ON public.entrance_exams FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete entrance exams"
ON public.entrance_exams FOR DELETE
USING (auth.role() = 'authenticated');

-- Contract Sheets Policies
CREATE POLICY "Anyone can view contract sheets"
ON public.contract_sheets FOR SELECT
USING (true);

CREATE POLICY "Admins can insert contract sheets"
ON public.contract_sheets FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update contract sheets"
ON public.contract_sheets FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete contract sheets"
ON public.contract_sheets FOR DELETE
USING (auth.role() = 'authenticated');

-- Contact Submissions Policies
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert contact submissions"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions FOR UPDATE
USING (auth.role() = 'authenticated');

-- Admin Profiles Policies
CREATE POLICY "Admins can view admin profiles"
ON public.admin_profiles FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update own profile"
ON public.admin_profiles FOR UPDATE
USING (auth.uid() = id);

-- =====================================================
-- 10. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.news_items
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.previous_exams
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.entrance_exams
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.contract_sheets
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Function to create admin profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create admin profile
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- DONE! Your database is ready.
-- Next steps:
-- 1. Create your first admin user in Supabase Auth dashboard
-- 2. Add the environment variables to .env.local
-- 3. Run the Next.js app
-- =====================================================
