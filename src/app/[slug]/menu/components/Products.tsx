import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

import { formatCurrency } from "@/helpers/format-currency";

type props = {
  products: Product[];
  slug: string;
};

const Products = ({ products, slug }: props) => {
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");

  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            {product.discount > 0 ? (
              <div className="flex items-center space-x-2">
                <p className="pt-3 text-sm font-semibold italic text-red-500 line-through">
                  {formatCurrency(product.price)}
                </p>
                <p className="pt-3 text-sm font-semibold">
                  {formatCurrency(product.price - product.discount)}
                </p>
              </div>
            ) : (
              <p className="pt-3 text-sm font-semibold">
                {formatCurrency(product.price)}
              </p>
            )}
          </div>

          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
