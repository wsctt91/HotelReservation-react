import supabase from "./supabase";

export async function getHotels() {
  const { data, error } = await supabase.from("hotels").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch hotels");
  }
  return data;
}
