import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Spinner from '../../components/general/Spinner';
import Input from '../../components/admin/LoginPage/Input';

import { loginCredentialsAtom } from '../../store/atoms/adminAtoms';
import { useRecoilState } from 'recoil';
import { validateToken } from '../../utils/validateToken';
import OtpVerification from '../../components/admin/LoginPage/OtpVerfication';

const apiUrl = import.meta.env.VITE_URL;

function AdminLogin() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useRecoilState(loginCredentialsAtom);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingToken, setLoadingToken] = useState(true); // New state for token validation
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [adminId, setAdminId] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get('adminToken');
            if (token) {
                const response = await validateToken(token, `${apiUrl}/admin/validate-token`);

                if (response.success) {
                    navigate('/admin');
                } else {
                    setLoadingToken(false); // Stop loading when token validation is done
                }
            } else {
                setLoadingToken(false); // Stop loading when no token is present
            }
        };

        checkToken();
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setError("");
            const response = await axios.post(`${apiUrl}/admin/signin`, {
                email: credentials.email,
                password: credentials.password
            });

            if (response.data.success) {
                setAdminId(response.data.admin_id);
                setShowOtpVerification(true);  // Show OTP verification step
            }

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Login Failed. Please try again later');
            }
            console.error('Login Failed:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerifySuccess = (token) => {
        Cookies.set('adminToken', token, { expires: 7, secure: true, sameSite: 'Lax' });  // Replace with the actual token
        navigate('/admin');
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            await axios.post(`${apiUrl}/admin/resend-otp`, { email: credentials.email });
        } catch (error) {
            setError("Failed to resend OTP. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loadingToken) {
        return <Spinner />; // Show a spinner or loading indicator while checking the token
    }

    return (
        <div>
            <section className="bg-gray-200 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <span className='font-extrabold text-5xl text-indigo-950 pb-4'>Admin Panel</span>
                    <div className="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                            {!showOtpVerification ? (
                                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                    <Input label={"Email"} placeholder={"Enter your email address"} type={"email"} />
                                    <Input label={"Password"} placeholder={"••••••••"} type={"password"} />

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-indigo-800 hover:bg-indigo-950 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800"
                                    >
                                        {loading ? <Spinner /> : 'Log In'}
                                    </button>
                                </form>
                            ) : (
                                <OtpVerification
                                    adminId={adminId}
                                    email={credentials.email}
                                    onVerifySuccess={handleOtpVerifySuccess}
                                    onResendOtp={handleResendOtp}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminLogin;
