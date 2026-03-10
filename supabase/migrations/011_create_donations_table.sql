-- Add RLS policy to allow service role to insert donations
-- This fixes the "new row violates row-level security policy" error

-- First, ensure RLS is enabled (it might already be)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow service role to insert donations" ON public.donations;
DROP POLICY IF EXISTS "Public can insert donations" ON public.donations;
DROP POLICY IF EXISTS "Public can view donations" ON public.donations;
DROP POLICY IF EXISTS "Authenticated users can manage donations" ON public.donations;

-- Allow anyone to insert donations (needed for Paystack callback with service role)
CREATE POLICY "Allow service role to insert donations"
    ON public.donations FOR INSERT
    WITH CHECK (true);

-- Allow anyone to view donations (optional - can be restricted later)
CREATE POLICY "Public can view donations"
    ON public.donations FOR SELECT
    USING (true);

-- Allow authenticated users (admins) to update and delete
CREATE POLICY "Authenticated users can manage donations"
    ON public.donations FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
