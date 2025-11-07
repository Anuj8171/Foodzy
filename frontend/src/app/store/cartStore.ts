import { create } from 'zustand';
import { Product } from './productStore';
import toast from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  calculateTotal: () => void; 
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  total: 0, 

  addToCart: (product, quantity = 1) => {
    const cart = get().cart;
    const existingIndex = cart.findIndex(item => item.id === product.id);

    let updatedCart;
    if (existingIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { ...product, quantity }];
       toast.success("Added to cart");
    }

    set({ 
      cart: updatedCart, 
      total: updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0) 
    });
  },

  removeFromCart: (productId) => {
    const updatedCart = get().cart.filter(item => item.id !== productId);
    set({ 
      cart: updatedCart, 
      total: updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0) 
    });
  },

  clearCart: () => set({ cart: [], total: 0 }),

  
  calculateTotal: () => {
    const cart = get().cart;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    set({ total });
  },
}));
