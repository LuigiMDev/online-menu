"use client";
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl" | "discount"> {
  quantity: number;
}

type CartContext = {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  excludeProduct: (productId: string) => void;
  subtotal: number;
  discounts: number;
  total: number;
  totalQuantities: number;
};

export const CartContext = createContext<CartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: (_product: CartProduct) => {},
  decreaseProductQuantity: (_productId: string) => {},
  increaseProductQuantity: (_productId: string) => {},
  excludeProduct: (_productId: string) => {},
  subtotal: 0,
  discounts: 0,
  total: 0,
  totalQuantities: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyInCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );

    if (!productIsAlreadyInCart) {
      return setProducts((prev) => [...prev, product]);
    }
    setProducts((prev) => {
      return prev.map((prevProduct) => {
        if (prevProduct.id !== product.id) {
          return prevProduct;
        }

        if (prevProduct.quantity + product.quantity < 30) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        } else {
          return {
            ...prevProduct,
            quantity: 30,
          };
        }
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProduct) => {
      return prevProduct.map((product) => {
        if (product.id !== productId) {
          return product;
        }
        if (product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProduct) => {
      return prevProduct.map((product) => {
        if (product.id !== productId) {
          return product;
        }
        if (product.quantity < 30) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    });
  };

  const excludeProduct = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => {
        return product.id !== productId;
      });
    });
  };

  const subtotal = products.reduce((acc, product) => {
    return (acc += product.price * product.quantity);
  }, 0);

  const discounts = products.reduce((acc, product) => {
    return (acc += product.discount * product.quantity);
  }, 0);

  const total = subtotal - discounts;

  const totalQuantities = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        excludeProduct,
        subtotal,
        discounts,
        total,
        totalQuantities,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
