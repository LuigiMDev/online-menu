"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HookCart } from "../../context/HookCart";
import CartItem from "./CartItem";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import FinishedOrderButton from "./FinishedOrderButton";
import { Button } from "@/components/ui/button";

const CartSheet = () => {
  const { toggleCart, isOpen, products, subtotal, discounts, total } =
    HookCart();

  const [open, onOpenChange] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between gap-5 overflow-hidden py-5">
          <div className="overflow-auto">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>

          <div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between border-b p-2 text-sm">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>{formatCurrency(subtotal)}</p>
                </div>
                <div className="flex justify-between border-b p-2 text-sm">
                  <p className="text-muted-foreground">Descontos</p>
                  <p>{formatCurrency(discounts)}</p>
                </div>
                <div className="flex justify-between p-2 font-semibold">
                  <p>Total</p>
                  <p>{formatCurrency(total)}</p>
                </div>
                <Button className="w-full rounded-full" onClick={() => onOpenChange(true)}>Finalizar pedido</Button>
              </CardContent>
            </Card>
            <FinishedOrderButton open={open} onOpenChange={onOpenChange} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
