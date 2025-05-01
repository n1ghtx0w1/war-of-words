import { supabase } from "./supabase";

// Load the latest hero for the current user
export const loadPlayerHero = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("No user session");

  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }) // latest first
    .limit(1)
    .single();

  if (error) throw new Error("Failed to load hero");

  return data;
};

// DeleteHero to free up room
export const deleteHero = async (heroId: string) => {
  const { error } = await supabase.from("heroes").delete().eq("id", heroId);
  if (error) throw new Error("Failed to delete hero");
};
