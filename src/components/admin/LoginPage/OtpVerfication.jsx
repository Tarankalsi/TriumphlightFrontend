import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../general/Spinner';

const apiUrl = import.meta.env.VITE_URL;


const OTPVerification = ({ adminId,email, onVerifySuccess, onResendOtp }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError("");
        try {
   
            const response = await axios.post(`${apiUrl}/admin/otp-verification/${adminId}`, { 
                code:otp 
            });
            if (response.data.success) {
            
                onVerifySuccess(response.data.token);
            } else {
    
                setError("Invalid OTP. Please try again.");
            }
        } catch (error) {
            setError("Failed to verify OTP. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 md:space-y-6 sm:p-8">
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            <div>
                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter OTP"
                    required
                />
            </div>
            <button
                type="button"
                className="w-full text-white bg-indigo-800 hover:bg-indigo-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800"
                onClick={handleVerifyOtp}
                disabled={loading}
            >
                {loading ? <Spinner /> : 'Verify OTP'}
            </button>
            <div className="flex justify-between items-center pt-4">
                <span className="text-sm text-gray-600">Didn't receive the code?</span>
                <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                    onClick={onResendOtp}
                    disabled={loading || timer > 0}
                >
                    {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                </button>
            </div>
        </div>
    );
};

export default OTPVerification;
