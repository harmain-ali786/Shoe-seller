export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  category_id?: string;
  image_url: string;
  is_new: boolean;
  is_best_seller: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface CartItem {
  id: string;
  user_id?: string;
  session_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
      cart_items: {
        Row: CartItem;
        Insert: Omit<CartItem, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CartItem, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
