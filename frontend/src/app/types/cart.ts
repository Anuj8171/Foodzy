export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  rating: GLfloat;
  image: string;
}

export interface SummaryProps {
  cart: CartItem[];
  total: number;
  deliveryCharge: number;
  grandTotal: number;
}
