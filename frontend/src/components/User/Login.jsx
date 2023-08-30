import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import login, { getLocal } from '../../helpers/auth'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { toast, Toaster } from 'react-hot-toast'

function Login() {

  const response = getLocal()
  const history = useNavigate()
  const location = useLocation()

  let state = location.state

  useEffect(() => {
      if (response) {
          history('/')
      }
      if (state?.msg){
        toast.success(state?.msg)
        history(state=>({...state,msg:null}))
      }
      if (state?.msgerror){
        toast.error(state?.msgerror)
      }
  })

  const handleSubmit = async (e) => {
      e.preventDefault()
      const login_response = await login(e);
      console.log(login_response, 'log response');


      const local_response = getLocal('authToken');
      // console.log(local_response, 'from local storage');
      if (local_response) {
          const location = localStorage.getItem('location')
          const decoded = jwt_decode(local_response)
          console.log(decoded, 'decoded in login page');
          if (decoded.is_admin) {
              history('/ahome')
          } else if (decoded.is_staff) {
              console.log('staff');
              history('/')
          } else if (location) {
              history(location, { replace: true })
              localStorage.removeItem('location')
          } else {
              history('/', { replace: true })
          }
      } else {
          toast.error('Invalid User Credentials')
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
          <p className='px-3 text-primaryViolet'>Don't have an account ?</p>
          
          <Link to="/signup"><button className='px-3 py-2 text-white bg-red-600'>Register</button></Link>
        </div>

        <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Hello ! Welcome back.</h2>
        <p className=' font-medium text-primaryViolet text-sm md:text-lg'>
            Log in with your data that you entered during Your registration.
        </p>


        <form  className='flex flex-col w-4/5 items-start' onSubmit={handleSubmit}>
          {/* <div className='flex flex-col w-full'>
            <label className='py-3 text-4xl font-bold'>Hello ! Welcome Back.</label>
          </div> */}
          
          <div className='flex flex-col w-full py-3 '>
            <label htmlFor="email" className='py-3'>Email address</label>
            <input type="email" name='username' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Email Address' required/>
          </div>

          <div className='flex flex-col w-full pb-5'>
            <label htmlFor="password" className='py-3'>Password</label>
            <input type="password" name='password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Password' required/>
            <Link to="/forgotp"><p className='text-end pt-2 text-red-600 cursor-pointer'>Forgot Password ?</p></Link>
          </div>

          <div className=" w-full flex place-content-center">
            <button className=' w-1/2 bg-primary rounded-xl py-3 px-5 bg-red-600 text-white font-semibold' type='submit'>Log In</button>
          </div>
          
          
        </form>
      </div>
    </div>
  )
}
export default Login
