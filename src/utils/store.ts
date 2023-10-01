import { CartType, CartActionTypes } from "@/entities/CartType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & CartActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart(item) {
        set((state) => ({
          products: [...state.products, item],
          totalItems: state.totalItems + item.quantity,
          totalPrice: state.totalPrice + item.price,
        }));
      },
      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter((product) => product.id != item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
