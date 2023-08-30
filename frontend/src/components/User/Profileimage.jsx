import React from 'react'
import { Toaster } from 'react-hot-toast'
import NavBar1 from './Navbar1'
import Psidebar from './Psidebar'
import { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../utils/config'
import { toast } from 'react-hot-toast'
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom'

export default function Profileimage() {
    const [image, setImage] = useState(null);
    const navigate= useNavigate()

    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
        user_name = jwtDecode(user_auth)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const form = new FormData()
        form.append('image',image)
        form.append('user',user_name.user_id)
    
        const res = await axios({
          method: 'post',
          url: `${BASE_URL}api/updateimage/`,
          data: form
        })
        console.log(res);
        if (res.status === 200) {
          toast.success('Image Added')
          navigate('/profile')
        } else {
          toast.error(res.statusText)
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
                        <h1 className='font-bold text-3xl'>Update Profile Image</h1>
                    </div>
                    <div className="flex items-center w-full  px-4 py-12">
                        <form className="font-poppins w-full gap-8 flex flex-col place-content-evenly pb-10" onSubmit={e => handleSubmit(e)} >
                            <div className='w-full flex flex-col place-items-start place-content-center'>
                                <label htmlFor="title" className="text-primaryBlue font-semibold text-md ppy-2">Upload Image</label>
                                <input type="file"  name="first_name" placeholder="Enter your old Password" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" required onChange={e => setImage(e.target.files[0])} />
                            </div>
                            
                            <div className="w-full">
                                <button type='submit' className='bg-black text-white font-semibold text-md px-5 py-4 w-1/6 rounded-xl text-center '>Upload</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}
