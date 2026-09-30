-- ============================================================
-- Page Visits – tracking table (LGPD compliant, no PII stored)
-- Run this in the Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS page_visits (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  visited_at  timestamptz NOT NULL DEFAULT now(),
  path        text        NOT NULL DEFAULT '/'
);

ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

-- Anyone can register a visit (front-end fires this on mount)
CREATE POLICY "visits_insert_public"
  ON page_visits FOR INSERT TO anon
  WITH CHECK (true);

-- Anon key can read – data is non-sensitive (timestamps only)
CREATE POLICY "visits_select_anon"
  ON page_visits FOR SELECT TO anon
  USING (true);

-- Performance index for date-range queries
CREATE INDEX IF NOT EXISTS idx_page_visits_at
  ON page_visits (visited_at DESC);
