import { getProductById } from '@/app/data/getProductById';
import { getRestaurantBySlug } from '@/app/data/getRestaurantBySlug';
import { notFound } from 'next/navigation';
import React from 'react'
import ProductHeader from './components/ProductHeader';

type props = {
    params: Promise<{slug:string, productId: string}>
}

const page = async ({params}: props) => {

    const {slug, productId} = await params;

    const restaurant = await getRestaurantBySlug(slug);

    if(!restaurant) {
        return notFound()
    }

    const product = await getProductById(productId)

    if(!product) {
        return notFound()
    }

  return (
    <>
        <ProductHeader product={product} />
    </>
  )
}

export default page