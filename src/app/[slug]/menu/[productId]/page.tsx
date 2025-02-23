import { getProductById } from '@/app/data/getProductById';
import { notFound } from 'next/navigation';
import React from 'react'
import ProductHeader from './components/ProductHeader';
import ProductDetails from './components/ProductDetails';

type props = {
    params: Promise<{productId: string, slug: string}>
}

const page = async ({params}: props) => {

    const {productId, slug} = await params

    const product = await getProductById(productId)

    if(!product) {
        return notFound()
    }

    if(slug.toUpperCase() !== product.restaurant.slug.toUpperCase()) {
        return notFound()
    }


  return (
    <div className='flex h-full flex-col'>
        <ProductHeader product={product} />
        <ProductDetails product={product} restaurant={product.restaurant} />
    </div>
  )
}

export default page