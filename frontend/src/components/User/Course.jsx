import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { Radio } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux'
import { updatecourselist } from '../../redux/courselistSlice';
import { BASE_URL } from '../../utils/config';
import { details } from '../../utils/config';



import NavBar1 from './Navbar1';
import Footer from './Footer';



function Course() {
    const dispach = useDispatch()
    const {courses,searchdata} = useSelector(state=>state.courses)

    useEffect(()=>{
        if (searchdata===null){
            async function getCourse() {
                const response = await axios.get(`${BASE_URL}courses/course/`)
                dispach(updatecourselist(response.data))
    
            }
            getCourse();  
        };
    }, [])

    const [category, setCategory] = useState([])

    useEffect(()=>{
        async function getCategory() {
            
            const response = await axios.get(`${BASE_URL}courses/category/`)
            setCategory(response.data)
        }
        getCategory();
    }, [])


    const Filtercategory = (id) => {

        axios.get(`${BASE_URL}courses/filtercat/${id}`)
        .then((response)=>
            dispach(updatecourselist(response.data))
        )
    }



  return (

    <div className='w-full h-full font-poppins relative'>
        <Toaster position='top-center' limit={3}></Toaster>
        <div className="w-full h-20  flex flex-col gap-3 place-content-between ">
            <NavBar1/>
        </div>
        <div className='p-5 w-full h-full min-h-screen flex'>
            <div className="shadow-xl w-1/5 h-auto px-5 rounded-xl bg-white flex flex-col gap-5 py-5">
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-semibold '>Sort By</h2>
                    <Radio id="low-to-high" name="sort" label="Low to high" />
                    <Radio id="high-to-low" name="sort" label="High to low" />
                </div>
                <h2 className='text-lg font-semibold'>Filter</h2>
             
                
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-normal '>Price</h2>
                    <Radio id="free" name="price" label="All" defaultChecked />
                    <Radio id="free" name="price" label="Free" />
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 mx-3">
                <div className="w-full">
                    <h3 className='text-xl font-semibold'>Categories</h3>
                </div>
                <div className="w-full flex gap-2">
                       
                    {
                        category.map((category)=>(
                            <div>
                                <button type='button' className="border-2 border-gray-600 px-3 py-2 hover:bg-gray-800 hover:text-white first-letter:capitalize" onClick={() => Filtercategory(category.id)}>{category?.name}</button>
                            </div>
                        ))
                    }
                     
                </div>
                <div className="w-full mt-10">
                    <h3 className='text-lg font-normal pl-2'>{courses.length} results</h3>
                
                    {
                      courses?.length > 0 ?  courses.map((course)=>(
                        <div className='flex flex-col gap-3'>
                            <Link to={`/course-details/${course?.id}`} className="w-full px-3 py-5 rounded-xl shadow-xl my-2 bg-white flex gap-5 cursor-pointer">
                                <div className='w-1/5 h-40'>
                                    <img className='w-full h-full rounded-md' src={details+course?.image} alt="course_image" />
                                </div>
                            <div className=' w-3/5 flex flex-col place-content-start gap-3'>
                                <h1 className='text-2xl font-semibold'>{course?.title}</h1>
                                <p className='text-gray-600 font-normal'>{course?.description}</p>
                                <div className="w-full flex flex-col gap-2 place-items-center">
                                    <div className="w-full flex gap-2 place-items-center font-semibold text-gray-700">
                                        <img className='w-12 rounded-3xl h-12' src="/avatar1.avif" alt="tutor_profile" />
                                        <p>Swalih Mp</p>
                                    </div>
                                   <div className="flex gap-3 w-full place-content-start">
                                        <p className='text-lg font-normal line-through text-gray-600'>{'₹ '+course?.price}</p>
                                        <p className='text-lg font-semibold text-darkPink'>{'₹ '+course?.saleprice}</p>
                                   </div>
                                </div>
                            </div>
                            
                        </Link>
                        
                        </div>
                        ))
                        :
                        <div className="w-full flex flex-col place-content-center place-items-center">
                            <img className='w-2/5' src="/no-results.gif" alt="no_results_found" />
                            <p className='text-xl font-semibold'>No matching results found</p>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Course