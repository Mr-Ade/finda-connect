-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
CREATE INDEX IF NOT EXISTS idx_businesses_state ON businesses(state);
CREATE INDEX IF NOT EXISTS idx_businesses_rating ON businesses(average_rating);

-- Create composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(city, state);
CREATE INDEX IF NOT EXISTS idx_businesses_coordinates ON businesses(latitude, longitude);

-- Create GiST index for full-text search
CREATE INDEX IF NOT EXISTS idx_businesses_name_fts ON businesses USING GiST (name_fts);

-- Create indexes for business hours queries
CREATE INDEX IF NOT EXISTS idx_business_hours_composite 
  ON business_hours(business_id, day_of_week, open_time, close_time);

-- Create indexes for reviews
CREATE INDEX IF NOT EXISTS idx_reviews_business_rating 
  ON reviews(business_id, rating);

-- Create index for business photos
CREATE INDEX IF NOT EXISTS idx_business_photos_business 
  ON business_photos(business_id);

-- Add statistics for query optimizer
ANALYZE businesses;
ANALYZE business_hours;
ANALYZE reviews;
ANALYZE business_photos;