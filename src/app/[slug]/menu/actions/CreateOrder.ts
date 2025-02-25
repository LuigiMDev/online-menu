"use server";

import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";
import { removeCpfPunctuation } from "../helpers/cpf";
import { redirect } from "next/navigation";

type prop = {
  customerName: string;
  customerCPF: string;
  products: {
    id: string;
    price: number;
    quantity: number;
    discount: number
  }[];
  consumptionMethod: ConsumptionMethod;
  slug: string
};

export const CreateOrder = async (input: prop) => {

    const restaurant = await db.restaurant.findUnique({where: {slug: input.slug}})

    if (!restaurant) {
        throw new Error("Não foi possível achar o restaurante")
    }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    ProductId: product.id,
    quantity: product.quantity,
    price: (productsWithPrices.find((p) => p.id === product.id)!.price) - product.discount,
  }));

  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCPF: removeCpfPunctuation(input.customerCPF),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities
        },
      },
      total: productsWithPricesAndQuantities.reduce((acc, product) => (
        acc + (product.price * product.quantity)
      ), 0),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id
    },
  });
  redirect(`/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCPF)}`)
};
