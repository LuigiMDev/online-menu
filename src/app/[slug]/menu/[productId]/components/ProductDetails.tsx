'use client'
import Image from "next/image";
import { Product, Restaurant } from "@prisma/client";
import React, { useState } from "react";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChefHatIcon, ChevronLeft, ChevronRight } from "lucide-react";

type props = {
  product: Product;
  restaurant: Pick<Restaurant, "name" | "avatarImageUrl">;
};

const ProductDetails = ({ product, restaurant }: props) => {

  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantity = () => {
    if(quantity < 30) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="relative z-50 -mt-[1.5rem] rounded-3xl p-5 flex flex-auto flex-col">
      <div className="flex-auto">
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
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h2>
          <div className="flex items-center gap-3 text-center">
            <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
              <ChevronLeft />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">
            Sobre
          </h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1.5">
            <ChefHatIcon size={18} />
          <h3 className="font-semibold">
            Sobre
          </h3>
          </div>
          <ol className="list-disc pl-5">
          {product.ingredients.map((ingredient) => (
            <li key={ingredient} className="text-sm text-muted-foreground">
              {ingredient}
            </li>
          ))}
          </ol>
        </div>
      </div>

      <Button className="rounded-full w-full mt-6">
        Adicionar à sacola
      </Button>
    </div>
  );
};

export default ProductDetails;
