import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_URL;

export default function CartRow({ cartItem, onQuantityChange }) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const [subTotal, setSubTotal] = useState(0);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product/${cartItem.product_id}`);
                const fetchedProduct = response.data.data;
                setProduct(fetchedProduct);
                setSubTotal(fetchedProduct.price * quantity);
            } catch (error) {
                console.error("Error fetching product: ", error);
            }
        };
        fetchProduct();
    }, [cartItem.product_id, quantity]);

    useEffect(() => {
        if (product) {
            setSubTotal(quantity * product.price);
        }
    }, [quantity, product]);

    const updateQuantity = async (newQuantity) => {
        try {
            await axios.put(`${apiUrl}/user/update/cart/quantity/${cartItem.cart_item_id}`, { quantity: newQuantity }, {
                headers: {
                    'cart-token': localStorage.getItem('cartToken')
                }
            });
            setQuantity(newQuantity);
            // Notify parent about the quantity change
            onQuantityChange();
        } catch (error) {
            console.error("Error updating quantity: ", error);
        }
    };

    const incrementCount = () => {
        updateQuantity(quantity + 1);
    };

    const decrementCount = () => {
        if (quantity > 1) {
            updateQuantity(quantity - 1);
        }
    };

    return (
        <div className="flex flex-col py-1">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 bg-white shadow-lg rounded-lg">
                <div className='flex'>
                    <div className="w-24">
                        <img
                            className="rounded-md w-24 h-20 object-cover"
                            src={product?.images[0].url || "placeholder.jpg"}
                            alt={product?.name || "Product Image"}
                        />
                    </div>
                    <div className="flex flex-col justify-center mx-4">
                        <p className="text-lg font-semibold">{product?.name || "Product Name"}</p>
                        <p className="text-sm text-gray-600">Color: {cartItem.color}</p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="flex flex-row sm:flex-col space-x-8 sm:space-x-2 justify-center items-center">
                        <p className="text-lg font-semibold">Rs. {subTotal}</p>
                        <div className="flex justify-center items-center mt-2">
                            <button
                                className="text-lg font-semibold px-2 py-1 border rounded-l bg-gray-100 hover:bg-gray-200"
                                onClick={decrementCount}
                            >-</button>
                            <p className="text-lg font-semibold px-4">{quantity}</p>
                            <button
                                className="text-lg font-semibold px-2 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
                                onClick={incrementCount}
                            >+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
