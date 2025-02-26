"use client";
import { Product, Restaurant } from "@prisma/client";
import { ChefHatIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { HookCart } from "../../context/HookCart";
import CartSheet from "./CartSheet";

type props = {
  product: Product;
  restaurant: Pick<Restaurant, "name" | "avatarImageUrl">;
};

const ProductDetails = ({ product, restaurant }: props) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    if (quantity < 30) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { toggleCart, addProductToCart } = HookCart();

  const handleAddToCart = () => {
    addProductToCart({ ...product, quantity });
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 -mt-[1.5rem] flex flex-auto flex-col overflow-hidden rounded-3xl p-5">
        <div className="flex flex-auto flex-col overflow-hidden">
          <div className="flex items-center gap-1.5">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />{" "}
            <p className="text-xs text-muted-foreground">{restaurant.name}</p>
          </div>
          <h1 className="mt-1 text-xl font-semibold">{product.name}</h1>

          <div className="mt-3 flex justify-between">
            {product.discount > 0 ? (
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold italic text-red-500 line-through">
                  {formatCurrency(product.price)}
                </h2>
                <h2 className="text-xl font-semibold">
                  {formatCurrency(product.price - product.discount)}
                </h2>
              </div>
            ) : (
              <h2 className="text-xl font-semibold">
                {formatCurrency(product.price)}
              </h2>
            )}

            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-xl"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeft />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={handleIncreaseQuantity}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>

          <ScrollArea>
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold">Sobre</h3>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1.5">
                <ChefHatIcon size={18} />
                <h3 className="font-semibold">Sobre</h3>
              </div>
              <div>
                <ol className="list-disc pl-5">
                  {product.ingredients.map((ingredient) => (
                    <li
                      key={ingredient}
                      className="text-sm text-muted-foreground"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </ScrollArea>
        </div>

        <Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>

      <CartSheet />
    </>
  );
};

export default ProductDetails;
