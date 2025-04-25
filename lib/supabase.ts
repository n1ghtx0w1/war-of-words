// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uajkheothxfizsnuahtz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhamtoZW90aHhmaXpzbnVhaHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NTczNjEsImV4cCI6MjA2MTAzMzM2MX0.OB4m0gmPeBoZ0qdeU4V0z1nUNrWKGVi-YdvsqwYV9xM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
