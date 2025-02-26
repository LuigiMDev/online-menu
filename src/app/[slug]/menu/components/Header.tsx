import { Restaurant } from "@prisma/client";
import Image from "next/image";
import React from "react";

import HeaderButtons from "@/components/HeaderButtons";

type props = {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
};

const Header = ({ restaurant }: props) => {
  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.coverImageUrl}
        fill
        className="object-cover"
        alt={restaurant.name}
      />
      <HeaderButtons />
    </div>
  );
};

export default Header;
