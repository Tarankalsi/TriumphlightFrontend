import React, { useState } from 'react';

function Bulbglow() {
    const [isGlowing, setIsGlowing] = useState(false); // State to toggle the image

    // Handler to toggle the image state
    const handleGlowToggle = () => {
        setIsGlowing(!isGlowing);
    };

    return (
        <div className='2xl:flex 2xl:justify-center bg-gray-200 py-2 mt-6 sm:mx-6 md:mx-20 sm:rounded-full'>
            <div className='2xl:w-[1200px]'>
                <div>
                    <p className='text-[24px] sm:text-[20px] lg:text-[24px] text-center text-gray-800 italic font-semibold py-[10px]'>Your life shines even brighter with <span className='text-4xl font-extrabold italic text-blue-700'> {"Triumph Lights".toUpperCase()}</span> </p>
                </div>
                <div className='w-[100%] h-[250px]'>
                    <div className='px-[10px] flex'>
                        <div className='w-[50%] h-[250px]  flex justify-center items-center'>
                            {/* Button to toggle the image */}
                            <button
                                onClick={handleGlowToggle} // Attach the handler to the button
                                className="text-white text-[15px] w-[130px] h-[60px] sm:w-[200px] sm:text-[23px] sm:text-base px-4 py-4 font-bold sm:font-semibold border-blue-700 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full hover:text-white hover:bg-gradient-to-r hover:border-white transition-all duration-300 sm:px-7 sm:py-2"
                            >
                                Tap To Glow
                            </button>
                        </div>

                        <div className='w-[50%] h-[250px] flex justify-center'>
                            <div className='w-[250px] h-[250px]'>
                                {/* Conditional rendering based on the state */}
                                <img
                                    className=''
                                    src={
                                        isGlowing
                                            ? "https://triumphlights.s3.ap-south-1.amazonaws.com/websiteimages/T2.png"
                                            : "https://triumphlights.s3.ap-south-1.amazonaws.com/websiteimages/T1.png"
                                    }
                                    alt="Glow Bulb"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Move this div below the glow bulb */}
                <div className='text-md md:text-xl text-center mb-10 italic mx-4 tracking-wider'>
                    Lights to illuminate <span className='font-extrabold text-blue-700 text-4xl'>HEARTS</span> and <span className='font-extrabold text-blue-700 text-4xl'>HOMES!</span>
                </div>
            </div>
        </div>
    );
}

export default Bulbglow;
