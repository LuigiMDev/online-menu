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
import { Button } from '@/components/ui/button';

const CartSheet = () => {
    const { toggleCart, isOpen, products } = HookCart();
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className=''>
          <SheetHeader>
            <SheetTitle>Sacola</SheetTitle>
          </SheetHeader>
          <div className='py-5 flex flex-col justify-between h-full gap-5 overflow-hidden'>
 
          <div className='overflow-auto'>
            {products.map((product) => (
                  <CartItem key={product.id} product={product}/>
                ))}
          </div>
         
          <Button className='w-full rounded-full'>Finalizar pedido</Button>
          </div>
        </SheetContent>
      </Sheet>
  )
}

export default CartSheet