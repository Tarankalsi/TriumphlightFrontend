import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import BillLoader from '../Loaders/BillLoader';
// Import the Skeleton Loader component

export default function Bill({ bill }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a fetch delay for loading state demonstration
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <BillLoader />;
    }
    
    return (
        <>
            <div className="flex justify-between font-semibold mt-2">
                <span>SubTotal</span>
                <span>
                    <FontAwesomeIcon className="mr-1 size-4" icon={faIndianRupee} />
                    {bill.subTotal}
                </span>
            </div>

            <div className="flex justify-between font-semibold mt-2">
                <span>Discount</span>
                <span>
                    <FontAwesomeIcon className="mr-1 size-4" icon={faIndianRupee} />
                    {bill.discount}
                </span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
                <span>Delivery Charges</span>
                <span>
                    <FontAwesomeIcon className="mr-1 size-4" icon={faIndianRupee} />
                    {bill.deliveryFee}
                </span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
                <span>Tax</span>
                <span>
                    <FontAwesomeIcon className="mr-1 size-4" icon={faIndianRupee} />
                    {bill.tax}
                </span>
            </div>
            
            <div className="flex justify-between font-bold mt-2 border-t border-gray-600">
                <span>Total</span>
                <span>
                    <FontAwesomeIcon className="mr-1 size-4" icon={faIndianRupee} />
                    {bill.total}
                </span>
            </div>
        </>
    );
}
