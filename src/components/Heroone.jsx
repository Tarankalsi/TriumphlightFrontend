import React, { useState, useRef, useEffect } from 'react'
import { Megaphone, AlignJustify, Search, Heart, ShoppingBag, ChevronRight } from "lucide-react"
import { Link, BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import LoginModal from './general/LoginModal';

function Heroone({ }) {
  const navigate = useNavigate()
  const [profileDown, setProfileDown] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)

  const toggleDropdown = () => {
    setProfileDown(!profileDown);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };
  const handlecloseSidebar = () => {
    setIsSidebarOpen(false);
  };
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      handlecloseSidebar()
    }
  };

  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }

  const handleLogout = () => {
    Cookies.remove('authToken')
    setIsLogin(false)
  } 

  useEffect(()=>{
    const authtoken = Cookies.get('authToken')
    if (authtoken) {
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className=''>
      {openLoginModal && <LoginModal onClose={handleLoginModal}/>}
      {/* Exclusive */}
      <Link >
        <div className='exclusive  flex items-center justify-center gap-[2px] py-[3px] md:gap-[4px] md:py-[3px] '>
          <div>
            <Megaphone size={25} strokeWidth={1.5} color="#fcf8f8" />
          </div>
          <div>
            <p className='text-[14px] text-white'>Get exclusive deals upto <span className=' font-semibold'>25%</span> </p>
          </div>
        </div>
      </Link>

      {/* navbar */}



      <div>
        <div className='navback sticky'>
          <div className=' min-h-24  px-[10px] py-[5px] sm:px-[25px] sm:py-[5px] md:px-[35px] lg:px-[65px] xl:px-[100px] 2xl:justify-center 2xl:gap-[100px] flex items-center justify-between'>
            <div>
              <img className='w-[150px] sm:w-[180px] lg:w-[220px]' src={'https://triumphlights.s3.ap-south-1.amazonaws.com/websiteimages/logo.png'} alt="" />
            </div>
          
            <div className='menu flex-col'>
              <ul className='flex  gap-[25px]  mr-[0px] text-white font-semibold  tracking-wider'>
                <Link to="/" className=''> <li> Home</li></Link>
                <Link to="/shop" className=''> <li>Shop</li></Link>
                <Link to="/contact-us"><li>Contact Us</li></Link>
                <Link to="/About-us"><li>About Us</li></Link>
              </ul>
            </div>








            <div className='flex items-center gap-[14px]'>
              <div>
                <Link to="/shop">
                  <Search className=' w-[25px] ' color='#ffffff' strokeWidth={1.5} />
                </Link>

              </div>


              <div>
                <Link to="/cart"><ShoppingBag className='w-[25px] sm:w-[30px] lg:w-[35px] xl:w-[45px]' color='#ffffff' strokeWidth={1.5} /></Link>
              </div>

              <div>
                {isLogin ? <div>
                  <div className="relative inline-block text-left">
                    <button
                      onClick={toggleDropdown}
                      className=""
                    >
                      <FontAwesomeIcon className="text-white size-5" icon={faUser} />
                    </button>

                    {profileDown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                  
                          <Link
                            to="/orders"
                            className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Your Orders
                          </Link>
                          <Link
                            onClick={handleLogout}
                            className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Logout
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
                  :
                  <button onClick={handleLoginModal} className="text-white text-sm sm:text-base px-4 py-1 font-bold sm:font-semibold border-2 border-blue-700 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:border-white transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-7 sm:py-2">
                    Login
                  </button>
                }
              </div>

              <div className='menuicon ' onClick={handleOpenSidebar}   >
                <AlignJustify size={28} className=' ' color='#ffffff' strokeWidth={1.5} />
              </div>

            </div>


          </div>
        </div>

        {
          isSidebarOpen &&
          <div ref={sidebarRef}>

            <motion.div

              initial={{ x: -250 }}
              animate={{ x: 0 }}
              transition={{

                duration: 1,
                x: { duration: 0.5 }
              }}


              className='  slidenav  w-[220px] h-[100%] sm:w-[290px] md:w-[320px]  xl:px-[100px] 2xl:justify-center ]'>
              <div className='2xl:justify-center flex flex-col  '>
                <div>
                  <img src="back.jpg" alt="" />
                </div>

                <div className='intext px-[20px] sm:px-[30px]   py-[10px] border '>
                  <Link className='flex justify-between ' to="/">
                    <div><p className=''>Home</p></div>
                    <div><ChevronRight /></div>
                  </Link>
                </div>

                <div className='intext px-[20px] sm:px-[30px]   py-[10px] border '>
                  <Link className='flex justify-between ' to="/shop">
                    <div><p className=''>Shop</p></div>
                    <div><ChevronRight /></div>
                  </Link>
                </div>

                <div className='intext px-[20px] sm:px-[30px]   py-[10px] border '>
                  <Link className='flex justify-between ' to="/contact-us">
                    <div><p className=''>Contact Us</p></div>
                    <div><ChevronRight /></div>
                  </Link>
                </div>

                <div className='intext px-[20px] sm:px-[30px]   py-[10px] border '>
                  <Link className='flex justify-between ' to="/About-us">
                    <div><p className=''>About Us</p></div>
                    <div><ChevronRight /></div>
                  </Link>
                </div>


              </div>

            </motion.div>
          </div>


        }

        {/* <div>

            {
              status ? <Slide /> : null

            }


          </div> */}









      </div>







    </div>
  )
}

export default Heroone