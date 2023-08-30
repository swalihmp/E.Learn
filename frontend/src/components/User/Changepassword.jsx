import React, { useState } from 'react'
import NavBar1 from './Navbar1'
import Psidebar from './Psidebar'
import { Toaster,toast } from 'react-hot-toast'
import { BASE_URL } from '../../utils/config'
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Changepassword() {
    const [oldpass,setOldpass] = useState('')
    const [pass1,setPass1] = useState('')
    const [pass2,setPass2] = useState('')
    const navigate= useNavigate()


    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
        user_name = jwtDecode(user_auth)
    }


    const ChangePass = async (e) => {
        e.preventDefault()
        try{
            if (pass1 === pass2) {
                const res = await axios.post(`${BASE_URL}api/changepass/`,{oldpass,password:pass1,user_id:user_name.user_id}
                )
                if(res.data.msg===500){
                    toast.error("Old Password Not match")
                }
                else{
                    e.target.reset()
                    localStorage.removeItem('authToken')
                    navigate('/login',{state:{msg:"Password Reset Successfully"}})
                }
                console.log(res.data);
              }
              else {
                toast.error("Password did't match")
              }
          
        }catch(err){
            toast.error('Something went wrong...')
        }
        
      }


  return (
<div className='w-full h-full'>
        <div>
            <NavBar1/>
        </div>
        <div className='w-full h-full flex gap-2'>
            <Psidebar/>

            <div className='px-5 w-full h-full min-h-screen mx-3 mt-2  py-5 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
                <Toaster position='top-center' reverseOrder='false' ></Toaster>
                <div class="overflow-hidden  m-5 w-full">
                    <div className='w-full'>
                        <h1 className='font-bold text-3xl'>Change Password</h1>
                    </div>
                    <div className="flex items-center w-full  px-4 py-12">
                        <form className="font-poppins w-full gap-8 flex flex-col place-content-evenly pb-10" onSubmit={ChangePass}>
                            <div className='w-full flex flex-col place-items-start place-content-center'>
                                <label htmlFor="title" className="text-primaryBlue font-semibold text-md ppy-2">Old Password</label>
                                <input type="password"  name="first_name" placeholder="Enter your old Password" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" required onChange={e => setOldpass(e.target.value)}/>
                            </div>
                            <div className='w-full flex flex-col place-items-start place-content-center'>
                                <label htmlFor="subtitle" className="text-primaryBlue font-semibold text-md py-2">New Password</label>
                                <input type="password" name="last_name" placeholder="Enter New Password" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" required onChange={e => setPass1(e.target.value)}/>
                            </div>
                            <div className='w-full flex flex-col place-items-start place-content-center'>
                                <label htmlFor="description" className="text-primaryBlue font-semibold text-md py-2">New Password</label>
                                <input type='text' placeholder="Enter New Password Again" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setPass2(e.target.value)} />
                            </div>
                            <div className="w-full">
                                <button type='submit' className='bg-black text-white font-semibold text-md px-5 py-4 w-1/6 rounded-xl text-center '>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}
