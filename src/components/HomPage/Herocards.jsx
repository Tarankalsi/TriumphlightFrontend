import React, { useEffect, useState } from 'react';
import ProductCard from '../general/ProductCard';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton CSS

const apiUrl = import.meta.env.VITE_URL;

const Herocards = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchProducts = async () => {
      if (category && category.category_id) {
        setLoading(true); // Start loading
        try {
          const response = await axios.get(`${apiUrl}/product/category/${category.category_id}`);
          setProducts(response.data.products);
          console.log(response.data.products)
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false); // Stop loading
        } 
      }
    };
    fetchProducts();

  }, [category]);

  // Skeleton Loader for Products
  const renderSkeletons = () => {
    return (
      <div className='card-backs 2xl:w-[1200px] flex 2xl:justify-center pl-[5px] py-[20px] gap-[15px]'>
        {Array(3) // Adjust the number for how many skeleton loaders you want
          .fill(0)
          .map((_, index) => (
            <div key={index} className='w-[200px] h-[300px] bg-white p-4 rounded-lg shadow-lg'>
              <Skeleton height={150} />
              <Skeleton count={2} style={{ marginTop: '10px' }} />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className='px-[10px] py-[5px] 2xl:flex 2xl:flex-col 2xl:items-center sm:px-[25px] sm:py-[5px] md:px-[35px] lg:px-[65px] xl:px-[100px] 2xl:px-[200px]'>
      <div className='flex justify-center py-[10px] '>
        <p className='text-[20px] tracking-wide sm:text-[24px] lg:text-[26px] xl:text-[28px] font-semibold'>
          {category?.name}
        </p>
      </div>
      {/* Show Skeleton Loader when loading */}
      {loading ? (
        renderSkeletons()
      ) : (
        <div className='card-backs 2xl:w-[1200px] flex 2xl:justify-center pl-[5px] py-[20px] gap-[15px]'>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard product={product} key={product.product_id} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Herocards;
