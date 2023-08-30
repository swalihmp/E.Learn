import React from 'react'
import Sidebar from './Sidebar'
import { Toaster,toast } from 'react-hot-toast'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import {CiEdit} from 'react-icons/ci'
import {MdDeleteOutline} from 'react-icons/md'
import Addcategory from './Addcategory'
import Editcategory from './Editcategory'
import Swal from 'sweetalert2'



export default function Admincategory() {


    const [categories, setCategory] = useState([])
    const [toggle,setToggle] = useState({add:false,edit:false});

    useEffect(()=>{
        
        getCategory();
    }, [toggle])

    async function getCategory() {
        const response = await axios.get(`${BASE_URL}courses/allcategory/`)
        setCategory(response.data)
    }

    const statusChange = (id) => {

        axios.get(`${BASE_URL}courses/blockcategory/${id}`)
        .then(()=>getCategory())
    }

    const DeleteCategory = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Delete Category....!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${BASE_URL}courses/deletecategory/${id}`).then(
                    getCategory()
                )
                getCategory()
                toast.error("Deleted")
            }
        })
    }



  return (
    <div className='flex h-full bg-acontent'>
            <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <Sidebar/>
            <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
            <div className="w-full px-5 flex place-items-center ">
            <div className='flex place-content-between place-items-center w-full h-14'>
                <h2 className='font-semibold font-poppins text-primaryBlue text-xl'>Category Management</h2>
                <button className='bg-cards rounded-lg text-center px-5 py-2 text-white text-light' onClick={()=>setToggle({add:true})}>Create Category</button>
            </div>
            </div>
            

            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
        <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">SI No.</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Category Image</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Category Name</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Description</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">List / Unlinst</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Edit</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Delete</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
               {
                categories.map((category,index)=>(
                    <tr class="hover:bg-gray-50" key={index}>
                        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="px-6 py-4">
                            <p>{index+1}</p>
                        </div>
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">{}</div>
                            <div class="text-gray-400">{}</div>
                        </div>
                        </th>
                        <td class="w-full h-full md:w-1/5">
                            <img className='w-full h-full m-1' src={`${category.image}`} alt={category.category_name} />
                        </td>
                        <td class="px-6 py-4">
                            <p className='text-lg text-semibold text-black first-letter:capitalize'>{category.name.split("-").join(" ")}</p>
                        </td>
                        <td class="px-6 py-4">
                            <p>{category.description}</p>
                        </td>
                        <td class="px-6 py-4">
                            {
                                category.is_active ?
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Listed
                                </span>
                                :
                                <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                    Unlisted
                                </span>
                            }   
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex">
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={category.is_active}
                                        readOnly
                                    />
                                    <div
                                        // onClick={() => category.status ? updateStatus(category._id,'false'):updateStatus(category._id,'true')}
                                        onClick={() => statusChange(category.id)}
                                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    ></div>
                                        {
                                            !category.is_active ?
                                            <span className="ml-2 text-sm font-medium text-gray-900">
                                                List
                                            </span>
                                            :
                                            <span className="ml-2 text-sm font-medium text-gray-900">
                                                UnList
                                            </span>
                                        }
                                   
                                </label>
                                
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex flex-col place-items-center rounded-2xl shadow-md shadow-gray-100 p-2 cursor-pointer"
                            onClick={()=>setToggle({edit:category.id})}
                            >
                                <CiEdit size={25}></CiEdit>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex flex-col place-items-center rounded-2xl shadow-md shadow-gray-100 p-2 cursor-pointer"
                            // onClick={()=>{dispatch(togglePopup({id:category._id}))}}
                            >
                                <MdDeleteOutline onClick={() => DeleteCategory(category.id)} size={25} className='text-red-500'></MdDeleteOutline>
                            </div>
                        </td>
                </tr>
                ))
               }
        </tbody>
        </table>
            
        </div>
        {
            toggle.add ? <Addcategory setToggle={setToggle}/> : toggle.edit ? <Editcategory setToggle={setToggle} toggle={toggle}/>: null
        }
        </div>
    </div>
  )
}
