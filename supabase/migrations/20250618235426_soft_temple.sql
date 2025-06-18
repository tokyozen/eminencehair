/*
  # Customer Management System

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `phone` (text)
      - `member_since` (timestamp)
      - `total_orders` (integer, default 0)
      - `total_spent` (decimal, default 0)
      - `loyalty_points` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `appointments`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key)
      - `service_name` (text)
      - `appointment_date` (date)
      - `appointment_time` (time)
      - `status` (text)
      - `price` (decimal)
      - `duration` (text)
      - `notes` (text)
      - `rating` (integer)
      - `review` (text)
      - `created_at` (timestamp)

    - `orders`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key)
      - `order_number` (text, unique)
      - `order_date` (timestamp)
      - `total_amount` (decimal)
      - `status` (text)
      - `tracking_number` (text)
      - `created_at` (timestamp)

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_name` (text)
      - `product_length` (text)
      - `price` (decimal)
      - `quantity` (integer, default 1)

    - `wishlist_items`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key)
      - `product_name` (text)
      - `product_length` (text)
      - `price` (decimal)
      - `image_url` (text)
      - `in_stock` (boolean, default true)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for service role to manage all data

  3. Functions
    - Update customer stats when orders/appointments are added
    - Calculate loyalty points based on spending
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

-- Function to update customer stats
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total_orders and total_spent when order is completed
  IF TG_TABLE_NAME = 'orders' AND NEW.status = 'delivered' THEN
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

-- Create trigger for updating customer stats
CREATE TRIGGER update_customer_stats_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_stats();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number = 'ORD-' || LPAD(nextval('order_number_seq')::text, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Create trigger for generating order numbers
CREATE TRIGGER generate_order_number_trigger
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION generate_order_number();

-- Insert sample data for testing
INSERT INTO customers (id, email, first_name, last_name, phone, total_orders, total_spent, loyalty_points) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'sarah.johnson@email.com', 'Sarah', 'Johnson', '(204) 825-8526', 8, 1240.00, 156),
  ('550e8400-e29b-41d4-a716-446655440001', 'maria.garcia@email.com', 'Maria', 'Garcia', '(204) 825-8527', 5, 890.00, 89),
  ('550e8400-e29b-41d4-a716-446655440002', 'jessica.brown@email.com', 'Jessica', 'Brown', '(204) 825-8528', 12, 2150.00, 215);

-- Insert sample appointments
INSERT INTO appointments (customer_id, service_name, appointment_date, appointment_time, status, price, duration, notes, rating, review) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Wig Install + Styling', '2025-01-20', '14:00', 'confirmed', 80.00, '3-4 hours', 'Bring wig for installation - Body Wave 22"', NULL, NULL),
  ('550e8400-e29b-41d4-a716-446655440000', 'Basic Wig Customization', '2025-01-25', '10:00', 'pending', 55.00, '4-6 hours', 'HD Lace Frontal - Bleaching and plucking', NULL, NULL),
  ('550e8400-e29b-41d4-a716-446655440000', 'Wig Install (No Styling)', '2024-12-15', '13:00', 'completed', 75.00, '2-3 hours', NULL, 5, 'Amazing service! The installation was perfect and looked so natural.'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Reinstall', '2024-11-20', '15:30', 'completed', 60.00, '2-3 hours', NULL, 5, 'Quick and professional service as always!');

-- Insert sample orders
INSERT INTO orders (customer_id, order_date, total_amount, status, tracking_number) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', '2024-12-10', 383.00, 'delivered', 'TRK123456789'),
  ('550e8400-e29b-41d4-a716-446655440000', '2024-11-15', 315.00, 'delivered', 'TRK987654321');

-- Insert sample order items
INSERT INTO order_items (order_id, product_name, product_length, price, quantity) VALUES
  ((SELECT id FROM orders WHERE tracking_number = 'TRK123456789'), '13x6 HD Lace Body Wave Wig', '22"', 328.00, 1),
  ((SELECT id FROM orders WHERE tracking_number = 'TRK123456789'), 'Basic Wig Customization', NULL, 55.00, 1),
  ((SELECT id FROM orders WHERE tracking_number = 'TRK987654321'), '13x4 HD Lace Straight Wig', '24"', 315.00, 1);

-- Insert sample wishlist items
INSERT INTO wishlist_items (customer_id, product_name, product_length, price, image_url, in_stock) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', '13x6 HD Lace Deep Wave Wig', '26"', 383.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg', true),
  ('550e8400-e29b-41d4-a716-446655440000', '13x6 HD Lace Straight Wig', '30"', 438.00, 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg', false);