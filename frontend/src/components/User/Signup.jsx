import { Link } from "react-router-dom"
import React, { useState } from 'react'
import { BASE_URL } from '../../utils/config'
import { toast,Toaster } from 'react-hot-toast'


function Signup() {
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')

    const signupSubmit = async (e) => {
        e.preventDefault()
    
        if (password === password1) {
          const response = await fetch(`${BASE_URL}api/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              first_name,
              last_name,
              email,
              username: email.split('@')[0],
              password,
            })
          })
          
          if (response.status === 200) {
            toast.success("Account Created, Please Activate..!")
            e.target.reset()
          } else {
            toast.error("Something went wrong")
          }
        }
        else {
          toast.error("Password did't match")
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
            <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Create your free account.</h2>
            <p className=' font-medium text-primaryViolet text-sm md:text-lg'>See how the world’s best user experiences are created.</p>


            <form  className='flex flex-col w-4/5 items-start' onSubmit={signupSubmit}>
            
                <div className='flex w-full py-3 justify-between'>
                    <div className="flex  flex-col w-3/6 px-1">
                        <label htmlFor="first_name" className='py-3'>First Name</label>
                        <input type="first_name" name='first_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter First Name' onChange={e => setFirstname(e.target.value)} />
                        
                    </div>
                    <div className="flex flex-col w-3/6 px-1">
                        <label htmlFor="last_name" className='py-3'>Last Name</label>
                        <input type="last_name" name='last_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Last Name' onChange={e => setLastname(e.target.value)}/>
                    </div>
                
                </div>

                <div className='flex flex-col w-full py-3 '>
                <label htmlFor="email" className='py-3'>Email address</label>
                <input type="email" name='email' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Email Address' onChange={e => setEmail(e.target.value)}/>
                </div>

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
export default Signup
