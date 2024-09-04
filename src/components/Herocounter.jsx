import React, { useState } from 'react'
import ScrollTrigger from 'react-scroll-trigger'
import CountUp from 'react-countup'
function Herocounter() {

    const [counterstart, setcounterstart] = useState(false);

    return (

        <div >
            <ScrollTrigger onEnter={() => setcounterstart(true)} onExit={() => setcounterstart(false)}>


                <div className='mt-[150px] lg:mt-[50px] sm:mt-[0px] px-[10px] py-[15px] sm:px-[25px] sm:py-[5px] md:px-[35px] lg:px-[65px] xl:px-[100px] 2xl:justify-center 2xl:gap-[100px] '>

                    <div className='flex  justify-center py-[40px]'><p className=' text-[16px] sm:text-[17px] lg:text-[20px] xl:text-[22px] '>India's no.1 Lights Brand</p></div>

                    <div className='  px-[10px] py-[5px] sm:px-[25px] sm:flex sm:gap-[-50px] sm:py-[5px] md:px-[35px] lg:px-[65px] xl:px-[100px] 2xl:justify-center 2xl:gap-[100px]   justify-around'>
                        
                       
                            <div  className=' pb-[30px]'>
                                <div className=' flex flex-col items-center gap-[4px]'>
                                    <img className='w-[50px] md:w-[60px] lg:w-[70px] ' src="warranty.png" alt="" />
                                    <p className='text-[13px] md:text-[15px] lg:text-[17px] font-light text-center '>Warranty</p>
                                </div>

                                <div className='flex text-center flex-col justify-center '>
                                    <p className='primary text-[20px] md:text-[22px] lg:text-[24px] font-semibold'>2</p>
                                    <p className=' text-[14px] md:text-[16px] lg:text-[18px] font-regular'>Years</p>
                                </div>
                            </div>

                            <div className=' pb-[30px]'>
                                <div className=' flex flex-col items-center gap-[4px]'>
                                    <img className='w-[50px] md:w-[60px] lg:w-[70px]' src="order.png" alt="" />
                                    <p className='text-[13px]  md:text-[15px] lg:text-[17px]  font-light  text-center '>More Than</p>
                                </div>

                                <div className='flex text-center flex-col justify-center '>
                                    <p className='primary text-[20px] md:text-[22px] lg:text-[24px] font-semibold'>
                                        {counterstart && <CountUp start={0} end={4000} duration={2} delay={0} />}
                                        +
                                    </p>
                                    <p className=' text-[14px] font-regular md:text-[16px]  lg:text-[18px]  '>Orders</p>
                                </div>
                            </div>

                            <div className=''>
                                <div className=' flex flex-col items-center gap-[4px]'>
                                    <img className='w-[50px] md:w-[60px] lg:w-[70px] ' src="customer.png" alt="" />
                                    <p className='text-[13px] font-light  md:text-[15px] lg:text-[17px]   text-center '>Customer</p>
                                </div>

                                <div className='flex text-center flex-col justify-center '>
                                    <p className='primary text-[20px] md:text-[22px] lg:text-[24px] font-semibold'>24*7</p>
                                    <p className=' text-[14px] md:text-[16px] lg:text-[18px]  font-regular '>Support</p>
                                </div>
                            </div>
                      


                    </div>


                </div>
            </ScrollTrigger>
        </div>
    )
}

export default Herocounter