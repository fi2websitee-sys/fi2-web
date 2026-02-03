import { createClient } from '@/lib/supabase/server';

/**
 * Check if authenticated user is an admin
 * Used in server components and API routes
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = createClient();
  
  const { data: adminProfile } = await supabase
    .from('admin_profiles')
    .select('role')
    .eq('id', userId)
    .single();

  return adminProfile?.role === 'admin' || adminProfile?.role === 'super_admin';
}

/**
 * Get admin profile for authenticated user
 */
export async function getAdminProfile(userId: string) {
  const supabase = createClient();
  
  const { data: adminProfile, error } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !adminProfile) {
    return null;
  }

  return adminProfile;
}
