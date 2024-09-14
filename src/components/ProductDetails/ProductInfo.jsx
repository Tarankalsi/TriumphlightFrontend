import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const apiUrl = import.meta.env.VITE_URL;

const ProductInfo = ({ product, isLoggedIn, setShowModal }) => {
    const navigate = useNavigate()
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedWatt, setSelectedWatt] = useState(product.watts[0]);
    const [quantity, setQuantity] = useState(1);
    const [colorError, setColorError] = useState(false);
    const [wattError, setWattError] = useState(false)
    const [isInCart, setIsInCart] = useState(false);
    const [buyNowLoader, setBuyNowLoader] = useState(false);

    const discount = selectedWatt.price * (product.discount_percent / 100)

    useEffect(() => {

        const checkProductInCart = async () => {
            try {
                const cartToken = localStorage.getItem('cartToken');
                if (cartToken) {
                    const response = await axios.get(`${apiUrl}/user/cart`, {
                        headers: {
                            'cart-token': cartToken
                        }
                    });



                    const cartItems = response.data.cart.cartItems || [];
                    const productInCart = cartItems.some(item => item.product_id === product.product_id);

                    setIsInCart(productInCart);  // Set the state based on the product check
                }
            } catch (error) {
                console.error("Error checking product in cart:", error);
            }
        };

        checkProductInCart();
    }, [product.product_id]);

    const addToCartHandle = async () => {
        try {
            if (selectedColor === null) {
                setColorError(true);
                setTimeout(() => {
                    setColorError(false);
                }, 2000);
                return;
            }

            if (selectedWatt === null) {
                setWattError(true);
                setTimeout(() => {
                    setWattError(false);
                }, 2000);
                return;
            }


            const authToken = Cookies.get('authToken');
            const cartToken = localStorage.getItem('cartToken');

            if (authToken) {
                if (!cartToken) {
                    const newCart = await axios.post(`${apiUrl}/user/create/cart`, {
                        "is_temporary": false,
                    }, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    localStorage.setItem('cartToken', newCart.data.cartToken);
                }
                await axios.post(`${apiUrl}/user/addToCart/${product.product_id}`, {
                    quantity: quantity,
                    color: selectedColor,
                    watt_id:selectedWatt.watt_id,

                },
                    {
                        headers: {
                            'cart-token': `${localStorage.getItem('cartToken')}`
                        }
                    });
                setIsInCart(true);
            } else {

                if (!cartToken) {
                    const newCart = await axios.post(`${apiUrl}/user/create/cart`, {
                        "is_temporary": false,
                    });
                    localStorage.setItem('cartToken', newCart.data.cartToken);
                }
                await axios.post(`${apiUrl}/user/addToCart/${product.product_id}`, {
                    quantity: quantity,
                    color: selectedColor,
                    watt_id: selectedWatt.watt_id,
                },
                    {
                        headers: {
                            'cart-token': `${localStorage.getItem('cartToken')}`
                        }
                    });
                setIsInCart(true);
            }
            // Ensure the button updates immediately after adding to cart
        } catch (error) {
            console.error(error);
        }
    };


    const onBuyNowClick = async () => {
        if (!isLoggedIn) {
            setShowModal(true);
            return; // Exit early if the user is not logged in
        }

        if (selectedColor === null) {
            setColorError(true);
            setTimeout(() => {
                setColorError(false);
            }, 2000);
            return;
        }

        if (selectedWatt === null) {
            setWattError(true);
            setTimeout(() => {
                setWattError(false);
            }, 2000);
            return;
        }

        setBuyNowLoader(true);

        const authToken = Cookies.get('authToken');
        let tempCartToken = localStorage.getItem('tempCart');

        try {
            if (tempCartToken) {
                // Delete existing items in the temporary cart
                await axios.delete(`${apiUrl}/user/delete/cart/tempCartItems`, {
                    headers: {
                        'cart-token': tempCartToken,
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                // Add the product to the existing temporary cart
                const addProductResponse = await axios.post(
                    `${apiUrl}/user/addToCart/${product.product_id}`,
                    {
                        quantity: quantity,
                        color: selectedColor,
                        watt_id: selectedWatt.watt_id,
                    },
                    {
                        headers: {
                            'cart-token': tempCartToken,
                        },
                    }
                );

                if (addProductResponse.status === 200) {
                    navigate(`/cart/checkout/${tempCartToken}`);
                }
            } else {
                // No temporary cart exists; create a new temporary cart
                if (!authToken) {
                    console.error('User is not authenticated.');
                    return; // Exit if user is not authenticated
                }


                const tempCartResponse = await axios.post(
                    `${apiUrl}/user/create/cart`,
                    { "is_temporary": true },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                const tempToken = tempCartResponse.data.cartToken;
                if (!tempToken) {
                    console.error('Failed to create temporary cart.');
                    return; // Exit if temporary cart creation failed
                }

                await axios.delete(`${apiUrl}/user/delete/cart/tempCartItems`, {
                    headers: {
                        'cart-token': tempToken,
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                // Store the newly created temporary cart token in localStorage
                localStorage.setItem('tempCart', tempToken);



                // Add the product to the newly created temporary cart
                const addProductResponse = await axios.post(
                    `${apiUrl}/user/addToCart/${product.product_id}`,
                    {
                        quantity: quantity,
                        color: selectedColor,
                        watt_id: selectedWatt.watt_id,
                    },
                    {
                        headers: {
                            'cart-token': tempToken,
                        },
                    }
                );

                if (addProductResponse.status === 200) {
                    navigate(`/cart/checkout/${tempToken}`);
                }
            }
        } catch (error) {
            console.error('Error handling the Buy Now process:', error);
        } finally {
            setBuyNowLoader(false); // Ensure the loader is stopped in both success and error cases
        }
    };


    const goToCart = () => {
        // Redirect to the cart page
        navigate('/cart')
    };

    return (
        <div>
            <div className='w-full md:w-full p-2 flex flex-col justify-between'>
                <div className='p-4 flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-lg font-semibold sm:text-xl lg:text-2xl'>{product.name}</p>
                        <p className='text-sm sm:text-base text-gray-500'>By {product.brand}</p>
                    </div>
                    <div className="flex items-center gap-3">




                        {/* Discounted Price */}
                        <p className='text-xl font-semibold sm:text-3xl text-blue-900'>
                            <FontAwesomeIcon className='mr-1 size-6' icon={faIndianRupee} />
                            {parseInt(selectedWatt.price - discount)}
                        </p>
                        {/* Original Price with strikethrough */}
                        <div className="text-md text-red-600 tracking-wider flex items-center line-through">
                            <span className="font-semibold ">₹</span>
                            <span>{selectedWatt.price}</span>
                        </div>


                        {/* Optional: Discount Percentage */}


                        <p className='text-sm  text-green-600 font-semibold'>
                            ({product.discount_percent}% OFF)
                        </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm sm:text-lg font-medium'>Color</p>
                        <div className='flex gap-2'>
                            {product.colors && product.colors.length > 0 ? (
                                product.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`relative rounded-full w-8 h-8 cursor-pointer border-2 ${selectedColor === color.color.color_name ? 'border-black' : 'border-gray-400'}`}
                                        title={color.color.color_name}
                                        style={{ backgroundColor: color.color.hex }}
                                        onClick={() => setSelectedColor(color.color.color_name)}
                                    />
                                ))
                            ) : (
                                <p className='text-sm text-gray-500'>No colors available</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className='text-sm sm:text-lg font-medium'>Watt</p>
                        <div className="flex gap-3">
                           {product.watts && product.watts.length > 0 ? (
                            product.watts.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer px-4 py-2  font-semibold rounded-lg border  shadow-md hover:shadow-xl hover:scale-105 transition ${selectedWatt === item? 'border-gray-600' : 'border-gray-400'}`}
                                        onClick={() => setSelectedWatt (item)}
                                    >
                                        {item.watt} Watt
                                    </div>
                                ))
                            ) : (
                                <p className='text-sm text-gray-500'>No watts available</p>
                            )}
                        
                     

                        </div>
                    </div>


                    <div>
                        <h2 className="font-kalra text-brown-4 font-semibold mb-2">Quantity</h2>
                        <div className="border border-gray-400 inline-block hover:border-brown-4">
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        if (quantity > 1) {
                                            setQuantity(quantity - 1)
                                        }
                                    }}
                                    className=" px-3 py-2 hover:bg-gray-300 hover:bg-opacity-50"><FontAwesomeIcon className="" icon={faMinus} />
                                </button>
                                <div className="text-lg px-4">{quantity}</div>
                                <button
                                    onClick={() => { setQuantity(quantity + 1) }}
                                    className=" px-3 py-2 hover:bg-gray-300 hover:bg-opacity-50 " ><FontAwesomeIcon className="" icon={faPlus} />
                                </button>
                            </div>
                        </div>
                        {product.availability <= 10 &&
                            <div className="my-6">
                                <div className="text-brown-4 font-semibold mb-1">Stock Remaining</div>
                                <div className="text-brown-3 text-xs tracking-wide ">Only {product.availability} left. Order Soon</div>
                            </div>
                        }
                    </div>
                    {product.availability > 0 ? (
                        <div className='flex flex-col gap-2'>
                            {wattError && <span className="text-red-700 text-center text-sm tracking-wider">Please select a watt</span>}
                            {colorError && <span className="text-red-700 text-center text-sm tracking-wider">Please select a color</span>}
                            {isInCart ? (
                                <button onClick={goToCart} className='rounded-lg bg-blue-600 hover:bg-blue-700 text-white h-8 sm:h-10 text-sm'>
                                    Go to Cart
                                </button>
                            ) : (
                                <button onClick={addToCartHandle} className='rounded-lg bg-blue-600 hover:bg-blue-700 text-white h-8 sm:h-10 text-sm'>
                                    Add To Cart
                                </button>
                            )}
                            <button onClick={onBuyNowClick} className='rounded-lg bg-gray-500 hover:bg-gray-800 text-white h-8 sm:h-10 text-sm'>
                                {buyNowLoader ? <SyncLoader size={8} color='#ffffff' /> : "Buy Now"}
                            </button>

                        </div>
                    ) : (
                        <div>
                            <div className="text-2xl font-bold text-red-500">Sold Out</div>
                            <div className="text-lg  font-semibold text-gray-600">This item is currently out of stock</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
