-- Create alumni table
CREATE TABLE IF NOT EXISTS public.alumni (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    "current_role" TEXT,
    quote TEXT NOT NULL,
    image_url TEXT,
    linkedin_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_alumni_is_active ON public.alumni(is_active);

-- Enable RLS
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view active alumni"
    ON public.alumni FOR SELECT
    USING (is_active = true);

-- Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_alumni_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_alumni_updated_at
    BEFORE UPDATE ON public.alumni
    FOR EACH ROW
    EXECUTE FUNCTION update_alumni_updated_at();

-- Seed some initial data
INSERT INTO public.alumni (name, "current_role", quote, image_url)
VALUES 
    ('Sarah Chepkoech', 'Professional Distance Runner', 'The Landson Foundation didn''t just give me training; they gave me the education and confidence to succeed both on the track and in life. I arrived as a dreamer and left as a champion.', '/images/athlete_profile.jpg'),
    ('David Kipruto', 'University Scholar, Sports Management', 'My time at Landson taught me discipline. The mentors guided me through the hardest parts of my athletic journey while ensuring my academics never slipped. I owe my current university scholarship to their unwavering support.', '/images/impact2.jpg')
ON CONFLICT DO NOTHING;
