import { Product } from '@prisma/client'
import React from 'react'
import HeaderButtons from '@/components/HeaderButtons';
import Image from 'next/image';

type props = {
    product: Pick<Product, "name" | "imageUrl">
}

const ProductHeader = ({product}: props) => {
  return (
    <div className='relative h-[300px] w-full'>
            <Image src={product.imageUrl} fill className='object-contain' alt={product.name} />
            <HeaderButtons />
        </div>
  )
}

export default ProductHeader