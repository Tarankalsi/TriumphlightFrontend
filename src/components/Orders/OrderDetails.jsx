import React, { useEffect, useState } from 'react';
import { formatDateTime } from '../../utils/formatDate';
import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_URL;

function OrderDetails({ order }) {

    const [user, setUser] = useState("")

    useEffect(() => {
      const fetchUser = async () => {

        try {
            const response = await axios.get(`${apiUrl}/user/data`,{
                headers: {
                  'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            })

            setUser(response.data.data)
        } catch (error) {
            console.error(error)
        }
      } 

      fetchUser()
    }, [])
    

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 transition transform hover:shadow-lg border-l-4 border-blue-600">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Order Details</h2>
            <p className="text-gray-700 mb-2"><strong>Order ID:</strong> {order.order_id}</p>
            <p className="text-gray-700 mb-2"><strong>Order Date:</strong> {formatDateTime(order.order_date)}</p>
            <p className="text-gray-700 mb-4"><strong>Status:</strong> <span className={`font-medium ${order.status === 'delivered' ? 'text-green-600' : 'text-red-600'}`}>{order.status.toUpperCase()}</span></p>
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-blue-700">Delivery Address:</h3>
                <p className="text-gray-700">{order.shipping_address.street}, {order.shipping_address.city}, {order.shipping_address.state}, {order.shipping_address.postal_code}</p>
                <p className="text-gray-700 mt-2"><strong>Mobile Number:</strong> {user.phone_number}</p>
            </div>
        </div>
    );
}

export default OrderDetails;
