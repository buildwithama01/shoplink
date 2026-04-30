-- Add subscription tracking fields to stores table
ALTER TABLE stores ADD COLUMN IF NOT EXISTS plan_status TEXT DEFAULT 'inactive';
ALTER TABLE stores ADD COLUMN IF NOT EXISTS subscription_code TEXT;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS next_billing_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS grace_period_ends TIMESTAMP WITH TIME ZONE;
