import React from 'react'

export interface ProductProps {
  name: string;
  price: number;
  totalSells: number;
  image: string;
  stockLeft: number;
}

export default function Product({name, price, totalSells, image, stockLeft}:ProductProps) {
  return (
    <div className='m-4'>
      <img src={image} alt=''/>
      <div className='mt-2'>
        <h3 className='font-bold text-blue-500'>
          {name}
        </h3>
        <div className='text-sm'>
          <div >
            <strong className='text-slate-500'>Price: </strong>
            <span>{price}</span>
          </div>
          <div>
            <strong className='text-slate-500'>Total sell: </strong>
            <span>{totalSells}</span>
          </div>
          <div>
            <strong className='text-slate-500'>Stock Left: </strong>
            <span>{stockLeft}</span>
          </div>
        </div>
        
        
        
      </div>

    </div>
  )
}
