/*
  # Complete Database Schema Setup

  1. New Tables
    - `customers` - Customer information and loyalty data
    - `appointments` - Service appointments with status tracking
    - `orders` - Order management with tracking
    - `order_items` - Individual items within orders
    - `wishlist_items` - Customer wishlist functionality

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add service role policies for admin access

  3. Functions & Triggers
    - Auto-generate order numbers
    - Update customer statistics when orders are delivered
    - Maintain data integrity with proper relationships

  4. Sample Data
    - Test customers with realistic data
    - Sample appointments (past and upcoming)
    - Order history with items
    - Wishlist items for testing
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  member_since timestamptz DEFAULT now(),
  total_orders integer DEFAULT 0,
  total_spent decimal(10,2) DEFAULT 0,
  loyalty_points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  price decimal(10,2) NOT NULL,
  duration text,
  notes text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review text,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  order_number text UNIQUE NOT NULL,
  order_date timestamptz DEFAULT now(),
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'processing' CHECK (status IN ('processing', 'shipped', 'delivered', 'cancelled')),
  tracking_number text,
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  product_length text,
  price decimal(10,2) NOT NULL,
  quantity integer DEFAULT 1
);

-- Create wishlist_items table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  product_length text,
  price decimal(10,2) NOT NULL,
  image_url text,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own customer data" ON customers;
DROP POLICY IF EXISTS "Users can update own customer data" ON customers;
DROP POLICY IF EXISTS "Service role can manage all customers" ON customers;
DROP POLICY IF EXISTS "Users can read own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can insert own appointments" ON appointments;
DROP POLICY IF EXISTS "Service role can manage all appointments" ON appointments;
DROP POLICY IF EXISTS "Users can read own orders" ON orders;
DROP POLICY IF EXISTS "Service role can manage all orders" ON orders;
DROP POLICY IF EXISTS "Users can read own order items" ON order_items;
DROP POLICY IF EXISTS "Service role can manage all order items" ON order_items;
DROP POLICY IF EXISTS "Users can manage own wishlist" ON wishlist_items;
DROP POLICY IF EXISTS "Service role can manage all wishlist items" ON wishlist_items;

-- Create policies for customers table
CREATE POLICY "Users can read own customer data"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own customer data"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Service role can manage all customers"
  ON customers
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for appointments table
CREATE POLICY "Users can read own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (customer_id::text = auth.uid()::text);

CREATE POLICY "Users can insert own appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (customer_id::text = auth.uid()::text);

CREATE POLICY "Service role can manage all appointments"
  ON appointments
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for orders table
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_id::text = auth.uid()::text);

CREATE POLICY "Service role can manage all orders"
  ON orders
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for order_items table
CREATE POLICY "Users can read own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.customer_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Service role can manage all order items"
  ON order_items
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for wishlist_items table
CREATE POLICY "Users can manage own wishlist"
  ON wishlist_items
  FOR ALL
  TO authenticated
  USING (customer_id::text = auth.uid()::text);

CREATE POLICY "Service role can manage all wishlist items"
  ON wishlist_items
  FOR ALL
  TO service_role
  USING (true);

-- Create sequence for order numbers if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number = 'ORD-' || LPAD(nextval('order_number_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update customer stats
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total_orders and total_spent when order status changes to delivered
  IF TG_OP = 'UPDATE' AND OLD.status != 'delivered' AND NEW.status = 'delivered' THEN
    UPDATE customers 
    SET 
      total_orders = total_orders + 1,
      total_spent = total_spent + NEW.total_amount,
      loyalty_points = loyalty_points + FLOOR(NEW.total_amount)::integer,
      updated_at = now()
    WHERE id = NEW.customer_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS generate_order_number_trigger ON orders;
DROP TRIGGER IF EXISTS update_customer_stats_trigger ON orders;

-- Create trigger for generating order numbers
CREATE TRIGGER generate_order_number_trigger
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION generate_order_number();

-- Create trigger for updating customer stats
CREATE TRIGGER update_customer_stats_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_stats();

-- Clear existing sample data
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM appointments;
DELETE FROM wishlist_items;
DELETE FROM customers WHERE email LIKE '%@email.com';

-- Insert sample customers
INSERT INTO customers (id, email, first_name, last_name, phone, member_since, total_orders, total_spent, loyalty_points) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'sarah.johnson@email.com', 'Sarah', 'Johnson', '(204) 825-8526', '2024-03-15', 8, 1240.00, 156),
  ('550e8400-e29b-41d4-a716-446655440001', 'maria.garcia@email.com', 'Maria', 'Garcia', '(204) 825-8527', '2024-06-20', 5, 890.00, 89),
  ('550e8400-e29b-41d4-a716-446655440002', 'jessica.brown@email.com', 'Jessica', 'Brown', '(204) 825-8528', '2024-01-10', 12, 2150.00, 215),
  ('550e8400-e29b-41d4-a716-446655440003', 'ashley.davis@email.com', 'Ashley', 'Davis', '(204) 825-8529', '2024-08-05', 3, 425.00, 42),
  ('550e8400-e29b-41d4-a716-446655440004', 'taylor.wilson@email.com', 'Taylor', 'Wilson', '(204) 825-8530', '2024-11-12', 1, 135.00, 13);

-- Insert sample appointments
INSERT INTO appointments (customer_id, service_name, appointment_date, appointment_time, status, price, duration, notes, rating, review) VALUES
  -- Upcoming appointments
  ('550e8400-e29b-41d4-a716-446655440000', 'Wig Install + Styling', '2025-01-20', '14:00', 'confirmed', 80.00, '3-4 hours', 'Bring wig for installation - Body Wave 22"', NULL, NULL),
  ('550e8400-e29b-41d4-a716-446655440000', 'Basic Wig Customization', '2025-01-25', '10:00', 'pending', 55.00, '4-6 hours', 'HD Lace Frontal - Bleaching and plucking', NULL, NULL),
  ('550e8400-e29b-41d4-a716-446655440001', 'Reinstall', '2025-01-22', '16:00', 'confirmed', 60.00, '2-3 hours', 'Previous install from November', NULL, NULL),
  ('550e8400-e29b-41d4-a716-446655440002', 'Wig Install (No Styling)', '2025-01-18', '11:30', 'pending', 75.00, '2-3 hours', 'Straight wig 26"', NULL, NULL),
  
  -- Past appointments
  ('550e8400-e29b-41d4-a716-446655440000', 'Wig Install (No Styling)', '2024-12-15', '13:00', 'completed', 75.00, '2-3 hours', 'Deep wave 24"', 5, 'Amazing service! The installation was perfect and looked so natural. Will definitely be back!'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Reinstall', '2024-11-20', '15:30', 'completed', 60.00, '2-3 hours', 'Touch-up and re-style', 5, 'Quick and professional service as always! Love how my hair looks.'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Basic Wig Customization', '2024-12-08', '09:00', 'completed', 55.00, '4-6 hours', 'First time customization', 4, 'Great work on the customization. The wig looks very natural now.'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Wig Install + Styling', '2024-12-22', '12:00', 'completed', 80.00, '3-4 hours', 'Holiday styling', 5, 'Perfect for the holidays! Got so many compliments.'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Wig Install (No Styling)', '2024-12-10', '14:30', 'completed', 75.00, '2-3 hours', 'First appointment', 5, 'Exceeded my expectations! Professional and friendly service.');

-- Insert sample orders (let the trigger generate order numbers automatically)
INSERT INTO orders (customer_id, order_date, total_amount, status, tracking_number) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', '2024-12-10', 383.00, 'delivered', 'TRK123456789'),
  ('550e8400-e29b-41d4-a716-446655440000', '2024-11-15', 315.00, 'delivered', 'TRK987654321'),
  ('550e8400-e29b-41d4-a716-446655440000', '2024-10-08', 271.00, 'delivered', 'TRK456789123'),
  ('550e8400-e29b-41d4-a716-446655440001', '2024-12-05', 338.00, 'delivered', 'TRK789123456'),
  ('550e8400-e29b-41d4-a716-446655440001', '2024-11-20', 290.00, 'delivered', 'TRK321654987'),
  ('550e8400-e29b-41d4-a716-446655440002', '2024-12-20', 448.00, 'shipped', 'TRK654987321'),
  ('550e8400-e29b-41d4-a716-446655440002', '2024-12-01', 373.00, 'delivered', 'TRK147258369'),
  ('550e8400-e29b-41d4-a716-446655440003', '2024-12-08', 135.00, 'delivered', 'TRK963852741'),
  ('550e8400-e29b-41d4-a716-446655440004', '2025-01-05', 290.00, 'processing', NULL);

-- Insert sample order items (using the actual order IDs from the orders table)
-- We'll use a DO block to get the order IDs and insert the items
DO $$
DECLARE
    order_ids uuid[];
BEGIN
    -- Get all order IDs in the order they were inserted
    SELECT ARRAY(SELECT id FROM orders ORDER BY order_date) INTO order_ids;
    
    -- Insert order items for each order
    INSERT INTO order_items (order_id, product_name, product_length, price, quantity) VALUES
        -- Order 1: Sarah's December order
        (order_ids[1], '13x6 HD Lace Body Wave Wig', '22"', 328.00, 1),
        (order_ids[1], 'Basic Wig Customization', NULL, 55.00, 1),
        
        -- Order 2: Sarah's November order
        (order_ids[2], '13x4 HD Lace Straight Wig', '24"', 315.00, 1),
        
        -- Order 3: Sarah's October order
        (order_ids[3], '13x6 HD Lace Body Wave Wig', '18"', 271.00, 1),
        
        -- Order 4: Maria's December order
        (order_ids[4], '13x6 HD Lace Deep Wave Wig', '22"', 338.00, 1),
        
        -- Order 5: Maria's November order
        (order_ids[5], '13x6 HD Lace Body Wave Wig', '20"', 290.00, 1),
        
        -- Order 6: Jessica's December order (shipped)
        (order_ids[6], '13x6 HD Lace Deep Wave Wig', '30"', 448.00, 1),
        
        -- Order 7: Jessica's December order
        (order_ids[7], '13x6 HD Lace Body Wave Wig', '26"', 373.00, 1),
        
        -- Order 8: Ashley's order
        (order_ids[8], 'Basic Wig Customization', NULL, 55.00, 1),
        (order_ids[8], 'Wig Install + Styling', NULL, 80.00, 1),
        
        -- Order 9: Taylor's processing order
        (order_ids[9], '13x6 HD Lace Body Wave Wig', '20"', 290.00, 1);
END $$;

-- Insert sample wishlist items
INSERT INTO wishlist_items (customer_id, product_name, product_length, price, image_url, in_stock) VALUES
  -- Sarah's wishlist
  ('550e8400-e29b-41d4-a716-446655440000', '13x6 HD Lace Deep Wave Wig', '26"', 383.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg', true),
  ('550e8400-e29b-41d4-a716-446655440000', '13x6 HD Lace Straight Wig', '30"', 438.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg', false),
  ('550e8400-e29b-41d4-a716-446655440000', '13x6 HD Lace Body Wave Wig', '32"', 445.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/780c71b2-7749-454f-95b6-66ada0d324e7.jpg', true),
  
  -- Maria's wishlist
  ('550e8400-e29b-41d4-a716-446655440001', '13x6 HD Lace Straight Wig', '28"', 393.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg', true),
  ('550e8400-e29b-41d4-a716-446655440001', '13x6 HD Lace Deep Wave Wig', '24"', 351.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg', true),
  
  -- Jessica's wishlist
  ('550e8400-e29b-41d4-a716-446655440002', '13x6 HD Lace Body Wave Wig', '34"', 537.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/780c71b2-7749-454f-95b6-66ada0d324e7.jpg', false),
  ('550e8400-e29b-41d4-a716-446655440002', '13x4 HD Lace Straight Wig', '30"', 423.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg', true),
  
  -- Ashley's wishlist
  ('550e8400-e29b-41d4-a716-446655440003', '13x6 HD Lace Body Wave Wig', '22"', 328.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/780c71b2-7749-454f-95b6-66ada0d324e7.jpg', true),
  
  -- Taylor's wishlist
  ('550e8400-e29b-41d4-a716-446655440004', '13x6 HD Lace Deep Wave Wig', '20"', 300.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg', true);