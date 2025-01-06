-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to menu items
CREATE POLICY "Menu items are viewable by everyone" 
ON menu_items FOR SELECT 
TO public 
USING (true);

-- Allow business owners to manage their menu items
CREATE POLICY "Business owners can manage their menu items"
ON menu_items
FOR ALL
TO authenticated
USING (
  business_id IN (
    SELECT id FROM businesses 
    WHERE owner_id = auth.uid()
  )
)
WITH CHECK (
  business_id IN (
    SELECT id FROM businesses 
    WHERE owner_id = auth.uid()
  )
);