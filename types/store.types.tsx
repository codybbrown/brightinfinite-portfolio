export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: {
    url: string;
    alt: string;
  }[];
  category: string;
  stock: number;
  metadata?: Record<string, any>;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  customerInfo: {
    name: string;
    email: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}
