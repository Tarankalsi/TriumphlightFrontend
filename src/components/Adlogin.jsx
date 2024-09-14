import React, { useState } from 'react';
import axios from "axios";



const Adlogin = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  



  const handleEmail =(e) =>{
    setemail(e.target.value)
  }
  const handlePassword =(e) =>{
    setpassword(e.target.value)
  }

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLoginClick = () => {
    setShowForgotPassword(false);
  };


  const handleapi = async (e) =>{

    e.preventDefault();

   const result = await axios.post('https://e-commerce-backend-2ndq.onrender.com/api/v1/admin/signin' ,{
        email:email,
        password: password ,
    })

    
    

 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {showForgotPassword ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                 
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your-email@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
              <button
                type="button"
                onClick={handleBackToLoginClick}
                className="w-full mt-2 py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back to Login
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmail}
                  autoComplete='off'
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your-email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  autoComplete='off'
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleapi}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="w-full mt-2 text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Forgot Password?
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adlogin;
