-- Upgrade News table with Slug and Multi-Image support

ALTER TABLE news 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Optional: Auto-generate slugs for existing news (simple version)
-- Note: This might fail on duplicates, so strictly speaking manual update is safer, 
-- but we can try a best-effort update or leave them null and handle fallback.

UPDATE news 
SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;
