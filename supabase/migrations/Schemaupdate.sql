-- Add social media configuration columns to the stores table
ALTER TABLE stores
ADD COLUMN IF NOT EXISTS social_facebook TEXT,
ADD COLUMN IF NOT EXISTS social_instagram TEXT,
ADD COLUMN IF NOT EXISTS social_tiktok TEXT,
ADD COLUMN IF NOT EXISTS social_facebook_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS social_instagram_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS social_tiktok_enabled BOOLEAN DEFAULT false;
