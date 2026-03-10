-- Add youtube_url to programs table

ALTER TABLE programs 
ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Verify it exists on news (it should, but just in case)
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS youtube_url TEXT;
