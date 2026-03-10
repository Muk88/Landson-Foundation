-- Insert News Article: Meeting with Australian Deputy High Commissioner

INSERT INTO news (
  title, 
  slug, 
  content, 
  excerpt, 
  image_url, 
  published_date, 
  is_published, 
  category,
  images
) 
VALUES (
  'Strengthening Sport Diplomacy: Meeting with Australian Deputy High Commissioner',
  'meeting-with-australian-deputy-high-commissioner',
  'Our Director, together with the Executive Team, held a productive meeting with the Australian Deputy High Commissioner to Kenya, H.E. Chris (currently Acting High Commissioner), during a courtesy visit to his office in Nairobi.

Discussions centered on sport diplomacy and explored potential areas of collaboration to strengthen the athletics sector. Key focus areas included support for Kenyan athletes seeking opportunities to compete in races in Australia, as well as the development of Australian-based training and exchange programs in Kenya.

H.E. Chris expressed strong interest in these initiatives and confirmed his intention to visit the Landson Foundation training camp in due course.

We sincerely extend our gratitude to H.E. Chris and the Australian High Commission for their continued commitment, engagement, and support toward advancing athletics development and international collaboration.',
  'Our Director and Executive Team held a productive meeting with H.E. Chris, Acting Australian High Commissioner, to discuss sport diplomacy and future collaboration in athletics.',
  '/images/background1.jpg', -- Placeholder using existing asset
  NOW(),
  true,
  'Diplomacy',
  '{}'
);
