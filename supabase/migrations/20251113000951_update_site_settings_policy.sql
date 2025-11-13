/*
  # Update Site Settings RLS Policy

  1. Changes
    - Drop existing restrictive UPDATE policy
    - Add new UPDATE policy that allows anyone to update (temporary for development)
    
  2. Security Note
    - This is a temporary change for development
    - In production, this should be restricted to authenticated admin users only
*/

DROP POLICY IF EXISTS "Authenticated users can update site settings" ON site_settings;

CREATE POLICY "Anyone can update site settings"
  ON site_settings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);