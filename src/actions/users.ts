"use server";

import { createClient, protectRoute } from "../auth/server";
import { getErrorMessage } from "../lib/utils";

export const createAccountAction = async (formData: FormData) => {
  try {
    const supabase = await createClient()

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const loginAction = async (formData: FormData) => {
  try {
    const supabase = await createClient()
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const resetPasswordAction = async (formData: FormData) => {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(formData.get('email') as string)

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signOutAction = async () => {
  try {
    await protectRoute();

    const { auth } = await createClient();

    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};