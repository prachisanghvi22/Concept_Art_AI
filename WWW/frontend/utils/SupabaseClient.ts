import { SupabaseClient } from "@supabase/supabase-js";

export const fetchUser = async (supabase: SupabaseClient, clerk_id: string) => {
    return supabase.from("users").select().eq("clerk_id", clerk_id);
};

export const fetchPrompts = async (supabase: SupabaseClient, userId: string) => {
  return supabase.from("newprompts").select().eq("user_id", userId);
};


