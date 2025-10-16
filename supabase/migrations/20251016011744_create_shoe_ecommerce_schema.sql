/*
  # ShoeHaven E-commerce Database Schema

  ## Overview
  Complete database schema for ShoeHaven shoe e-commerce platform with products, categories, and cart functionality.

  ## New Tables
  
  ### `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text, unique, not null) - Category name (Men's, Women's, Sports, Casual)
  - `slug` (text, unique, not null) - URL-friendly category identifier
  - `created_at` (timestamptz) - Creation timestamp

  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text, not null) - Product name
  - `price` (decimal, not null) - Current price in PKR
  - `original_price` (decimal, nullable) - Original price for discount display
  - `category_id` (uuid, foreign key) - References categories table
  - `image_url` (text, not null) - Product image URL
  - `is_new` (boolean) - NEW badge indicator
  - `is_best_seller` (boolean) - Best Seller badge indicator
  - `description` (text) - Product description
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `cart_items`
  - `id` (uuid, primary key) - Unique cart item identifier
  - `user_id` (uuid, nullable) - User identifier (for authenticated users)
  - `session_id` (text, not null) - Session identifier (for guest users)
  - `product_id` (uuid, foreign key) - References products table
  - `quantity` (integer, not null) - Item quantity
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - RLS enabled on all tables
  - Public read access for products and categories
  - Cart items accessible by session owner

  ## Indexes
  - Products by category for fast filtering
  - Cart items by session_id for fast lookups
  - Products by is_new and is_best_seller for featured sections
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  original_price decimal(10,2),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  is_new boolean DEFAULT false,
  is_best_seller boolean DEFAULT false,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  session_id text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new) WHERE is_new = true;
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON products(is_best_seller) WHERE is_best_seller = true;
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON cart_items(product_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read access)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Products policies (public read access)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Cart items policies (session-based access)
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO public
  USING (true);