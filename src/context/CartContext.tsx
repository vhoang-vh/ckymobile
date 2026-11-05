import React, { createContext, useContext, useMemo, useState } from "react";
import { CartItem, Product } from "../types";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: React.PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = useMemo(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    addToCart: (product: Product) => setItems((previous) => {
      const existing = previous.find((item) => item.product.id === product.id);
      return existing
        ? previous.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...previous, { product, quantity: 1 }];
    }),
    setQuantity: (productId: string, quantity: number) => setItems((previous) =>
      quantity <= 0
        ? previous.filter((item) => item.product.id !== productId)
        : previous.map((item) => item.product.id === productId ? { ...item, quantity } : item)),
    clearCart: () => setItems([]),
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart phải được dùng bên trong CartProvider");
  return context;
}
