
CREATE TABLE event_registrations (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_event_registrations" ON event_registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_event_registrations" ON event_registrations FOR SELECT
  TO authenticated USING (true);
