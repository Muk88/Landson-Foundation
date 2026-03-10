-- Storage bucket policies for your storage bucket
-- IMPORTANT: Replace 'landson' with your actual bucket name from NEXT_PUBLIC_STORAGE_BUCKET
-- Run this in Supabase SQL Editor after creating the bucket

-- Enable RLS on storage.objects
-- NOTE: RLS is usually enabled by default on storage.objects. 
-- If you get an error "42501: must be owner of table objects", keep this line commented out.
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to view images
CREATE POLICY "Public can view images in storage bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'landson');

-- Policy: Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images to storage bucket"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'landson' 
    AND auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to update images
CREATE POLICY "Authenticated users can update images in storage bucket"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'landson' 
    AND auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images from storage bucket"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'landson' 
    AND auth.role() = 'authenticated'
);
