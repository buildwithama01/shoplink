-- ============================================================
-- Migration: Fix order schema
-- 1. Add 'returned' to the order_status enum
-- 2. Add 'image' column to order_items for image snapshots
-- ============================================================

-- 1. Add 'returned' value to the order_status enum
--    (IF NOT EXISTS requires Postgres 14+; safe to run multiple times)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'returned'
      AND enumtypid = (
        SELECT oid FROM pg_type WHERE typname = 'order_status'
      )
  ) THEN
    ALTER TYPE order_status ADD VALUE 'returned';
  END IF;
END;
$$;

-- 2. Add image snapshot column to order_items
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS image TEXT;
