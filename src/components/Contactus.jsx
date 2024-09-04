import React from 'react'
import { Input } from 'antd';
import Herocounter from './Herocounter';
import { Button } from 'antd';
import Herocards from './HomPage/Herocards';
import Heroone from './Heroone';
import Herolast from './Herolast';

const Contactus = () => {
    const { TextArea } = Input;
    return (
        <div>
            <div>
                <Heroone />
            </div>
        

        {/* <div  className='flex justify-center  px-[10px] py-[5px] sm:px-[25px] sm:py-[5px] md:px-[35px] lg:px-[65px] xl:px-[100px] 2xl:justify-center 2xl:gap-[100px] '>
            <div className='touchcontainer mt-[20px] flex flex-col sm:flex-row w-[300px] h-[550px] sm:h-[400px] sm:w-[400px] rounded-xl md:w-[500px] lg:w-[700px] xl:w-[800px] contact-bg'>
                   
                   <div className= ' contact-bg flex flex-col justify-around px-[10px] py-[10px] w-[100%] h-[450px] rounded-xl sm:h-[400px]'>
                         <div>
                              <p className='text-[18px] sm:text-[19px] font-semibold'>Contact Us</p>
                              <p className='text-[9px] sm:text-[10px] font-light'>Let's have coffee together sometime, If you don't like coffee we have people who loves tea also. Drop us any feedback and we assure to get back to you within 24 Hour.</p>
                         </div>

                         <div className='flex flex-col gap-[8px]'>
                              <div>
                                  <label htmlFor=""><p className='text-[11px] '>First Name</p></label>
                                  <Input className='h-[22px]  text-[9px]' placeholder="Outlined" />
                              </div>

                              <div>
                                  <label htmlFor=""><p className='text-[11px]'>Last Name</p></label>
                                  <Input className='h-[22px]  text-[9px]' placeholder="Outlined" />
                              </div>

                         </div>

                         <div className='flex flex-col gap-[8px]'>
                              <div>
                                 <label htmlFor=""><p className='text-[11px]'>Email Address</p></label>
                                 <Input className='h-[22px]  text-[9px]' placeholder="Outlined" />
                              </div>

                              <div>
                                 <label htmlFor=""><p className='text-[11px]'>Description</p></label>
                                 <TextArea rows={4} className='h-[22px] text-[9px]' placeholder="maxLength is 6" maxLength={50} />
                              </div>
                         </div>

                         <div>
                            <Button className='h-[25px] text-[11px]' type="primary"><p>Submit</p></Button>
                         </div>
                   </div>

                   <div className='getintouch  w-[100%] h-[150px] sm:w-[60%] rounded-xl sm:h-[400px]  secondary-bg '>
                       <div className= 'getcontainer flex flex-col justify-around px-[10px] w-[90%] h-[120px] bg-white'>
                             <div>
                                  <p className='text-[17px] font-semibold'>Get In Touch</p>
                             </div>

                            

                             <div className='w-[180px] flex gap-[5px] items-center'>
                                  <div>
                                      <img className='w-[17px] sm:w-[15px]' src="email.png" alt="" />
                                  </div>
                                  <div>
                                    <p className='text-[11px] sm:text-[10px]'>triumphlights123@gmail.com</p>
                                  </div>
                             </div>

                             <div className='w-[180px] flex gap-[5px] items-center'>
                                  <div>
                                      <img className='w-[17px] sm:w-[15px]' src="phoneblack.png" alt="" />
                                  </div>
                                  <div>
                                    <p className='text-[11px] sm:text-[10px]'>+91 755792284</p>
                                  </div>
                             </div>
                       </div>
                   </div>
            </div>
           
        </div> */}

       

        

        <div  className='2xl:flex 2xl:justify-center'>
        <div className='p-4 py-[20px] px-[10px] sm:px-[25px] sm:py-[40px] md:px-[35px] lg:px-[65px] xl:px-[100px] 2xl:w-[1200px] gap-6 flex flex-col'>
          <div className='gap-2 flex flex-col   '>
             <div className='flex flex-col gap-5'>
                    <div> <p className=' text-center text-[22px]  sm:text-[22px] lg:text-[25px] font-semibold'>Contact Us</p></div>
                    
             </div>

             <div className='gap-4 flex flex-col'>
                 <div><p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-normal'>At <span className='font-bold'>TriumphLights</span>, we're dedicated to providing exceptional customer service. If you have any questions, require assistance with your order, or need support with our products, please don’t hesitate to contact us through any of the following methods:</p></div>
              
             </div>
           </div>





           <div className='gap-2 flex flex-col   '>
             <div className='flex flex-col gap-5'>
                    
                    <div><p className='text-[17px] sm:text-[20px] lg:Text-[22px] font-semibold'>Customer Service
                    </p></div>
                    
             </div>

             <div className='gap-2 flex flex-col'>
                 <div className='ml-[10px]'>
                    <p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold'>Email: <span className='font-normal'><link rel="stylesheet" href="" />rodayaditya@gmail.com</span> </p>
                 </div>

                 <div className='ml-[10px]'>
                    <p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold'>Phone: <span className='font-normal'><link rel="stylesheet" href="" />+91786455xxx</span> </p>
                 </div>
                  
                 

             </div>
           </div>





           <div className='gap-2 flex flex-col   '>
             <div className='flex flex-col gap-5'>
                   
                    <div><p className='text-[17px] sm:text-[20px] lg:Text-[22px] font-semibold'>Office Hours</p></div>
             </div>

             <div className='gap-4 flex flex-col'>
               <div className='ml-[10px]'>
                    <p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold'>Monday - Friday:  <span className='font-normal'><link rel="stylesheet" href="" />9:00 AM - 6:00 PM (EST)</span> </p>
                </div>

                 <div className='ml-[10px]'>
                    <p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold'>Saturday - Sunday: <span className='font-normal'><link rel="stylesheet" href="" />Closed</span> </p>
                 </div>
             </div>
           </div>




          




           <div className='gap-2 flex flex-col   '>
             <div className='flex flex-col gap-5'>
                   
                    <div><p className='text-[17px] sm:text-[20px] lg:Text-[22px] font-semibold'>Social Media</p></div>
             </div>

             <div className='gap-2 flex flex-col'>
                

             <div className='ml-[10px]'>
                    <p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold'>Facebook:  <span className='font-normal'><link rel="stylesheet" href="" />9:00 AM - 6:00 PM (EST)</span> </p>
                </div>

                 <div className='ml-[10px]'>
                    <p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold'>Instagram: <span className='font-normal'><link rel="stylesheet" href="" />Closed</span> </p>
                 </div>

                 <div className='ml-[10px]'>
                    <p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold'>Twitter: <span className='font-normal'><link rel="stylesheet" href="" />Closed</span> </p>
                 </div>

                 <div className='ml-[10px]'>
                    <p className='text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold'>Linkedin: <span className='font-normal'><link rel="stylesheet" href="" />Closed</span> </p>
                 </div>

                 
             </div>
           </div>



        </div>
        
    </div>


      

         <div>
            <Herolast />
         </div>
        </div>
    )
}

export default Contactus