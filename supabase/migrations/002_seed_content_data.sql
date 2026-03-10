-- Insert sample news data
INSERT INTO public.news (title, slug, excerpt, content, category, image_url, published_date) VALUES
(
    'Founder Meets Australian High Commissioner in Kenya',
    'founder-meets-australian-high-commissioner',
    'Alfred Koech Sergent, founder of Landson Foundation, met with the Australian High Commissioner to Kenya to discuss expanding educational opportunities for talented athletes in Nandi County.',
    E'In a significant milestone for the Landson Foundation, founder Alfred Koech Sergent held a productive meeting with the Australian High Commissioner to Kenya. The discussion centered on strengthening the partnership between Australian educational institutions and talented young athletes from Nandi County.\n\nThe meeting explored opportunities for scholarship programs, athletic training partnerships, and educational exchange initiatives that align with the foundation''s mission of using athletics as a pathway to education.\n\nThis diplomatic engagement represents a major step forward in creating sustainable pathways for Kenyan athletes to access world-class education while pursuing their athletic dreams.',
    'Partnership',
    '/images/education.jpg',
    '2026-01-15'
),
(
    'Dream Realized: Foundation Facility Construction Complete',
    'facility-construction-complete',
    'After years of planning and dedication, the Landson Foundation training and education facility in Mosoriot is now complete, providing a dedicated space for athletes to train and study.',
    E'A dream that began years ago has finally become reality. The Landson Foundation is proud to announce the completion of our state-of-the-art training and education facility in Mosoriot, Nandi County.\n\nThis facility represents more than just infrastructure—it''s a physical manifestation of our commitment to nurturing both athletic talent and academic excellence. The facility includes:\n\n• Modern training grounds for athletics\n• Dedicated study and tutoring spaces\n• Library and resource center\n• Meeting rooms for mentorship programs\n• Administrative offices\n\nThe facility will serve as the central hub for our scholarship recipients, providing them with a professional environment to develop their talents while maintaining focus on their education.',
    'Infrastructure',
    '/images/future.jpg',
    '2025-12-20'
),
(
    '150+ Athletes Receive Training Equipment',
    '150-athletes-receive-equipment',
    'Through partnerships with Team Landson Perth and The Running Center Australia, we distributed running shoes and training gear to primary and secondary school students.',
    E'In partnership with Team Landson Perth and The Running Center in Australia, the Landson Foundation successfully distributed 150 pairs of running shoes and comprehensive training gear to talented young athletes in Mosoriot.\n\nThis initiative removes one of the most significant barriers to athletic participation—access to proper equipment. Many talented runners in Nandi County train barefoot or in inadequate footwear, limiting their potential and increasing injury risk.\n\nThe distribution event brought together students from multiple schools, creating a sense of community and shared purpose. Each recipient also received guidance on proper training techniques and the importance of balancing athletics with education.',
    'Impact',
    '/images/training.jpg',
    '2025-11-15'
),
(
    'Three Athletes Secure US University Scholarships',
    'three-athletes-us-scholarships',
    'Nimrod Korir, Dismas Kipchumba, and Vivian Chepkemei have secured full athletic scholarships to US universities, marking a major milestone for the foundation.',
    E'The Landson Foundation is thrilled to announce that three of our supported athletes—Nimrod Korir, Dismas Kipchumba, and Vivian Chepkemei—have secured full athletic scholarships to universities in the United States.\n\nThese scholarships represent the culmination of years of dedication, training, and academic preparation. Each athlete will have the opportunity to compete at the NCAA Division I level while pursuing their academic goals.\n\nThis achievement validates our core philosophy: athletics as a means to education, not just an end in itself. These young people are now positioned to become not just successful athletes, but educated professionals who can give back to their communities.',
    'Success',
    '/images/runner.jpg',
    '2025-10-10'
);

-- Insert sample programs data
INSERT INTO public.programs (title, slug, description, icon_name, image_url, order_index) VALUES
(
    'Scholarship Program',
    'scholarship-program',
    'The Landson Scholarship Program is our cornerstone initiative, dedicated to bridging the gap between athletic potential and academic opportunity. In partnership with leading global organizations and professional teams, we provide comprehensive financial support that covers school fees, uniforms, textbooks, and essential educational materials for talented student-athletes across Nandi County. Our mission extends beyond the classroom; we actively create pathways for our scholars—including university graduates and promising students—to secure life-changing opportunities abroad. Whether connecting athletes with international scholarships or facilitating professional employment placements, we empower our community to build sustainable futures on the global stage.',
    'graduation-cap',
    '/images/scholarship.jpg',
    1
),
(
    'Training & Equipment',
    'training-equipment',
    'We believe that every athlete deserves the chance to train like a champion. At the heart of our Training & Equipment program is our state-of-the-art training facility in Nandi, purpose-built by the Landson Foundation. This facility serves as a dedicated hub where student-athletes can reside during school holidays to focus intensively on their athletic development. We provide a holistic environment where young talents receive nutritious meals, professional-grade running equipment, and specialized coaching to build their capacity. By combining high-performance training with comprehensive support, we eliminate the barriers to achievement and empower our students to reach their full potential safely and effectively.',
    'running',
    '/images/training.jpg',
    2
),
(
    'Mentorship Program',
    'mentorship-program',
    'Success is a journey best traveled with guidance. The Landson Mentorship Program creates a vital network connecting our young student-athletes with successful alumni, professional athletes, and industry leaders who have walked the same path. Through workshops, one-on-one sessions, and career guidance seminars, our mentors provide invaluable insights on balancing rigorous athletic schedules with academic demands. We focus on holistic development—building character, leadership skills, and financial literacy—to ensure our athletes are prepared not just for the finish line on the track, but for a lifetime of professional and personal triumph.',
    'users',
    '/images/mentorship.jpg',
    3
);

-- Insert sample success stories data
INSERT INTO public.success_stories (name, title, story, achievement, image_url, year, is_featured) VALUES
(
    'Nimrod Korir',
    'From Mosoriot to NCAA Division I',
    'Nimrod''s journey with the Landson Foundation began in 2020 when he was identified as a talented runner in primary school. Through our scholarship program, he received support for his secondary education while continuing to train. His dedication paid off when he secured a full athletic scholarship to a US university, where he now competes at the Division I level while pursuing a degree in Business Administration.',
    'Full Athletic Scholarship to US University',
    '/images/runner.jpg',
    2025,
    true
),
(
    'Dismas Kipchumba',
    'Breaking Barriers Through Education',
    'Dismas came from a family that couldn''t afford secondary school fees. The Landson Foundation not only provided his scholarship but also equipped him with proper training gear. His academic excellence and athletic prowess earned him a spot at a prestigious US university, where he''s studying Engineering while representing his school in cross-country competitions.',
    'Engineering Student & NCAA Athlete',
    '/images/runner2.jpg',
    2025,
    true
),
(
    'Vivian Chepkemei',
    'Inspiring the Next Generation',
    'Vivian is proof that the Landson Foundation''s mission works. As one of our first female scholarship recipients, she excelled both academically and athletically. Now studying at a US university on a full scholarship, she regularly mentors younger girls in Nandi County, showing them that education and athletics can open doors to extraordinary opportunities.',
    'First Female Scholar to US University',
    '/images/runner.jpg',
    2025,
    true
);
