import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HookCart } from '../../context/HookCart';

const CartSheet = () => {
    const { toggleCart, isOpen, products } = HookCart();
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              {products.map((product) => (
                <p>{product.name}</p>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
  )
}

export default CartSheet