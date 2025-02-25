"use client";
import React, { useState } from "react";
import { CartProduct } from "../../context/Cart";
import Image from "next/image";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";
import { HookCart } from "../../context/HookCart";

type prop = {
  product: CartProduct;
};

const CartItem = ({ product }: prop) => {
  const { decreaseProductQuantity, increaseProductQuantity, excludeProduct } =
    HookCart();

  const handleIncreaseQuantity = () => {
    increaseProductQuantity(product.id);
  };

  const handleDecreaseQuantity = () => {
    decreaseProductQuantity(product.id);
  };

  const handleExcludeProduct = () => {
    excludeProduct(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-xl bg-gray-100 object-contain"
          />
        </div>

        <div className="space-y-1">
          <p className="w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          {product.discount > 0 ? (
            <div className="flex items-center space-x-2">
              <p className="text-sm font-semibold italic text-red-500 line-through">
                {formatCurrency(product.price)}
              </p>
              <p className="text-sm font-semibold">
                {formatCurrency(product.price - product.discount)}
              </p>
            </div>
          ) : (
            <p className="text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          )}
          <div className="flex items-center gap-1 text-center">
            <Button
              variant="outline"
              className="h-7 w-7 rounded-lg"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeft size={14} />
            </Button>
            <p className="w-4 text-xs">{product.quantity}</p>
            <Button
              variant="destructive"
              className="h-7 w-7 rounded-lg"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="h-7 w-7 rounded-lg"
        variant="outline"
        onClick={handleExcludeProduct}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartItem;
