/*
  # Create Site Settings Table

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key) - Unique identifier
      - `key` (text, unique) - Setting key (e.g., 'hero_title', 'contact_phone')
      - `value` (text) - Setting value
      - `description` (text) - Description of what this setting controls
      - `updated_at` (timestamptz) - Last update timestamp
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `site_settings` table
    - Add policy for public read access (anyone can view site settings)
    - Add policy for authenticated users to update settings (admin only)

  3. Initial Data
    - Insert default values for hero section
    - Insert default values for contact information
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO site_settings (key, value, description) VALUES
  ('hero_title', 'Дом на озёрах Мурашки', 'Hero section main title'),
  ('hero_subtitle', 'Место, где природа говорит тише, а душа слышит громче', 'Hero section subtitle'),
  ('hero_button_text', 'Забронировать отдых', 'Hero section button text'),
  ('contact_phone_1', '+375 (29) 123-45-67', 'Primary contact phone number'),
  ('contact_phone_2', '+375 (33) 765-43-21', 'Secondary contact phone number'),
  ('contact_email', 'info@murashki-lakes.by', 'Contact email address'),
  ('contact_address_line1', 'Беларусь, Брестская область', 'Address line 1'),
  ('contact_address_line2', 'Браславский район', 'Address line 2'),
  ('contact_address_line3', 'Озёра Мурашки', 'Address line 3'),
  ('contact_coordinates', 'Координаты: 55.6416° N, 27.0444° E', 'GPS coordinates')
ON CONFLICT (key) DO NOTHING;