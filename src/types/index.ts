export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  details?: {
    ingredients?: string;
    size?: string;
    usage?: string;
    benefits?: string;
  };
}

export interface CartItem extends Pick<Product, 'id' | 'name' | 'price' | 'image'> {
  quantity: number;
}

export interface User {
  username: string;
  email: string;
  password: string;
}