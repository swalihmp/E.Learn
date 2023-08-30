import React, { useState,useEffect } from 'react'
import NavBar1 from './Navbar1'
import Psidebar from './Psidebar'
import { Toaster } from 'react-hot-toast'
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-hot-toast';

export default function Profile() {

    const user_auth = getLocal('authToken');
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [discription, setDiscription] = useState('')
    const [profile, setProfile] = useState([])
    
    let user_name;
    if(user_auth){
        user_name = jwtDecode(user_auth)
    }

    
    useEffect(() => {
        getProfile();
    }, [])

    async function getProfile() {
        const response = await axios.get(`${BASE_URL}api/profile/${user_name.user_id}`)
        console.log(response.data)
        setProfile(response.data)
        setFirstname(response.data[0].first_name)
        setLastname(response.data[0].last_name)
        setDiscription(response.data[0].discription)
    }

    const updateProfile = async (e) => {
        e.preventDefault()
    
        const response = await fetch(`${BASE_URL}api/updateprofile/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id : user_name.user_id,
            first_name,
            last_name,
            discription,
        })
        })
        
        if (response.status === 200) {
        toast.success("Updated....!")
        getProfile()
        } else {
        toast.error("Something went wrong")
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
                        <h1 className='font-bold text-3xl'>Profile & Setting's</h1>
                    </div>
                    <div className="flex items-center w-full  px-4 py-12">
                        <form className="font-poppins w-full gap-8 flex flex-col place-content-evenly pb-10" onSubmit={updateProfile}>
                            <div className='w-full flex flex-col place-items-start place-content-center'>
                                <label htmlFor="title" className="text-primaryBlue font-semibold text-md ppy-2">First Name</label>
                                <input type="text" defaultValue={profile[0]?.first_name} name="first_name" placeholder="Enter your first name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setFirstname(e.target.value)}/>
                            </div>
                            <div className='w-full flex flex-col place-items-start place-content-center'>
                                <label htmlFor="subtitle" className="text-primaryBlue font-semibold text-md py-2">Last Name</label>
                                <input type="text" name="last_name" defaultValue={profile[0]?.last_name} placeholder="Enter your last name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setLastname(e.target.value)}/>
                            </div>
                            <div className='w-full flex flex-col place-items-start place-content-center'>
                                <label htmlFor="description" className="text-primaryBlue font-semibold text-md py-2">Email</label>
                                <input type='text' readOnly value={profile[0]?.email} className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" />
                            </div>
                            <div className='w-full flex flex-col place-items-start place-content-center'>
                                <label htmlFor="description" className="text-primaryBlue font-semibold text-md py-2">Description</label>
                                <textarea name="description" placeholder="Tell us about You" defaultValue={profile[0]?.discription} className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setDiscription(e.target.value)}/>
                            </div>
                            <div className="w-full">
                                <button type='submit' className='bg-black text-white font-semibold text-md px-5 py-4 w-1/6 rounded-xl text-center '>Save</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}
