-- Create contact_info table
CREATE TABLE IF NOT EXISTS public.contact_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    facebook_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Allow public to read contact info
CREATE POLICY "Public can view contact info"
    ON public.contact_info FOR SELECT
    USING (true);

-- Allow authenticated users (admins) to update contact info
CREATE POLICY "Authenticated users can update contact info"
    ON public.contact_info FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Insert default data
INSERT INTO public.contact_info (email, phone, address)
VALUES (
    'info@landsonfoundation.org',
    '+254 706 247 847',
    'Nandi County, Kenya'
);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS set_updated_at_contact_info ON public.contact_info;
CREATE TRIGGER set_updated_at_contact_info
    BEFORE UPDATE ON public.contact_info
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
