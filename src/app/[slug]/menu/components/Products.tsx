import { formatCurrency } from '@/helpers/format-currency'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type props = {
    products: Product[]
    slug: string
}

const Products = ({products, slug}: props) => {

  const searchParams = useSearchParams()
  const consumptionMethod = searchParams.get("consumptionMethod")

  return (
    <div className='space-y-3 px-5'>
        {products.map((product) => (
            <Link key={product.id} href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`} className='flex items-center justify-between gap-10 py-3 border-b'>
                <div>
                 <h3 className="text-sm font-medium">{product.name}</h3>
                 <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                 {product.discount > 0 ? <div className='flex space-x-2 items-center'>
                  <p className='pt-3 text-sm font-semibold line-through italic text-red-500'>{formatCurrency(product.price)}</p>
                  <p className='pt-3 text-sm font-semibold'>{formatCurrency(product.price - product.discount)}</p>
                 </div> : <p className='pt-3 text-sm font-semibold'>{formatCurrency(product.price)}</p>}
                 
                </div>

                <div className='relative min-h-[82px] min-w-[120px]'>
                <Image src={product.imageUrl} alt={product.name} fill className='object-contain rounded-lg' />
                </div>
            </Link>
        ))}
    </div>
  )
}

export default Products