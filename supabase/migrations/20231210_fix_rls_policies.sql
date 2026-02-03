-- =====================================================
-- SECURITY FIX: Strengthen RLS Policies
-- Issue: Current policies only check auth.role() = 'authenticated'
-- Fix: Check admin_profiles table for actual admin role
-- =====================================================

-- Drop existing weak policies
DROP POLICY IF EXISTS "Admins can view all news" ON public.news_items;
DROP POLICY IF EXISTS "Admins can insert news" ON public.news_items;
DROP POLICY IF EXISTS "Admins can update news" ON public.news_items;
DROP POLICY IF EXISTS "Admins can delete news" ON public.news_items;

DROP POLICY IF EXISTS "Admins can insert previous exams" ON public.previous_exams;
DROP POLICY IF EXISTS "Admins can update previous exams" ON public.previous_exams;
DROP POLICY IF EXISTS "Admins can delete previous exams" ON public.previous_exams;

DROP POLICY IF EXISTS "Admins can insert entrance exams" ON public.entrance_exams;
DROP POLICY IF EXISTS "Admins can update entrance exams" ON public.entrance_exams;
DROP POLICY IF EXISTS "Admins can delete entrance exams" ON public.entrance_exams;

DROP POLICY IF EXISTS "Admins can insert contract sheets" ON public.contract_sheets;
DROP POLICY IF EXISTS "Admins can update contract sheets" ON public.contract_sheets;
DROP POLICY IF EXISTS "Admins can delete contract sheets" ON public.contract_sheets;

DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = user_id
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- News Items - Secure Admin Policies
CREATE POLICY "Admins can view all news"
ON public.news_items FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert news"
ON public.news_items FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update news"
ON public.news_items FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete news"
ON public.news_items FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Previous Exams - Secure Admin Policies
CREATE POLICY "Admins can insert previous exams"
ON public.previous_exams FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update previous exams"
ON public.previous_exams FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete previous exams"
ON public.previous_exams FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Entrance Exams - Secure Admin Policies
CREATE POLICY "Admins can insert entrance exams"
ON public.entrance_exams FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update entrance exams"
ON public.entrance_exams FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete entrance exams"
ON public.entrance_exams FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Contract Sheets - Secure Admin Policies
CREATE POLICY "Admins can insert contract sheets"
ON public.contract_sheets FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update contract sheets"
ON public.contract_sheets FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete contract sheets"
ON public.contract_sheets FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Contact Submissions - Secure Admin Policies
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Storage Policies - Secure Admin Policies
DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete documents" ON storage.objects;

CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'news-images'
  AND public.is_admin(auth.uid())
);

CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'news-images'
  AND public.is_admin(auth.uid())
);

CREATE POLICY "Admins can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents'
  AND public.is_admin(auth.uid())
);

CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents'
  AND public.is_admin(auth.uid())
);
