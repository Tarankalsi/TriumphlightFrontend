import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Spinner from './general/Spinner';

const apiUrl = import.meta.env.VITE_URL;

// Email validation function
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-16">
    <div className="w-8 h-8 border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
  </div>
);

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [signup, setSignup] = useState({
    full_name: "",
    email: ""
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(30); // Countdown for resend OTP
  const [showSignUp, setShowSignUp] = useState(false); // Toggle sign-up section
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignupForm = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: value
    }));
    if (name === 'email') {
      setError(''); // Clear email error when user starts typing
    }
  }

  // Verify email on button click
  const handleVerifyEmail = async () => {
    if (email.trim() === '') {
      setError('Email field cannot be empty');
      setIsEmailVerified(false);
    } else if (isValidEmail(email)) {
      setIsEmailVerified(true);
      setLoading(true); // Start loading

      try {
        const response = await axios.post(`${apiUrl}/user/signin`, { email });
        setUserId(response.data.user.user_id);
      } catch (error) {
        console.error(error);
        setError('Failed to send verification email. Please try again.');
        setIsEmailVerified(false);
      } finally {
        setLoading(false); // Stop loading
      }

      // For debugging purposes
      setCountdown(30); // Reset countdown for OTP resend
    } else {
      setError('Invalid email format');
      setIsEmailVerified(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setOtpError(''); // Clear OTP error when user starts typing
  };

  // Verify OTP on button click
  const handleVerifyOtp = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${apiUrl}/user/otp-verification/${userId}`, {
        code: otp
      });
      if (response.data.success) {
        Cookies.set('authToken', response.data.token, { expires: 7, secure: true, sameSite: 'Strict' });

        const cartToken = localStorage.getItem('cartToken');

        if (cartToken) {

          <div className="0">

          </div>
          const cart = await axios.get(`${apiUrl}/user/cart`, {
            headers: {
              'cart-token': cartToken
            }
          })

      
          const addUserResponse = await axios.put(`${apiUrl}/user/add-user-id/${cart.data.cart.cart_id}`, {}, {
            headers: {
              'Authorization': `Bearer ${response.data.token}`
            }
          })


        }
        onClose();
        window.location.reload();
      } else {
        setOtpError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Request new OTP
  const handleRequestNewOtp = async () => {
    setOtp(''); // Clear the current OTP
    setOtpError(''); // Clear any existing OTP error
    setLoading(true); // Start loading
    await axios.post(`${apiUrl}/user/signin`, {
      email: email || signup.email
    });
    setCountdown(30); // Reset countdown for OTP resend
    setLoading(false); // Stop loading
  };

  // Handle back button click
  const handleBackToEmail = () => {
    setIsEmailVerified(false);
    setOtpVerified(false);
    setOtp('');
  };

  // Toggle the Sign-Up form
  const handleSignUpToggle = () => {
    setShowSignUp(!showSignUp);
    setIsEmailVerified(false);
    setOtpVerified(false);
    setOtp('');
    setEmail('');
    setError('');
    setOtpError('');
  };

  // Handle Sign-Up form submission (you can adjust this based on your signup logic)
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!signup.full_name.trim()) {
      setError('Full Name is required');
      return;
    }

    if (!isValidEmail(signup.email.trim())) {
      setError('Invalid email format');
      return;
    }

    setError(''); // Clear previous errors
    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${apiUrl}/user/signup`, signup);
      if (response.data.success) {
        setUserId(response.data.user.user_id)
        setIsEmailVerified(true);
        setShowSignUp(false);
      } else {
        setError(response.data.error.message || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8 bg-gray-100">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg">

        {!showSignUp ? (
          <div>
            {!isEmailVerified && (
              <div>
                <p className="text-2xl font-semibold text-center mb-6 text-gray-800">Email Verification</p>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    aria-describedby="email-error"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={handleVerifyEmail}
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Next
                </button>
                {error && <p id="email-error" className="mt-2 text-red-600 text-center">{error}</p>}
                <p
                  className="mt-4 text-sm text-center text-indigo-600 cursor-pointer hover:text-indigo-700"
                  onClick={handleSignUpToggle}
                >
                  Don't have an account? <strong className='underline'>Sign Up</strong>
                </p>
              </div>
            )}
            {isEmailVerified && !otpVerified && (
              <div>
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">OTP Authentication</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter OTP"
                    aria-describedby="otp-error"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {loading ? <Spinner /> : "Verify OTP"}
                </button>
                <button
                  onClick={handleBackToEmail}
                  className="w-full mt-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Back
                </button>
                {otpError && <p id="otp-error" className="mt-2 text-red-600 text-center">{otpError}</p>}
                <button
                  onClick={handleRequestNewOtp}
                  className="w-full mt-4 py-2 px-4  text-blue-700 hover:text-blue-900
                   font-semibold rounded-md   focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</p>
            <form onSubmit={handleSignUpSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="full_name"
                  value={signup.full_name}
                  onChange={handleSignupForm}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={handleSignupForm}
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
              {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
            </form>
            <p
              className="mt-4 text-sm text-center text-indigo-600 cursor-pointer hover:text-indigo-700"
              onClick={handleSignUpToggle}
            >
              Already have an account? <strong className='underline'>Log In</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
