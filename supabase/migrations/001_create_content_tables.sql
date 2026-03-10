-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Partnership', 'Infrastructure', 'Impact', 'Success')),
    image_url TEXT NOT NULL,
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create programs table
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT,
    image_url TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Update success_stories table (if it exists, otherwise create it)
CREATE TABLE IF NOT EXISTS public.success_stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    story TEXT NOT NULL,
    achievement TEXT,
    image_url TEXT,
    year INTEGER,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_news_published_date ON public.news(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_is_published ON public.news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_programs_order_index ON public.programs(order_index);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);
CREATE INDEX IF NOT EXISTS idx_stories_is_featured ON public.success_stories(is_featured);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news table
-- Allow public to read published news
CREATE POLICY "Public can view published news"
    ON public.news FOR SELECT
    USING (is_published = true);

-- Allow authenticated users (admins) to do everything
CREATE POLICY "Authenticated users can manage news"
    ON public.news FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for programs table
-- Allow public to read active programs
CREATE POLICY "Public can view active programs"
    ON public.programs FOR SELECT
    USING (is_active = true);

-- Allow authenticated users (admins) to do everything
CREATE POLICY "Authenticated users can manage programs"
    ON public.programs FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for success_stories table
-- Allow public to read all stories
CREATE POLICY "Public can view success stories"
    ON public.success_stories FOR SELECT
    USING (true);

-- Allow authenticated users (admins) to do everything
CREATE POLICY "Authenticated users can manage stories"
    ON public.success_stories FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS set_updated_at_news ON public.news;
CREATE TRIGGER set_updated_at_news
    BEFORE UPDATE ON public.news
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_programs ON public.programs;
CREATE TRIGGER set_updated_at_programs
    BEFORE UPDATE ON public.programs
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_stories ON public.success_stories;
CREATE TRIGGER set_updated_at_stories
    BEFORE UPDATE ON public.success_stories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
