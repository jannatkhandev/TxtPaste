import { createClient, getUser, protectRoute } from "@/auth/server";
import AccountForm from "@/components/AccountForm";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  try {
    await protectRoute();
  } catch (error) {
    redirect('/login');
  }

  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const supabase = await createClient();
  
  let { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching profile:', fetchError);
    throw new Error('Failed to fetch user profile');
  }

  // If profile doesn't exist, create one
  if (!profile) {
    const newProfileData = { 
      id: user.id, 
      full_name: user.user_metadata?.full_name || '',
      username: user.email?.split('@')[0] || '',
      avatar_url: user.user_metadata?.avatar_url || '',
    };

    console.log('Attempting to create new profile:', newProfileData);

    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert([newProfileData])
      .select()
      .single();

    if (insertError) {
      console.error('Error creating profile:', insertError);
      console.error('User data:', user);
      console.error('Attempted profile data:', newProfileData);
      throw new Error(`Failed to create user profile: ${insertError.message}`);
    }

    profile = newProfile;
  }

//   console.log('Final profile data:', profile);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <AccountForm user={user} profile={profile} />
    </div>
  );
}