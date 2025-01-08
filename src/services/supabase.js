// supabase的API的URL和Key
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hgfvypbmvfxhzpsywxpx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnZ5cGJtdmZ4aHpwc3l3eHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNjUxOTIsImV4cCI6MjA1MTg0MTE5Mn0.s5GuCZdbIA2UHvQ9V37ASKfbZYgMb7gqqNmahmNmGrw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
