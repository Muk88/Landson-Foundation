-- Landson Foundation Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Impact Metrics Table
CREATE TABLE IF NOT EXISTS impact_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athletes_supported INTEGER NOT NULL DEFAULT 0,
  school_fees_paid INTEGER NOT NULL DEFAULT 0,
  medals_won INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial metrics
INSERT INTO impact_metrics (athletes_supported, school_fees_paid, medals_won)
VALUES (0, 0, 0);

-- Success Stories Table
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_name TEXT NOT NULL,
  achievement TEXT NOT NULL,
  story_content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  youtube_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations Table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount DECIMAL(10, 2) NOT NULL,
  donor_name TEXT,
  donor_email TEXT,
  payment_reference TEXT UNIQUE NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  donation_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stories_published ON success_stories(published);
CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_donations_reference ON donations(payment_reference);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published stories"
  ON success_stories FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view impact metrics"
  ON impact_metrics FOR SELECT
  USING (true);

-- Admin full access (you'll need to adjust this based on your auth setup)
CREATE POLICY "Admins have full access to stories"
  ON success_stories FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins have full access to metrics"
  ON impact_metrics FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins have full access to messages"
  ON contact_messages FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins have full access to donations"
  ON donations FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Allow public to insert contact messages and donations
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create donations"
  ON donations FOR INSERT
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for success_stories
CREATE TRIGGER update_success_stories_updated_at
  BEFORE UPDATE ON success_stories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for impact_metrics
CREATE TRIGGER update_impact_metrics_updated_at
  BEFORE UPDATE ON impact_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
