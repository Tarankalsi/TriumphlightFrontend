import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function ProductCard({ product }) {


  const discount = product.watts[0].price * (product.discount_percent / 100)

  return (
    <div>
  <Link to={`/products/item/${product.product_id}`} state={product}>
    <div className='card-conatiner w-[150px] h-[280px] lg:w-[190px] lg:h-[350px] bg-slate-100 flex flex-col justify-between'>
      {/* Image Section */}
      <div className="group">
        <div className="overflow-hidden class-imageholder bg-slate-500">
          <div className='w-[150px] h-[150px] lg:w-[190px] lg:h-[190px] pt-[-10px]'>
            <img
              className="z-0 transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={product.images[0].url}
              alt={product.name}
            />
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className='w-[150px] h-[90px] lg:w-[190px] lg:h-[110px] flex flex-col gap-[5px] justify-center'>
        <p className='text-[13px] ml-[5px] font-semibold lg:text-[15px]'>{product.name}</p>
        <p className='ml-[5px] text-[13px] text-gray-600'>{product.category.name} - {product.watts[0].watt} Watt</p>
        
       
        {/* Price Section */}
        <div className="ml-2 flex items-center space-x-2">
         
      
          {/* Discounted Price */}
          <p className='text-lg font-bold text-gray-900'>
            <FontAwesomeIcon className='mr-1' icon={faIndianRupee} />
            {parseInt(product.watts[0].price - discount)}/-
          </p>
          {/* Original Price with strikethrough */}
          <p className='text-sm  text-red-600  line-through'>
          ₹{product.watts[0].price}
          </p>
          {/* Optional: Discount Percentage */}
         
        </div>
        <p className='text-sm ml-2 text-green-600 font-semibold'>
            ({product.discount_percent}% OFF)
          </p>
      </div>

      {/* Button Section */}
      <div className='button w-[150px] h-[30px] lg:w-[190px] lg:h-[30px] bg-slate-600 flex justify-center'>
        <button>
          <p className='text-[12px] font-medium text-white'>View</p>
        </button>
      </div>
    </div>
  </Link>
</div>


  )
}
