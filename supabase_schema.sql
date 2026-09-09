-- SQL SCHEMA FOR SUPABASE

-- 1. Create Categories Table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Prompts Table
CREATE TABLE prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  prompt_text TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Settings Table
CREATE TABLE settings (
  id TEXT PRIMARY KEY, -- 'adsterra_top', 'adsterra_sidebar', 'adsterra_bottom'
  content TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Page Views Table (Analytics & Visitor Logs)
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- 6. Policies: Public Select & Insert
CREATE POLICY "Public Select Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Select Prompts" ON prompts FOR SELECT USING (true);
CREATE POLICY "Public Select Settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public Insert Page Views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Select Page Views" ON page_views FOR SELECT USING (true);

-- 7. Policies: Admin All
CREATE POLICY "Admin All Categories" ON categories ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Prompts" ON prompts ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Settings" ON settings ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Page Views" ON page_views ALL USING (auth.role() = 'authenticated');

-- 8. Seed Data
INSERT INTO categories (name, slug) VALUES 
('ChatGPT', 'chatgpt'),
('Claude AI', 'claude-ai'),
('Google Studio', 'google-studio'),
('DeepSeek', 'deepseek');

INSERT INTO settings (id, content) VALUES 
('adsterra_top', ''),
('adsterra_sidebar', ''),
('adsterra_bottom', '');

-- Sample Page Views Data for Analytics Demo (Optional)
INSERT INTO page_views (page_path, created_at) VALUES
('/', NOW() - INTERVAL '1 hour'),
('/', NOW() - INTERVAL '3 hours'),
('/detail/1', NOW() - INTERVAL '5 hours'),
('/', NOW() - INTERVAL '1 day'),
('/', NOW() - INTERVAL '2 days'),
('/', NOW() - INTERVAL '5 days'),
('/', NOW() - INTERVAL '10 days'),
('/', NOW() - INTERVAL '25 days'),
('/', NOW() - INTERVAL '40 days');

