'use client'
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MenuCategory, Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Products from "./Products";

type props = {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: {
          products: true;
        };
      };
    };
  }>;
};

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: {
        products: true
    }
}>

const Categories = ({ restaurant }: props) => {

    const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0])
    const handleCategoryClick = (menuCategory: MenuCategoriesWithProducts) => {
        setSelectedCategory(menuCategory)
    }

    const getSelectedCategorieVariant = (category: MenuCategory) => {
        return selectedCategory === category ? "default" : "secondary"
    } 

  return (
    <div className="relative z-50 -mt-[1.5rem] rounded-t-3xl bg-white">
      <div className="p-5">
          <div className="flex items-center gap-3">
            <Image
              src={restaurant.avatarImageUrl}
              width={45}
              height={45}
              alt={restaurant.name}
            />
            <div>
              <h1 className="text-lg font-semibold">{restaurant.name}</h1>
              <p className="text-xs opacity-55">{restaurant.description}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
            <ClockIcon size={12} />
            <p>Aberto !</p>
          </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button key={category.id} variant={getSelectedCategorieVariant(category)} size="sm" className="rounded-full" onClick={() => handleCategoryClick(category)}>
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h2 className="px-5 font-semibold pt-2">{selectedCategory.name}</h2>
      <Products products={selectedCategory.products} slug={restaurant.slug} />
    </div>
  );
};

export default Categories;
