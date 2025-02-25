import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HookCart } from "../../context/HookCart";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";

const CartSheet = () => {
  const { toggleCart, isOpen, products, subtotal, discounts, total } = HookCart();
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
                <div className="flex justify-between border-b p-2  text-sm">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>{formatCurrency(subtotal)}</p>
                </div>
                <div className="flex justify-between border-b p-2  text-sm">
                  <p className="text-muted-foreground">Descontos</p>
                  <p>{formatCurrency(discounts)}</p>
                </div>
                <div className="flex justify-between p-2 font-semibold">
                  <p>Total</p>
                  <p>{formatCurrency(total)}</p>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full rounded-full">Finalizar pedido</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
