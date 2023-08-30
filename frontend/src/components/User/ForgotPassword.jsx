import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch('http://localhost:8000/api/forgotpassword/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email
      })
    })
    const data = await response.json();
    localStorage.setItem('user_id', data.user_id)
    // console.log(data.user_id);

    // console.log('forgot response', mypromise);
    if (response.status === 200) {
      toast.success("Password Reset Link Send")
      localStorage.setItem('email',email)
      e.target.reset()
    }
    }
    catch(error){
      toast.error("No Account Found")
    }

  }

  return (
    <div className=" w-full h-full flex pt-10">
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
      <div className="flex flex-1 place-content-center place-items-center">
        <img src="/loginimg.svg" alt="" />

      </div>
      <div className="flex flex-col flex-1 place-content-center pr-5 pl-5">
        <div className="absolute flex justify-end items-center top-4 right-3">
          <p className='px-3 text-primaryViolet'>Already have an account?</p>
          
          <Link to="/login"><button className='px-3 py-2 text-white bg-red-600'>Login</button></Link>
        </div>

        <div>
            <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Forget Password ?</h2>
            <p className=' font-medium text-primaryViolet text-sm md:text-lg'>Don't worry Restart your password and continue your journey !</p>


            <form  className='flex flex-col w-4/5 items-start' onSubmit={handleSubmit}>
            
                <div className='flex flex-col w-full py-3 '>
                <label htmlFor="email" className='py-3'>Email address</label>
                <input type="email" name='email' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Registerd Email Address' onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <div className=" w-full flex place-content-center">
                    <button className=' w-1/2 bg-primary rounded-xl py-3 px-5 bg-red-600 text-white font-semibold' type='submit'>Verify</button>
                </div>
        
            </form>
            
        </div>

        
      </div>
    </div>
  )
}
export default ForgotPassword