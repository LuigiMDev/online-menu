"use client";
import React, { useState } from "react";
import { CartProduct } from "../../context/Cart";
import Image from "next/image";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";

type prop = {
  product: CartProduct;
};

const CartItem = ({ product }: prop) => {
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
          <p className="text-xs w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button
              variant="outline"
              className="h-7 w-7 rounded-lg"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeft size={14} />
            </Button>
            <p className="w-4 text-xs">{quantity}</p>
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
      <Button className="h-7 w-7 rounded-lg" variant="outline">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartItem;
