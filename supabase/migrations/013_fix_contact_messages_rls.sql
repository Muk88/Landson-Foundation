-- Allow public (anon) users to insert contact messages
-- This is required for the contact form to work for unauthenticated users

-- First enabling RLS is good practice (idempotent)
ALTER TABLE IF EXISTS public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing insert policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;

-- Create policy to allow anonymous inserts
CREATE POLICY "Public can insert contact messages"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Also allow authenticated users just in case
DROP POLICY IF EXISTS "Authenticated users can insert contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated users can insert contact messages"
ON public.contact_messages
FOR INSERT
TO authenticated
WITH CHECK (true);
