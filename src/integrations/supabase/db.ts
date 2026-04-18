// Untyped supabase client wrapper for places where the generated types
// cause `never` inference issues. Use this only when needed.
import { supabase as typedSupabase } from "./client";
export const db = typedSupabase as any;
