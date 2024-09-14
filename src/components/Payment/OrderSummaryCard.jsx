import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is imported here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';

const apiUrl = import.meta.env.VITE_URL;

function OrderSummaryCard({ cartItem }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/${cartItem.product_id}`);
        const fetchedProduct = response.data.data;
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [cartItem.product_id]);

  if (!product) return null; // Return null or a loading indicator while fetching

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <img src={product.images[0].url} alt={product.name} className="w-24 h-24 object-cover" />
      <div className="p-4 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">Color: {cartItem.color}</p>
          <p className="text-sm text-gray-500">Quantity: {cartItem.quantity}</p>
          <p className="text-sm text-gray-500">{cartItem.watt.watt}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold"><FontAwesomeIcon className='size-4 mr-1' icon={faIndianRupee}/>{cartItem.watt.price}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryCard;
