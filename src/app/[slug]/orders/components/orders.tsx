"use client";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../menu/[productId]/components/CartSheet";
import { HookCart } from "../../menu/context/HookCart";
import { useRouter } from "next/navigation";

type props = {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>[];
};

type orderProductsWithProducts = Prisma.OrderProductsGetPayload<{
  include: {
    product: true;
  };
}>;

const Orders = ({ orders }: props) => {
  const GetStatusLabel = (status: OrderStatus) => {
    if (status === "FINISHED") return "Finalizado";
    if (status === "IN_PREPARATION") return "Em preparo";
    if (status === "PENDING") return "Pendente";
    return "";
  };

  const { toggleCart, addProductToCart } = HookCart();

  const handleAddToCart = (orderProducts: orderProductsWithProducts[]) => {
    orderProducts.map((orderProduct) => {
      addProductToCart({
        ...orderProduct.product,
        quantity: orderProduct.quantity,
      });
    });
    toggleCart();
  };

  const router = useRouter();

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <div className="space-y-6 p-6">
        <Button variant="secondary" size="icon" className="rounded-full" onClick={handleBack}>
          <ChevronLeftIcon />
        </Button>
        <div className="flex items-center gap-3">
          <ScrollTextIcon />
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
        </div>
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="space-y-4 p-5">
              <div
                className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${order.status === "PENDING" && "bg-gray-400 text-white"} ${order.status === "IN_PREPARATION" && "bg-yellow-50 text-yellow-500"} ${order.status === "FINISHED" && "bg-green-500 text-white"}`}
              >
                {GetStatusLabel(order.status)}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative h-5 w-5">
                  <Image
                    src={order.restaurant.avatarImageUrl}
                    alt={order.restaurant.name}
                    fill
                    className="rounded-sm"
                  />
                </div>
                <p className="text-sm font-semibold">{order.restaurant.name}</p>
              </div>
              <Separator />
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p>{orderProduct.product.name}</p>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between">
                <p>{formatCurrency(order.total)}</p>
                <Button
                  variant="link"
                  className="font-semibold text-red-500 hover:no-underline"
                  onClick={() => handleAddToCart(order.orderProducts)}
                >
                  Adicionar à sacola
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CartSheet />
    </>
  );
};

export default Orders;
