import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function ProductCard({ product }) {
  console.log(product)
  return (
    <div>
      <Link to={`/products/item/${product.product_id}`} state={product}>
        <div className='card-conatiner  w-[150px] h-[280px] lg:w-[190px] lg:h-[350px] bg-slate-100 flex flex-col justify-between'>

          <div className="group   ">
            <div className="  overflow-hidden class-imageholder bg-slate-500 ">
              <div className='w-[150px] h-[150px] lg:w-[190px] lg:h-[190px] pt-[-10px]'>
                <img
                  className="  z-0   transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  src={product.images[0].url} />

              </div>

            </div>

          </div>

          <div className='w-[150px] h-[90px] lg:w-[190px] lg:h-[110px]   flex flex-col gap-[5px] justify-center'>
            <p className='text-[13px] ml-[5px] font-semibold lg:text-[15px]'>{product.name}</p>
            <p className='ml-[5px]  text-[13px]'>{product.category.name}</p>
            
            <p className='text-[14px] ml-[5px] font-semibold lg:text-[20px] ' >
              <FontAwesomeIcon className='size-3' icon={faIndianRupee}/>
              {product.price}/-</p>
          </div>

          <div className='button w-[150px] h-[30px] lg:w-[190px] lg:h-[30px] bg-slate-600 flex justify-center'>
            <button ><p className='text-[12px] font-medium  text-white'>View </p></button>
          </div>

        </div>
      </Link>
    </div>
  )
}
