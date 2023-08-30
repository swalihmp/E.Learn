import { useState } from 'react'
import React from 'react'
import {Toaster} from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function ResetPassword() {

    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')

    const history = useNavigate()

    const user_id = localStorage.getItem('user_id')
    // console.log(user_id);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password === password1) {
            const response = await fetch('http://localhost:8000/api/resetpassword/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id,
                    password
                })
            })
            if (response.status === 200) {
                localStorage.removeItem('user_id')
                history('/login',{state:{msg:"Password Reset Successfully"}})
            }
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
            <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Please enter your new password!</h2>
            <p className=' font-medium text-primaryViolet text-sm md:text-lg'>Reset your password and continue the journey.</p>


            <form  className='flex flex-col w-4/5 items-start' onSubmit={handleSubmit}>

                <div className='flex flex-col w-full pb-5'>
                    <label htmlFor="password" className='py-3'>Password</label>
                    <input type="password" name='password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Password' onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className='flex flex-col w-full pb-5'>
                    <label htmlFor="password" className='py-3'>Confirm Password</label>
                    <input type="password1" name='password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Password Again'  onChange={e => setPassword1(e.target.value)}/>
                </div>

                <div className=" w-full flex place-content-center">
                    <button className=' w-1/2 bg-primary rounded-xl py-3 px-5 bg-red-600 text-white font-semibold' type='submit'>Submit</button>
                </div>
        
            </form>
            
        </div>

        
      </div>
    </div>
  )
}
export default ResetPassword