import React from "react";
import { getRestaurantBySlug } from "@/app/data/getRestaurantBySlug";
import { notFound } from "next/navigation";
import Header from "./components/Header";

type props = {
  params: { slug: string };
  searchParams: { consumptionMethod: string };
};

const page = async ({ params, searchParams }: props) => {
  const { slug } = params;
  const { consumptionMethod } = searchParams;

  const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["TAKEAWAY", "DINE_IN"].includes(consumptionMethod.toUpperCase());
  };

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await getRestaurantBySlug(slug);

  if(!restaurant) {
    return notFound()
  }

  return (
    <div>
      <Header restaurant={restaurant} />
    </div>
  );
};

export default page;
