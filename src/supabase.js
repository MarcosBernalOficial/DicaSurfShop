import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://saqofpljkodufjcmohyz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcW9mcGxqa29kdWZqY21vaHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTQ1MzIsImV4cCI6MjA2MDIzMDUzMn0.X2N0zBd-jseE1FkQP72Av_rRK4QB4DA0v-GCfCN6S9U";

export const supabase = createClient(supabaseUrl, supabaseKey);
