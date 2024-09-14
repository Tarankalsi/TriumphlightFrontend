import React, { useState } from 'react';
import { formatDateTime } from '../../utils/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function YourOrderCard({ order, onCancel }) {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    const handleCancelClick = () => {
        onCancel(order.order_id);
        setIsDropdownOpen(false);
    };



    return (
        <div
            className="relative  bg-white shadow-md rounded-lg p-6 transition transform -my-2 scale-90  hover:shadow-xl">
            <div className='grid grid-cols-9 '>
                <div className='col-span-1'>
                    <img src={order.order_items[0].product.images[0].url} alt="" className='w-36 h-36' />
                </div>
                <div className='col-span-8 ml-5'>
                    <div className="flex justify-between items-center mb-4">
                        <div className=' flex items-center gap-4'>
                            <h2 className="text-lg font-bold text-gray-800">Order Date: {formatDateTime(order.order_date)}</h2>
                            <Link to={`/orders/${order.order_id}`} className=" text-blue-600 text-sm cursor-pointer hover:underline">View Full Order</Link>
                        </div>


                        {/* Three-dot button */}
                        <div className="relative">
                            <button
                                onClick={handleDropdownToggle}
                                className="focus:outline-none text-gray-600 hover:text-gray-800"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 7a2 2 0 110-4 2 2 0 010 4zm0 5a2 2 0 110-4 2 2 0 010 4zm0 5a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                                    <button
                                        onClick={handleCancelClick}
                                        className="block w-full text-left px-4 py-2 text-sm font-semibold tracking-wide text-gray-700 hover:bg-blue-700 rounded-lg hover:text-white transition duration-200"
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4 flex justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Items:  {order.order_items.length} </h3>
                            <ul className="list-disc pl-5 text-gray-600">
                                {order.order_items.map((item) => (
                                    <div>
                                        <li className='space-x-6' key={item.order_item_id}>
                                            <span>{item.product.name}</span>
                                            
                                            <span>Quantity: {item.quantity}</span>
                                            
                                            <span>Color: {item.color}</span>
                                          
                                            <span>{item.watt} Watt</span>

                                        </li>
                                    </div>

                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <p className={` text-sm text-gray-600`}>
                            Status: <span className={`${order.status !== "cancelled" ? "text-green-600" : "text-red-600"} font-medium`}>{order.status.toUpperCase()}</span>
                        </p>

                        <p className="text-2xl text-black font-bold"> <FontAwesomeIcon className='size-6' icon={faIndianRupee} /> <strong className="font-bold">{order.total_amount} /-</strong></p>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default YourOrderCard;
