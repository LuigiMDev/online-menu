'use client'
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProducts extends Product {
  quantity: number;
}

type CartContext = {
  isOpen: boolean;
  products: CartProducts[];
  toggleCart: () => void;
};

export const CartContext = createContext<CartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<CartProducts[]>([])
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen)
    }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
