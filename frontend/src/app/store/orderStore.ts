import { create } from "zustand";

import { useCartStore } from "./cartStore";
import { axiosInstance } from "../lib/axiosinstance";
import toast from "react-hot-toast";
import { useEmailStore } from "./emailStore";

interface Order {
  email: string;
  items: any[];
  total: number;
  paymentMethod: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
  regionState: string;
}

interface OrderStore {
  loading: boolean;
  error: string | null;
  createOrder: (orderData: Omit<Order, "items" | "total">) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  loading: false,
  error: null,

  // Create order
  createOrder: async (orderData) => {
  const { cart, total, clearCart } = useCartStore.getState();
  const { email, verified } = useEmailStore.getState(); // get verified email

  if (!verified || !email) {
    toast.error("Please verify your email before placing the order.");
    return;
  }

  set({ loading: true, error: null });

  try {
    await axiosInstance.post("/product/order", {
      ...orderData,
      email, // use the verified email here
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
      })),
      total,
    });

    clearCart();
    toast.success("Order Successful");
    set({ loading: false });
  } catch (error: any) {
    set({
      loading: false,
      error: error.response?.data?.message || "Failed to place order",
    });
  }
},
}));
