import { createClient } from '@supabase/supabase-js'

// ВАЖНО: Тут используй 'ANON' ключ (public), а НЕ service_role!
// Сайт - это публичное место, service_role тут хранить нельзя.
const supabaseUrl = 'https://ofzcxiqkfbomkqcaeshx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9memN4aXFrZmJvbWtxY2Flc2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5Mzc1NTUsImV4cCI6MjA4NDUxMzU1NX0.uCJeNvnAhsIpz1DQGY429cevn5cWL_K7YUy92Osma-E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)