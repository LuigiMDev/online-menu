'use client'
import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeft, ScrollTextIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type props = {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
};

const Header = ({ restaurant }: props) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.coverImageUrl}
        fill
        className="object-cover"
        alt={restaurant.name}
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-30 rounded-full"
        onClick={handleClick}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-30 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default Header;
