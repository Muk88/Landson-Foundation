-- Update News Category Constraint

-- Drop the existing check constraint
ALTER TABLE news
DROP CONSTRAINT IF EXISTS news_category_check;

-- Re-add the constraint with the new values
ALTER TABLE news
ADD CONSTRAINT news_category_check 
CHECK (category IN ('General', 'Athletics', 'Education', 'Community', 'Diplomacy', 'Events'));
