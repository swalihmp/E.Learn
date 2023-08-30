import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { BASE_URL } from '../../utils/config'
import Sidebar from './Sidebar'
import { Toaster } from 'react-hot-toast'

export default function AdminInstructors() {

    const [Instructor, setInstructor] = useState([])

    async function getInstructor() {
        const response = await axios.get(`${BASE_URL}instruct/instructors/`)
        setInstructor(response.data)
    }

    useEffect(()=>{
        getInstructor();
    }, [])



  return (
    <div className='flex h-full bg-acontent'>
        <Sidebar/>
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 font-poppins'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <div className="w-full p-5">
            <input type="text" placeholder='Search by name or email' className="border-b-2 border-primaryBlue focus:outline-none px-2 w-full"/>
        </div>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Instructor Name</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Experiance</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Experiance Type</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Subject</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Qualification</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {
                  Instructor?.map((user,index)=>(
                        <tr class="hover:bg-gray-50" key={index}>
                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <div class="relative h-10 w-10">
                                <img class="h-full w-full rounded-full object-cover object-center" src="/avatar1.avif"
                                alt=""/>
                                <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                            </div>
                            <div class="text-sm">
                                <div class="font-medium text-gray-700">{`${user.user.first_name} ${user.user.last_name}`}</div>
                                <div class="text-gray-400">{user?.user?.email}</div>
                            </div>
                            </th>
                            {user.expmode==="both" ? 
                                <td class="px-6 py-4">
                                    <p>Offline & Online</p>
                                </td>
                            :
                                <td class="px-6 py-4">
                                    <p>{user.expmode}</p>
                                </td>
                            }
                            <td class="px-6 py-4">
                                <p>{user.exptype}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p>{user.subject}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p>{user.qualification}</p>
                            </td>
                        </tr>
                    ))
                }
            
          
            </tbody>
        </table>
        </div>
    </div>
    </div>
    </div>
  )
}
