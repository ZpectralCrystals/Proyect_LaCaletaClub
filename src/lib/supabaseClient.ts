// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nmqgwfnkbjyxrttorfgl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tcWd3Zm5rYmp5eHJ0dG9yZmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjczNDQsImV4cCI6MjA2Mjk0MzM0NH0.DygR621t4ihssW4e5u-JXynSfnwcRNAho0v_G8LbGsI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
