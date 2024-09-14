import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedAddressAtom } from '../../store/atoms/userAtoms';
import Cookies from 'js-cookie';
import axios from 'axios';
import AddressLoader from '../Loaders/AddressLoader';
 // Import SkeletonLoader component

const apiUrl = import.meta.env.VITE_URL;

export default function DeliverAddress() {
    const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
    const [userId, setUserId] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State for loading status
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: '',
        city: '',
        state: '',
        country: '',
        postal_code: ''
    });

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const user = await axios.get(`${apiUrl}/user/data`, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('authToken')}`
                    }
                });

                setAddresses(user.data.data.address);
                setUserId(user.data.data.user_id);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            } finally {
                setIsLoading(false); // Set loading to false after fetch completes
            }
        };

        fetchAddresses();
    }, []);

    const handleAddressSelect = (id) => {
        setSelectedAddress(id);
    };

    const handleAddressDelete = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/user/delete/address/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            });

            // Update addresses state after successful deletion
            setAddresses((prev) => prev.filter((address) => address.address_id !== id));
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleNewAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewAddress = async () => {
        if (newAddress.street && newAddress.city && newAddress.state && newAddress.country && newAddress.postal_code) {
            try {
                const response = await axios.post(`${apiUrl}/user/add`, {
                    ...newAddress
                }, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('authToken')}`
                    }
                });


                // Add new address to the state
                setAddresses((prev) => [...prev, response.data]);
                setIsModalOpen(false);
                setNewAddress({
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                    postal_code: ''
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Select Address</h2>

                {isLoading ? (
                    // Show skeleton loader when loading
                    <AddressLoader />
                ) : (
                    addresses.map((addr) => (
                        <div key={addr.address_id} className={`border p-4 mb-4 rounded-lg ${selectedAddress === addr.address_id ? 'border-blue-500' : 'border-gray-300'}`}>
                            <p className="text-gray-600">{addr.street}, {addr.city}-{addr.postal_code}, {addr.state}</p>
                            <div className="flex items-center space-x-2 mt-2">
                                <button onClick={() => handleAddressSelect(addr.address_id)} className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
                                    Select
                                </button>
                                <button onClick={() => handleAddressDelete(addr.address_id)} className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
                <button onClick={() => setIsModalOpen(true)} className="mt-4 text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                    Add New Address
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
                        <input type="text" name="street" placeholder="Street Address" value={newAddress.street} onChange={handleNewAddressChange} className="mb-2 p-2 w-full border rounded" />
                        <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleNewAddressChange} className="mb-2 p-2 w-full border rounded" />
                        <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleNewAddressChange} className="mb-2 p-2 w-full border rounded" />
                        <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleNewAddressChange} className="mb-2 p-2 w-full border rounded" />
                        <input type="text" name="postal_code" placeholder="Pincode" value={newAddress.postal_code} onChange={handleNewAddressChange} className="mb-4 p-2 w-full border rounded" />
                        <div className="flex justify-end">
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-700 mr-4">Cancel</button>
                            <button onClick={handleAddNewAddress} className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                                Save Address
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
