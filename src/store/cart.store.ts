import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import type { ICartItem } from "../components/shared/CartItem";

export interface CartState {
  items: ICartItem[];
  totalItemsInCart: number;
  totalAmount: number;

  addItem: (item: ICartItem) => boolean;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  updateQuantity: (variantId: string, quantity: number) => void;
}

const storeApi: StateCreator<CartState> = (set) => ({
  items: [],
  totalItemsInCart: 0,
  totalAmount: 0,

  addItem: (item) => {
    let wasAdded = true;
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.variantId === item.variantId
      );
      let updatedItems;

      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];
        const sum = existingItem.quantity + item.quantity;
        if (sum > item.stock) {
          wasAdded = false;
          return state; // No actualiza el carrito
        }
        updatedItems = state.items.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity: sum } : i
        );
      } else {
        if (item.quantity > item.stock) {
          wasAdded = false;
          return state;
        }
        updatedItems = [
          ...state.items,
          { ...item, quantity: Math.min(item.quantity, item.stock) },
        ];
      }
      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );
      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
        totalItemsInCart: newTotalItems,
      };
    });
    return wasAdded;
  },

  removeItem: (variantId) => {
    set((state) => {
      const updatedItems = state.items.filter((i) => i.variantId !== variantId);
      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );

      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
        totalItemsInCart: newTotalItems,
      };
    });
  },

  clearCart: () => {
    set({ items: [], totalItemsInCart: 0, totalAmount: 0 });
  },
  updateQuantity: (variantId, quantity) => {
    set((state) => {
      const updatedItems = state.items.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      );
      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );

      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
        totalItemsInCart: newTotalItems,
      };
    });
  },
});

export const useCartStore = create<CartState>()(devtools(storeApi));
