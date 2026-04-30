-- Add category_limit and image_limit to plans table
ALTER TABLE plans ADD COLUMN IF NOT EXISTS category_limit INTEGER NOT NULL DEFAULT -1;
ALTER TABLE plans ADD COLUMN IF NOT EXISTS image_limit INTEGER NOT NULL DEFAULT 5;

-- Update existing plans with new limits and features text
UPDATE plans SET 
    price_monthly = 0, 
    order_limit = 5, 
    product_limit = 5, 
    category_limit = 2, 
    image_limit = 1,
    features = ARRAY['Up to 5 orders/mo', 'Up to 5 products', 'Up to 2 categories', '1 image per product', 'WhatsApp order alerts', 'Kozura subdomain']
WHERE name = 'Free';

UPDATE plans SET 
    price_monthly = 2500, 
    order_limit = 80, 
    product_limit = 50, 
    category_limit = 10, 
    image_limit = 3,
    features = ARRAY['Up to 80 orders/mo', 'Up to 50 products', 'Up to 10 categories', '3 images per product', 'Custom categories', 'Basic analytics']
WHERE name = 'Starter';

UPDATE plans SET 
    price_monthly = 6500, 
    order_limit = 200, 
    product_limit = 100, 
    category_limit = 25, 
    image_limit = 5,
    features = ARRAY['Up to 200 orders/mo', 'Up to 100 products', 'Up to 25 categories', '5 images per product', 'Priority WhatsApp support', 'Advanced analytics']
WHERE name = 'Hustle';

UPDATE plans SET 
    price_monthly = 15000, 
    order_limit = -1, 
    product_limit = -1, 
    category_limit = -1, 
    image_limit = 8,
    features = ARRAY['Unlimited orders/mo', 'Unlimited products', 'Unlimited categories', '8 images per product', 'Multiple stores', 'Dedicated account manager']
WHERE name = 'Boss';
