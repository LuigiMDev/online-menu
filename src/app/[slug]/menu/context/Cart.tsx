'use client'
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

type CartContext = {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProductToCart: (product: CartProduct) => void
};

export const CartContext = createContext<CartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: (product: CartProduct) => {}
});

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen)
    }

    const addProductToCart = (product: CartProduct) => {
      setProducts((prev) => [...prev, product])
    }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
