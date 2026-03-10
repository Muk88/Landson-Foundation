-- Add RLS policy to allow public to read impact metrics
-- This fixes the issue where metrics are not being displayed on the homepage

-- Ensure RLS is enabled
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view impact metrics" ON public.impact_metrics;
DROP POLICY IF EXISTS "Authenticated users can manage impact metrics" ON public.impact_metrics;

-- Allow anyone to read impact metrics (needed for homepage display)
CREATE POLICY "Public can view impact metrics"
    ON public.impact_metrics FOR SELECT
    USING (true);

-- Allow authenticated users (admins) to manage metrics
CREATE POLICY "Authenticated users can manage impact metrics"
    ON public.impact_metrics FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
