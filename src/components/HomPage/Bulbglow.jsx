import { React } from 'react'

function Bulbglow() {

   

    return (

        <div  className='2xl:flex 2xl:justify-center'>
            <div className='2xl:w-[1200px]'>
             <div >
                      <p className='text-[24px] sm:text-[28px] lg:text-[32px] text-center font-semibold py-[10px]'>Glow With Us</p>
             </div>
            <div className='w-[100%] h-[250px]   '>

                  
                    <div className='px-[10px] flex  '>

                       <div className='w-[50%] h-[250px] bg-white flex justify-center items-center'>
                           
                                
                                  <button  className="text-white text-[15px] w-[130px] h-[60px] sm:w-[200px] sm:text-[23px] sm:text-base px-4 py-4 font-bold sm:font-semibold  border-blue-700 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full hover:text-white hover:bg-gradient-to-r hover:border-white transition-all duration-300   sm:px-7 sm:py-2">
                                   Tap To Glow
                                </button>
                               
                            
                       </div>

                       <div className='w-[50%] h-[250px]  flex justify-center '>
                             <div className='w-[250px] h-[250px]  '>
                                    <img className='' src="https://triumphlights.s3.ap-south-1.amazonaws.com/websiteimages/22.png" alt="" />
                             </div>
                       
                       </div>
                    </div>
                     
                 
            </div>
            </div>
            
        </div>
    )
}

export default Bulbglow