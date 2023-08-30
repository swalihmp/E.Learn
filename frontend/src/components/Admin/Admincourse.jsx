import React from 'react'
import Sidebar from './Sidebar'
import { Toaster } from 'react-hot-toast'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import { Link } from 'react-router-dom'


export default function Admincourse() {

    const [Courses, setCourses] = useState([])
    async function getCourses() {
        const response = await axios.get(`${BASE_URL}courses/allcourse/`)
        
        setCourses(response.data)
    }

    useEffect(()=>{
        getCourses();
    }, [])

    async function handleSearch(e){
        const action = e.target.value
        if (action === "pending"){
            const response = await axios.get(`${BASE_URL}courses/pending/`)
            setCourses(response.data)
        }
        else if(action === "all"){
            getCourses();
        }
        else if(action === "rejected"){
            const response = await axios.get(`${BASE_URL}courses/rejected/`)
            setCourses(response.data)  
        }
        else if(action === "active"){
            const response = await axios.get(`${BASE_URL}courses/active/`)
            setCourses(response.data)  
        }
    }




  return (
    <div className='flex h-full bg-acontent'>
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <Sidebar/>
            <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
                <div className=" h-20 w-full flex place-content-start place-items-center">
                    <h3 className='font-semibold text-primaryViolet text-2xl '>Courses</h3>
                </div>

                <div className=" h-10 w-full flex place-content-start gap-5 place-items-center">
                    <h5 className='font-semibold  text-lg '>Filter : </h5>
                    <select name="searchkey" onChange={handleSearch}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            

            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead class="bg-gray-50">
                <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">SI No.</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Course Image</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Course Title</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Instructor</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Description</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Action</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {
                    Courses?.map((course,index)=>(
                        <tr class="hover:bg-gray-50" >
                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <div class="px-6 py-4">
                                <p>{index+1}</p>
                            </div>
                            <div class="text-sm">
                                <div class="font-medium text-gray-700">{}</div>
                                <div class="text-gray-400">{}</div>
                            </div>
                            </th>
                            <td class="px-6 py-4">
                                <div className="w-40">
                                    <img src={`${course.image}`} alt="course_image" className='w-full h-full'/>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <p>{course.title}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p>{`${course?.user?.first_name}`}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p>{course.description}</p>
                            </td>
                            <td class="px-6 py-4">
                                {
                                    course?.is_active ?
                                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
                                    </span>
                                    :course?.is_rejected?
                                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                        Rejected
                                    </span>
                                    :
                                    <span class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                                        Pending
                                    </span>
                                    
                                }  
                            </td>
                            <td class="px-6 py-4">
                                <div className="flex place-content-around gap-5">
                                    <Link to={`/adminsinglecourse/${course?.id}`} className="flex flex-col place-items-center cursor-pointer">
                                    <BsEye size={20}></BsEye>
                                    <p className="font-semibold ">View</p>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                
                        
                
        
            </tbody>
            </table>
            
            </div>
            </div>
        </div>
  )
}
