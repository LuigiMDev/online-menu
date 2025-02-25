import React from "react";
import CpfForm from "./components/cpfForm";
import { isValidCpf } from "../menu/helpers/cpf";
import { db } from "@/lib/prisma";
import Orders from "./components/orders";

type props = {
  searchParams: Promise<{ cpf: string }>;
};

const page = async ({ searchParams }: props) => {
  const { cpf } = await searchParams;
  if (!cpf || !isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    where: { customerCPF: cpf },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return <Orders orders={orders} />;
};

export default page;
