-- ============================================
-- Database Migration: Add YouTube & Multi-Image Support
-- ============================================
-- This migration adds youtube_url and images columns to support
-- rich media content across Success Stories, News, and Programs
-- ============================================

-- Success Stories Table Updates
-- Add YouTube URL and images array support
ALTER TABLE success_stories 
ADD COLUMN IF NOT EXISTS youtube_url TEXT,
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN success_stories.youtube_url IS 'Optional YouTube video link for the story';
COMMENT ON COLUMN success_stories.images IS 'Array of additional image URLs for photo gallery';

-- News Table Updates
-- Add YouTube URL and images array support
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS youtube_url TEXT,
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN news.youtube_url IS 'Optional YouTube video link for the news article';
COMMENT ON COLUMN news.images IS 'Array of additional image URLs for photo gallery';

-- Programs Table Updates
-- Add featured image and images array support
ALTER TABLE programs 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN programs.image_url IS 'Featured program image URL';
COMMENT ON COLUMN programs.images IS 'Array of additional image URLs for program gallery';

-- ============================================
-- Verification Queries
-- ============================================
-- Run these to verify the columns were added successfully:

-- Check success_stories columns
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'success_stories' 
  AND column_name IN ('youtube_url', 'images')
ORDER BY column_name;

-- Check news columns
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'news' 
  AND column_name IN ('youtube_url', 'images')
ORDER BY column_name;

-- Check programs columns
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'programs' 
  AND column_name IN ('image_url', 'images')
ORDER BY column_name;

-- ============================================
-- Sample Data Examples
-- ============================================
-- Example of how to insert data with the new fields:

-- Success Story with YouTube and multiple images
INSERT INTO success_stories (name, title, story, image_url, images, youtube_url, year, is_featured)
VALUES (
  'John Doe',
  'National Champion 2024',
  'John's inspiring journey...',
  'https://storage.supabase.co/stories/main.jpg',
  '["https://storage.supabase.co/stories/img1.jpg", "https://storage.supabase.co/stories/img2.jpg"]'::jsonb,
  'https://www.youtube.com/watch?v=example',
  2024,
  true
);

-- News article with YouTube and multiple images
INSERT INTO news (title, slug, content, excerpt, image_url, images, youtube_url, published_date, is_published)
VALUES (
  'Foundation Launches New Initiative',
  'foundation-launches-new-initiative',
  'Full article content...',
  'Brief summary...',
  'https://storage.supabase.co/news/main.jpg',
  '["https://storage.supabase.co/news/gallery1.jpg", "https://storage.supabase.co/news/gallery2.jpg"]'::jsonb,
  'https://www.youtube.com/watch?v=example',
  '2024-01-23',
  true
);

-- Program with featured image and gallery
-- INSERT INTO programs (title, description, icon, image_url, images, order_index, is_active)
-- VALUES (
--   'Youth Development Program',
--   'Program description...',
--   '🎓',
--   'https://storage.supabase.co/programs/main.jpg',
--   '["https://storage.supabase.co/programs/activity1.jpg", "https://storage.supabase.co/programs/activity2.jpg"]'::jsonb,
--   1,
--   true
-- );

-- ============================================
-- Migration Complete
-- ============================================
