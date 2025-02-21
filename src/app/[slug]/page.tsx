import { notFound } from "next/navigation";
import React from "react";

import { getRestaurantBySlug } from "../data/getRestaurantBySlug";
import Image from "next/image";
import takeway from "@/assets/welcome/takeway.svg"
import dineIn from "@/assets/welcome/dineIn.svg"
import OptionConsumptionMethod from "./components/OptionConsumptionMethod";

type props = {
  params: { slug: string };
};

const page = async ({ params }: props) => {
  const { slug } = params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={82} height={82} />
        <h1 className="font-semibold">
          {restaurant.name}
        </h1>
      </div>
      <div className="pt-24 text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          Seja bem vindo
        </h2>
        <p className="opacity-55">Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada detalhe!</p>
      </div>
      <div className="pt-14 grid grid-cols-2 gap-4">
        <OptionConsumptionMethod imageUrl={dineIn} altImage="Para comer aqui" text="Para comer aqui" option="DINE_IN" />
        <OptionConsumptionMethod imageUrl={takeway} altImage="Para levar" text="Para levar" option="TAKEAWAY" />
      </div>
    </div>
  );
};

export default page;
