import React from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { useEffect,useState } from 'react';
import { details } from '../../utils/config'

export default function Psidebar() {

    const [pic, setPric] = useState([])

    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
        user_name = jwtDecode(user_auth)
        
    }

    useEffect(() => {
        getProfile();
    }, [])

    async function getProfile() {
        const response = await axios.get(`${BASE_URL}api/profile/${user_name.user_id}`)
        setPric(response.data)
    }

  return (
            <div className="w-1/5 h-auto min-h-screen shadow-2xl rounded-2xl ml-2 pt-20 flex flex-col place-items-center bg-white">
                <div className="avatar flex flex-col pb-10 place-items-center gap-3">
                    <div className=" w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                        
                            
                            <div className=" w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                                {
                                    pic?
                                    <img src={details+pic[0]?.image} alt='profile_image'/>
                                    :
                                    <div className="bg-black bg-opacity-50 w-full h-full flex place-content-center place-items-center">
                                        <h1 className='text-white text-center font-semibold text-4xl'>{user_name?.username?.split("")[0]}</h1>
                                    </div>
                                }
                            
                                
                            </div>
                            
                        
                       
                        
                    </div>
                    <h2 className='text-xl font-semibold'>Hello {user_name?.username}!</h2>
                </div>

                <div className="flex flex-col place-items-center pt-5">
                    <div className="w-full p-3">
                        <Link to="/profile" className='text-md font-normal '>Account Details</Link>
                    </div>
                    <div className="w-full p-3">
                        <Link to="/profileimage" className='text-md font-normal ' >Profile Image</Link>
                    </div>
                    <div className="w-full p-3">

                        <Link to="/changepass"  className='text-md font-normal' >Password Reset</Link>
                    </div>
                    <div className="w-full p-3">

                        <Link to="/orderhistory" className='text-md font-normal' >Order History</Link>
                    </div>
                </div>
        </div>
)}
