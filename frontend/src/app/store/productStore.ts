import { create } from "zustand";
import { axiosInstance } from "../lib/axiosinstance";

export interface Product {
  id: string;
  brand: string;
  rating: number;
  type: string;
  name: string;
  price: number;
  image: string;
  bestSell: boolean;
  dayDeal: boolean;
}

interface ProductStore {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,

  
  fetchProducts: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/product/");
      set({
        products: res.data,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },


  getProductById: async (id: string) => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get(`/product/product/${id}`);

      set({
        product: res.data,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
}));
