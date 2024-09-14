import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function OrderItemCard({ item }) {

    return (
        <div className="flex flex-row bg-white shadow-md rounded-lg p-4 mb-4 transition transform hover:shadow-lg">
            <div className="">
                <img src={item.product.images[0].url} alt={item.product.name} className="rounded-lg size-28 object-cover " />
            </div>
            <div className="ml-4 mt-4 sm:mt-0 flex flex-col justify-center w-3/4">
                <div>
                    <h3 className="sm:text-lg font-semibold text-blue-700">{item.product.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-700">Color: <span className="font-medium">{item.color}</span></p>
                    <p className="text-xs sm:text-sm text-gray-700">Variant: <span className="font-medium">{item.watt} Watt</span></p>
                    <p className="text-xs sm:text-sm text-gray-700">Quantity: <span className="font-medium">{item.quantity}</span></p>
                    <p className="text-xs sm:text-sm text-gray-700">Unit Price: <span className="font-medium"><FontAwesomeIcon icon={faIndianRupee}/>{item.unit_price.toFixed(2)}</span></p>
                </div>
            </div>
        </div>
    );
}

export default OrderItemCard;
