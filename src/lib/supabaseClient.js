"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
// lib/supabaseClient.ts
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = 'https://nmqgwfnkbjyxrttorfgl.supabase.co';
var supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tcWd3Zm5rYmp5eHJ0dG9yZmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjczNDQsImV4cCI6MjA2Mjk0MzM0NH0.DygR621t4ihssW4e5u-JXynSfnwcRNAho0v_G8LbGsI';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
