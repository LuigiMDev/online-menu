import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HookCart } from '../../context/HookCart';
import CartItem from './CartItem';

const CartSheet = () => {
    const { toggleCart, isOpen, products } = HookCart();
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className=''>
          <SheetHeader>
            <SheetTitle>Sacola</SheetTitle>
          </SheetHeader>
          <div className='py-5'>
          {products.map((product) => (
                <CartItem key={product.id} product={product}/>
              ))}
          </div>
        </SheetContent>
      </Sheet>
  )
}

export default CartSheet