import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { phoneNumberAtom, selectedAddressAtom } from '../store/atoms/userAtoms';
import Cookies from 'js-cookie';
import Heroone from '../components/Heroone';
import Herolast from '../components/Herolast';
import OrderSummaryCard from '../components/Payment/OrderSummaryCard';
import DeliverAddress from '../components/Payment/DeliverAddress';
import PhoneNumber from '../components/Payment/PhoneNumber';
import Bill from '../components/Payment/Bill';

import CheckoutPageLoader from '../components/Loaders/CheckoutPageLoader';  // Import the full-page loader
import OrderSummaryCardLoader from '../components/Loaders/OrderSummaryCardLoader';

import BillLoader from '../components/Loaders/BillLoader';
import PhoneNumberLoader from '../components/Loaders/PhoneNumberLoader';
import { SyncLoader } from 'react-spinners';
import DeliverAddressLoader from '../components/Loaders/DeliverAddressLaoder';

const apiUrl = import.meta.env.VITE_URL;
const pickup_location_name = import.meta.env.VITE_PICKUP_LOCATION_NAME;

export default function Checkout() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
    const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberAtom);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [cart, setCart] = useState(null);
    const [bill, setBill] = useState({});
    const [loading, setLoading] = useState(true);
    const [functionLoading, setFunctionLoading] = useState(false);
    const [ShowBill, setShowBill] = useState(false)
    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);  // Start loading
                const response = await axios.get(`${apiUrl}/user/cart`, {
                    headers: { 'cart-token': token }
                });
                setCart(response.data.cart);
            } catch (error) {
                console.error("Error fetching cart: ", error);
            } finally {
                setLoading(false);  // Stop loading after data is fetched or on error
            }
        };

        fetchCart();
    }, [token]);

    useEffect(() => {
        const getBill = async () => {
            if (!cart?.cart_id) return;  // Avoid running this effect if cart is not loaded
            try {
                setLoading(true);  // Start loading
                const response = await axios.post(`${apiUrl}/user/cart/bill/${cart.cart_id}`, {
                    "address_id": selectedAddress,
                    "pickup_location_name": pickup_location_name
                }, {
                    headers: { 'cart-token': token }
                });
                setBill(response.data.bill);
                setShowBill(true);
            } catch (error) {
                console.error("Error fetching bill: ", error);
            } finally {
                setLoading(false);  // Stop loading after data is fetched or on error
            }
        };

        getBill();
    }, [cart, selectedAddress, token]);  // Add dependencies to re-run when necessary

    const placeOrder = async () => {
        setFunctionLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/order/create`, {
                "payment_method": paymentMethod,
                "address_id": selectedAddress,
                "pickup_location_name": pickup_location_name
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`,
                    'Content-Type': 'application/json',
                    'cart-token': token
                }
            });

            if (response.status === 200) {
                navigate('/orders');
            }
        } catch (error) {
            console.error("Error placing order: ", error);
        } finally {
            setFunctionLoading(false);
        }
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <>
            {loading && <CheckoutPageLoader />} {/* Show full-page loader when loading */}
            <div className={loading ? 'opacity-50' : ''}> {/* Dim content if loading */}
                <Heroone />
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {loading ? <DeliverAddressLoader /> : <DeliverAddress />}
                            {loading ? <PhoneNumberLoader /> : <PhoneNumber />}
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                                <div>
                                    <input onChange={handlePaymentMethodChange} type="radio" id="cod" name="payment" value="COD" className="mr-2" defaultChecked />
                                    <label htmlFor="cod" className="text-gray-700">Cash on Delivery (COD)</label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                {loading ? (
                                    <>
                                        <OrderSummaryCardLoader />
                                        <OrderSummaryCardLoader />
                                    </>
                                ) : (
                                    cart && cart.cartItems?.map(cartItem => (
                                        <OrderSummaryCard key={cartItem.cart_item_id} cartItem={cartItem} />
                                    ))
                                )}
                                { ShowBill &&  (cart && <Bill bill={bill} />)}
                            </div>

                            <button onClick={placeOrder} className="w-full font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                                {functionLoading ? <SyncLoader size={8} color='#ffffff' /> :"Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
                <Herolast />
            </div>
        </>
    );
}
