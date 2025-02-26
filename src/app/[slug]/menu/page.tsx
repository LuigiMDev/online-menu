import { notFound } from "next/navigation";
import React from "react";

import { getRestaurantBySlug } from "@/app/data/getRestaurantBySlug";

import Categories from "./components/Categories";
import Header from "./components/Header";

type props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
};

const page = async ({ params, searchParams }: props) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["TAKEAWAY", "DINE_IN"].includes(consumptionMethod?.toUpperCase());
  };

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <Header restaurant={restaurant} />
      <Categories restaurant={restaurant} />
    </div>
  );
};

export default page;
