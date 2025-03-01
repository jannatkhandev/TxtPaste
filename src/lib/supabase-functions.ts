// /src/lib/supabase-functions.ts

import { createClient } from "@/auth/server";
import { Database } from "../types/supabase"; // You'll need to generate this type

export async function getProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function createPaste(paste: Database['public']['Tables']['pastes']['Insert']) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pastes')
    .insert(paste)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getPasteBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pastes')
    .select('*, profiles(username)')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
}

export async function updatePaste(pasteId: string, updates: Partial<Database['public']['Tables']['pastes']['Update']>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pastes')
    .update(updates)
    .eq('id', pasteId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePaste(pasteId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('pastes')
    .delete()
    .eq('id', pasteId);
  if (error) throw error;
}

export async function getUserPastes(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pastes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function incrementPasteView(pasteId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .rpc('increment_paste_view', { paste_id: pasteId });
  if (error) throw error;
}

export async function createProfile(profile: {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
    .single();

  if (error) throw error;
  return data;
}