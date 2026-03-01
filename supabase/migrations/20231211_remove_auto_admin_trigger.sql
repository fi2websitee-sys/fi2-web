-- Remove auto-admin trigger that granted admin role to every new Supabase Auth user.
--
-- The trigger was a security design flaw: if public signup or OAuth were ever enabled,
-- every new user would automatically become an admin. Admin profiles must now be
-- created manually by a super_admin via the Supabase dashboard or admin tooling.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
