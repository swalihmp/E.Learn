import React from 'react'
import Sidebar1 from '../Sidebar1'
import { Toaster } from 'react-hot-toast'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../../helpers/auth'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {CiEdit} from 'react-icons/ci'
import Editcourse from './Editcourse'
import { details } from '../../../utils/config'


export default function InstructorCourse() {

    const navigate = useNavigate()
    const [Courses, setCourses] = useState([])
    const location = useLocation()
    const history = useNavigate()
    const [toggle,setToggle] = useState({edit:false});

    let state = location.state

    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
    user_name = jwtDecode(user_auth)
    }


    async function getCourses() {
        const response = await axios.get(`${BASE_URL}courses/instructorcourse/${user_name.user_id}`)
        setCourses(response.data)
    }

    useEffect(()=>{
        getCourses();
        if (state?.msg){
            toast.success(state?.msg)
            history(state=>({...state,msg:null}))
        }
        if (state?.msgerror){
            toast.error(state?.msgerror)
        }
    }, [])







    function goTocreate() {
        navigate('/createcourse')    
    }



  return (
    <div className='flex h-full bg-acontent'>
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <Sidebar1/>
            <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
                <div className='flex place-content-between place-items-center w-full h-14'>
                    <h2 className='font-semibold font-poppins text-primaryBlue text-xl'>Course Management</h2>
                    <button onClick={()=>goTocreate()} className='bg-cards rounded-lg text-center px-5 py-2 text-white text-light'>Create Course</button>
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
                <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Edit</th>
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
                                    <img src={`${details+course.image}`} alt="course_image" className='w-full h-full'/>
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
                                    course?.is_rejected?
                                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Rejected
                                    </span>
                                    :
                                    course?.is_active ?
                                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
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
                                    <Link to={`/isinglecourse/${course?.id}`} className="flex flex-col place-items-center cursor-pointer">
                                    <BsEye size={20}></BsEye>
                                    <p className="font-semibold ">View</p>
                                    </Link>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div className="flex flex-col place-items-center rounded-2xl shadow-md shadow-gray-100 p-2 cursor-pointer" onClick={()=>setToggle({edit:course.id})}
                                >
                                    <CiEdit size={25}></CiEdit>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                
                        
                
        
            </tbody>
            </table>
            
            </div>
            {
            toggle.edit ? <Editcourse setToggle={setToggle} toggle={toggle}/>: null
            }
            </div>
            
        </div>
  )
}
